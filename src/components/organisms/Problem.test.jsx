import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { problem } from '../../content'
import { Problem } from './Problem'

const promptsShown = (container) =>
  [...container.querySelectorAll('[data-card="session"] [data-prompt]')].map((prompt) => prompt.textContent)
const memoriesShown = (container) =>
  [...container.querySelectorAll('[data-card="memry"] li')].map((line) => line.textContent)

// One full reload cycle: lines clear, the scene swaps, lines come back.
const CYCLE_MS = 12500

/** Replaces IntersectionObserver so a test can report a target entering or leaving the screen. */
function trackIntersections() {
  const original = window.IntersectionObserver
  const observed = []
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback
    }
    observe(target) {
      observed.push({ target, callback: this.callback })
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  const restore = () => {
    window.IntersectionObserver = original
  }
  restore.report = (element, isIntersecting) =>
    observed
      .filter(({ target }) => target === element)
      .forEach(({ target, callback }) => callback([{ target, isIntersecting }]))
  return restore
}

describe('Problem section', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  it('keeps the heading, body and closing line', () => {
    render(<Problem />)

    expect(screen.getByRole('heading', { level: 2, name: problem.heading })).toBeInTheDocument()
    expect(screen.getByText(problem.body)).toBeInTheDocument()
    expect(screen.getByText(problem.closing)).toBeInTheDocument()
  })

  it('illustrates three forgotten sessions, Monday to Wednesday', () => {
    const { container } = render(<Problem />)
    const sessions = [...container.querySelectorAll('[data-card="session"]')]

    expect(sessions.map((card) => card.querySelector('[data-day]').textContent)).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
    ])
  })

  it('ends with one memry card that has the context loaded', () => {
    const { container } = render(<Problem />)
    const cards = container.querySelectorAll('[data-card="memry"]')

    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('memry')
    expect(cards[0]).toHaveTextContent('Context loaded')
  })

  it('settles the cards in on first view when motion is allowed', () => {
    const { container } = render(<Problem />)
    const cards = [...container.querySelectorAll('[data-card]')]

    expect(cards).toHaveLength(4)
    cards.forEach((card) => expect(card.style.opacity).toBe('0'))
  })

  it('shows the cards static, with no entrance or pill glow, when the user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })

    const { container } = render(<Problem />)
    const cards = [...container.querySelectorAll('[data-card]')]

    expect(cards).toHaveLength(4)
    cards.forEach((card) => expect(card.style.opacity).toBe(''))
    cards.forEach((card) => expect(card.style.transform).toBe(''))
    expect(container.querySelectorAll('.pill-glow')).toHaveLength(0)
  })

  it('keeps the illustration still, with no float, cursor blink or reload, under reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })

    const { container } = render(<Problem />)

    expect(container.querySelectorAll('[data-card="memry"] li')).toHaveLength(3)
    expect(
      container.querySelectorAll('.card-float, .terminal-cursor, .memry-reload, .reload-line, .pill-glow, [data-loops]'),
    ).toHaveLength(0)
  })

  it('lets every card float on its own slow rhythm once motion is allowed', () => {
    const { container } = render(<Problem />)
    const floats = [...container.querySelectorAll('.card-float')]

    expect(floats).toHaveLength(4)
    floats.forEach((float) => expect(float.querySelectorAll('[data-card]')).toHaveLength(1))
    expect(new Set(floats.map((float) => float.getAttribute('style'))).size).toBe(4)
  })

  it('blinks a terminal cursor after each session prompt when motion is allowed', () => {
    const { container } = render(<Problem />)
    const sessions = [...container.querySelectorAll('[data-card="session"]')]

    sessions.forEach((card) => expect(card.querySelectorAll('p .terminal-cursor')).toHaveLength(1))
  })

  it('reloads the memry lines one after another, then glows the status pill', () => {
    const { container } = render(<Problem />)
    const card = container.querySelector('[data-card="memry"]')
    const lines = [...card.querySelectorAll('li.reload-line')]

    expect(card).toHaveClass('memry-reload')
    expect(lines).toHaveLength(3)
    expect(lines.map((line) => line.style.getPropertyValue('--line'))).toEqual(['0', '1', '2'])
    expect(card.querySelectorAll('.pill-glow')).toHaveLength(1)
  })

  it('holds the loops until the illustration is on screen and pauses them off-screen', () => {
    const restore = trackIntersections()
    try {
      const { container } = render(<Problem />)
      const stack = container.querySelector('[data-loops]')

      expect(stack).toHaveAttribute('data-loops', 'paused')
      act(() => restore.report(stack, true))
      expect(stack).toHaveAttribute('data-loops', 'running')
      act(() => restore.report(stack, false))
      expect(stack).toHaveAttribute('data-loops', 'paused')
    } finally {
      restore()
    }
  })

  it('opens on the first scene', () => {
    const { container } = render(<Problem />)
    const [first] = problem.illustration.scenes

    expect(promptsShown(container)).toEqual(first.sessions.map((session) => session.prompt))
    expect(memoriesShown(container)).toEqual(first.memories)
  })

  it('moves on to the next scene after one reload cycle while on screen', () => {
    vi.useFakeTimers()
    const restore = trackIntersections()
    try {
      const { container } = render(<Problem />)
      const [, second] = problem.illustration.scenes
      act(() => restore.report(container.querySelector('[data-loops]'), true))

      act(() => vi.advanceTimersByTime(CYCLE_MS))

      expect(promptsShown(container)).toEqual(second.sessions.map((session) => session.prompt))
      expect(memoriesShown(container)).toEqual(second.memories)
    } finally {
      restore()
      vi.useRealTimers()
    }
  })

  it('stays on the first scene under reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })
    vi.useFakeTimers()
    try {
      const { container } = render(<Problem />)
      const [first] = problem.illustration.scenes

      act(() => vi.advanceTimersByTime(CYCLE_MS))

      expect(promptsShown(container)).toEqual(first.sessions.map((session) => session.prompt))
      expect(memoriesShown(container)).toEqual(first.memories)
    } finally {
      vi.useRealTimers()
    }
  })

  it('never comes back blank when it leaves the screen in the middle of a fade-out', () => {
    vi.useFakeTimers()
    const restore = trackIntersections()
    try {
      const { container } = render(<Problem />)
      const stack = container.querySelector('[data-loops]')
      act(() => restore.report(stack, true))

      act(() => vi.advanceTimersByTime(11500))
      expect(stack).toHaveAttribute('data-phase', 'out')
      act(() => restore.report(stack, false))
      act(() => restore.report(stack, true))

      expect(stack).not.toHaveAttribute('data-phase', 'out')
    } finally {
      restore()
      vi.useRealTimers()
    }
  })
})

import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { problem } from '../../content'
import { Problem } from './Problem'

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
    const originalObserver = window.IntersectionObserver
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

    try {
      const { container } = render(<Problem />)
      const stack = container.querySelector('[data-loops]')
      const report = (isIntersecting) =>
        observed
          .filter(({ target }) => target === stack)
          .forEach(({ target, callback }) => callback([{ target, isIntersecting }]))

      expect(stack).toHaveAttribute('data-loops', 'paused')
      act(() => report(true))
      expect(stack).toHaveAttribute('data-loops', 'running')
      act(() => report(false))
      expect(stack).toHaveAttribute('data-loops', 'paused')
    } finally {
      window.IntersectionObserver = originalObserver
    }
  })
})

import { render, screen } from '@testing-library/react'
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

  it('slowly shimmers the check on the memry card when motion is allowed', () => {
    const { container } = render(<Problem />)

    expect(container.querySelectorAll('[data-card="memry"] .check-shimmer')).toHaveLength(1)
  })

  it('shows the cards static, with no entrance or shimmer, when the user prefers reduced motion', () => {
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
    expect(container.querySelectorAll('.check-shimmer')).toHaveLength(0)
  })
})

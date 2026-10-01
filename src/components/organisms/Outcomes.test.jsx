import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { outcomes } from '../../content'
import { Outcomes } from './Outcomes'

const cards = () => within(screen.getByRole('region', { name: outcomes.heading })).getAllByRole('listitem')

describe('Outcomes', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  it('keeps the three outcomes with their titles and bodies', () => {
    render(<Outcomes />)

    expect(cards()).toHaveLength(3)
    cards().forEach((card, i) => {
      expect(within(card).getByRole('heading', { level: 3 })).toHaveTextContent(outcomes.items[i].title)
      expect(within(card).getByText(outcomes.items[i].body)).toBeInTheDocument()
    })
  })

  it('gives each card a decorative index and illustration', () => {
    render(<Outcomes />)

    cards().forEach((card, i) => {
      const index = card.querySelector('[data-index]')
      expect(index).toHaveTextContent(`0${i + 1}`)
      expect(index).toHaveAttribute('aria-hidden', 'true')
      expect(card.querySelector('[data-illustration]')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('sends an acorn back and forth between the two agents when motion is allowed', () => {
    render(<Outcomes />)
    const card = cards()[1]

    expect(within(card.querySelector('[data-illustration]')).getByText('Claude Code')).toBeInTheDocument()
    expect(within(card.querySelector('[data-illustration]')).getByText('Codex')).toBeInTheDocument()
    expect(card.querySelectorAll('.travel-acorn animateMotion')).toHaveLength(1)
  })

  it('keeps every illustration still under reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })

    render(<Outcomes />)
    const illustrations = cards().map((card) => card.querySelector('[data-illustration]'))

    expect(illustrations[1].querySelectorAll('animateMotion, animate')).toHaveLength(0)
    expect(illustrations[1].querySelectorAll('.travel-acorn')).toHaveLength(1)
    illustrations.forEach((illustration) =>
      illustration.querySelectorAll('*').forEach((node) => {
        expect(node.style?.opacity ?? '').not.toBe('0')
        expect(node.style?.transform ?? '').toBe('')
      }),
    )
  })

  it('compares re-explaining with the memry summary as labelled bars, without numbers', () => {
    render(<Outcomes />)
    const illustration = cards()[2].querySelector('[data-illustration]')

    expect(within(illustration).getByText(outcomes.visuals.tokens.repeated)).toBeInTheDocument()
    expect(within(illustration).getByText(outcomes.visuals.tokens.summary)).toBeInTheDocument()
    expect(illustration.textContent).not.toMatch(/\d/)
    expect(illustration.querySelector('[data-bar="summary"]').style.transform).toMatch(/scaleX\(0\)/)
  })
})

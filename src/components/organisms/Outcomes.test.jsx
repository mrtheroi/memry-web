import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { outcomes, security } from '../../content'
import { Outcomes } from './Outcomes'
import { Security } from './Security'

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

  it('sits on a light surface, set off from its light neighbours by a hairline', () => {
    render(<Outcomes />)
    const region = screen.getByRole('region', { name: outcomes.heading })

    expect(region).not.toHaveClass('security-bg')
    expect(region).toHaveClass('bg-[var(--background)]', 'border-t', 'border-[var(--border)]')
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('text-[var(--memry-dark)]')
  })

  it('uses the same card as Security in its light tone: white, hairline border, no glass', () => {
    render(
      <>
        <Outcomes />
        <Security />
      </>,
    )
    const securityCard = screen
      .getByRole('region', { name: security.heading })
      .querySelector('[data-glass-card]')

    expect(securityCard).toHaveAttribute('data-tone', 'dark')
    cards().forEach((card) => {
      expect(card).toHaveAttribute('data-glass-card')
      expect(card).toHaveAttribute('data-tone', 'light')
      expect(card).toHaveClass('bg-white', 'border-[var(--border)]', 'rounded-2xl')
      expect(card.className).not.toMatch(/backdrop|bg-white\/|bg-\[rgba/)
      expect(card.querySelectorAll('[class*="backdrop"]')).toHaveLength(0)
      expect(card.querySelector('[data-illustration]')).toHaveAttribute('aria-hidden', 'true')
      expect(card.querySelector('[data-index]')).toBeNull()
    })
  })

  it('sends an acorn back and forth between two agent tiles when motion is allowed, without naming the agents', () => {
    render(<Outcomes />)
    const card = cards()[1]

    expect(card.querySelector('[data-illustration]').textContent).not.toMatch(/Claude Code|Codex/)
    expect(card.querySelectorAll('.travel-acorn animateMotion')).toHaveLength(1)
  })

  it('labels the two agents with the same monogram tiles as the Agents diagram', () => {
    render(<Outcomes />)
    const tiles = [...cards()[1].querySelectorAll('[data-illustration] .agent-tile')]

    expect(tiles.map((tile) => tile.dataset.monogram)).toEqual(['CC', 'Cx'])
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

  it('compares re-explaining with the Memry summary as labelled bars, without numbers', () => {
    render(<Outcomes />)
    const illustration = cards()[2].querySelector('[data-illustration]')

    expect(within(illustration).getByText(outcomes.visuals.tokens.repeated)).toBeInTheDocument()
    expect(within(illustration).getByText(outcomes.visuals.tokens.summary)).toBeInTheDocument()
    expect(illustration.textContent).not.toMatch(/\d/)
    // The summary bar starts as long as the repeated one and shrinks to its size: never hidden.
    expect(illustration.querySelector('[data-bar="summary"]').style.transform).not.toMatch(/scaleX\(0\)/)
  })

  it('never hides an illustration part before its entrance plays', () => {
    render(<Outcomes />)

    cards().forEach((card) =>
      card.querySelectorAll('[data-illustration] *').forEach((node) => expect(node.style?.opacity ?? '').not.toBe('0')),
    )
  })
})

import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { security } from '../../content'
import { Security } from './Security'

const region = () => screen.getByRole('region', { name: security.heading })
const commitments = () =>
  within(region())
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.closest('li'))

describe('Security', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  function preferReducedMotion() {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })
  }

  it('keeps the five commitments, word for word, and both privacy links', () => {
    render(<Security />)

    expect(commitments()).toHaveLength(5)
    commitments().forEach((card, i) => {
      expect(within(card).getByRole('heading', { level: 3 })).toHaveTextContent(security.items[i].title)
      expect(card).toHaveTextContent(security.items[i].body.replaceAll('`', ''))
    })
    expect(within(region()).getByRole('link', { name: security.policyLabel })).toBeInTheDocument()
    expect(within(region()).getByRole('link', { name: security.policyEsLabel }).closest('[lang="es"]')).not.toBeNull()
  })

  it('sits on the deep navy gradient instead of the flat dark teal', () => {
    render(<Security />)

    expect(region()).toHaveClass('security-bg')
    expect(region()).not.toHaveClass('bg-[var(--memry-dark)]')
  })

  it('opens every commitment with a decorative illustration', () => {
    render(<Security />)

    commitments().forEach((card) => {
      expect(card.querySelector('[data-illustration]')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('fills the six code boxes one by one when motion is allowed', () => {
    render(<Security />)
    const dots = [...commitments()[1].querySelectorAll('[data-code-box] [data-code-dot]')]

    expect(dots).toHaveLength(6)
    dots.forEach((dot) => expect(dot.style.opacity).toBe('0'))
  })

  it('shows the account deleted after the command', () => {
    render(<Security />)

    expect(commitments()[3].querySelector('[data-illustration]').textContent).toMatch(/✓\s*Deleted/)
  })

  it('shows the boxes filled and the account deleted, with no entrance, under reduced motion', () => {
    preferReducedMotion()
    render(<Security />)
    const dots = [...commitments()[1].querySelectorAll('[data-code-dot]')]
    const deleted = commitments()[3].querySelector('[data-deleted]')

    expect(dots).toHaveLength(6)
    ;[...dots, deleted].forEach((node) => {
      expect(node.style.opacity).toBe('')
      expect(node.style.transform).toBe('')
    })
  })
})

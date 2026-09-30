import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('links the primary CTA to the get started section and the secondary CTA to GitHub', () => {
    render(<Hero />)

    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '#get-started')
    const github = screen.getByRole('link', { name: 'GitHub' })
    expect(github).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-cli')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the wordmark and tagline as a visible h1', () => {
    render(<Hero />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Memry')
    expect(h1).toHaveTextContent('Persistent memory for your AI agents.')
    expect(h1.className).not.toMatch(/sr-only/)
  })

  it('serves the text-free art, with a vertical crop for mobile', () => {
    const { container } = render(<Hero />)

    expect(screen.getByRole('img').getAttribute('src')).toBe('/hero/memry-hero-desktop.webp')
    const mobile = container.querySelector('picture source[media="(max-width: 767px)"]')
    expect(mobile).toHaveAttribute('srcset', '/hero/memry-hero-mobile.webp')
  })
})

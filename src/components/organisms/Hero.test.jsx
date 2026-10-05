import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { agents } from '../../content'
import { Hero } from './Hero'

describe('Hero', () => {
  it('links the primary CTA to the get started section and the secondary CTA to GitHub', () => {
    render(<Hero />)

    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '#get-started')
    const github = screen.getByRole('link', { name: 'View on GitHub' })
    expect(github).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-cli')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('keeps the free note out of the button, as a small line near the CTAs', () => {
    render(<Hero />)

    expect(screen.getByText('Free.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /free/i })).toBeNull()
  })

  it('shows the wordmark and tagline as a visible h1', () => {
    render(<Hero />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Memry')
    expect(h1).toHaveTextContent('Persistent memory for your AI agents.')
    expect(h1.className).not.toMatch(/sr-only/)
  })

  it('puts the brand slogan once, under the tagline and outside the h1, in place of the old hook', () => {
    const { container } = render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    const slogan = screen.getByText('Because even agents need to remember.')

    expect(heading).not.toContainElement(slogan)
    expect(heading.compareDocumentPosition(slogan) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.textContent.split('Because even agents need to remember.')).toHaveLength(2)
    expect(container.textContent).not.toContain("Your project shouldn't")
  })

  it('serves the text-free art, with a vertical crop for mobile', () => {
    const { container } = render(<Hero />)

    expect(screen.getByRole('img').getAttribute('src')).toBe('/hero/memry-hero-desktop.webp')
    const mobile = container.querySelector('picture source[media="(max-width: 767px)"]')
    expect(mobile.getAttribute('srcset')).toMatch(/memry-hero-mobile\.webp/)
  })

  it('serves responsive widths of the art, with sizes, on desktop and mobile', () => {
    const { container } = render(<Hero />)
    const img = screen.getByRole('img')
    const mobile = container.querySelector('picture source[media="(max-width: 767px)"]')

    expect(img.getAttribute('srcset')).toMatch(/ 960w/)
    expect(img.getAttribute('srcset')).toMatch(/ 1280w/)
    expect(img.getAttribute('sizes')).toMatch(/1672px/)
    expect(mobile.getAttribute('srcset')).toMatch(/ 600w/)
    expect(mobile).toHaveAttribute('sizes', '100vw')
  })

  it('stacks the two CTAs at equal, full width on the narrowest screens', () => {
    render(<Hero />)
    const group = screen.getByRole('link', { name: 'Get started' }).parentElement

    expect(group).toHaveClass('flex-col', 'min-[360px]:flex-row')
    expect(group).not.toHaveClass('flex-wrap')
  })

  it('no longer lists the agents in the hero; the Agents diagram shows them', () => {
    const { container } = render(<Hero />)

    expect(screen.queryByText('Works with')).toBeNull()
    expect(screen.queryByRole('list')).toBeNull()
    agents.list.forEach((name) => expect(container.textContent).not.toContain(name))
  })
})

import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { agents } from './content'

describe('App', () => {
  it('has exactly one h1', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('opens every new-tab link safely', () => {
    const { container } = render(<App />)
    const newTabLinks = container.querySelectorAll('a[target="_blank"]')

    expect(newTabLinks.length).toBeGreaterThan(0)
    newTabLinks.forEach((link) => expect(link).toHaveAttribute('rel', 'noopener noreferrer'))
  })

  it('never mentions a memry init command', () => {
    const { container } = render(<App />)
    expect(container.textContent).toContain('memry setup')
    expect(container.textContent).not.toMatch(/memry init/)
  })

  it('shows one memory for exactly the five supported agents', () => {
    render(<App />)
    expect(agents.list).toEqual(['Claude Code', 'Codex', 'OpenCode', 'Antigravity', 'Windsurf'])

    const section = screen.getByRole('region', { name: 'One memory, every agent' })
    const list = within(section).getByRole('list', { name: /supported agents/i })
    const names = within(list).getAllByRole('listitem').map((item) => item.textContent)
    expect(names).toEqual(agents.list)
  })

  it('no longer claims to be built only for Claude Code', () => {
    render(<App />)
    expect(screen.queryByRole('heading', { name: /built for claude code/i })).toBeNull()
    expect(screen.getByText('Requires macOS or Linux, Homebrew and at least one supported agent.')).toBeInTheDocument()
    expect(screen.queryByText(/start a new Claude Code session/)).toBeNull()
  })

  it('links the privacy policy in English and Spanish', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Read the privacy policy' })).toHaveAttribute(
      'href',
      'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.md',
    )
    expect(screen.getByRole('link', { name: 'Versión en español' })).toHaveAttribute(
      'href',
      'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.es.md',
    )
  })
})

describe('App with reduced motion', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  const prefer = (reduce) => {
    window.matchMedia = (query) => ({
      matches: reduce && query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })
  }

  it('starts the hero heading hidden for its entrance when motion is allowed', () => {
    prefer(false)
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 }).style.opacity).toBe('0')
  })

  it('renders the hero heading without an entrance animation when motion is reduced', () => {
    prefer(true)
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 }).style.opacity).toBe('')
  })
})

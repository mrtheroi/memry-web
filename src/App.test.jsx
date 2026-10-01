import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { agents } from './content'

describe('App', () => {
  it('drops the light trust strip under the hero; the agents live in the hero now', () => {
    render(<App />)
    expect(screen.queryByRole('region', { name: 'Works with' })).toBeNull()
    expect(screen.queryByRole('list', { name: 'Key facts' })).toBeNull()
    expect(screen.getAllByRole('list', { name: 'Works with' })).toHaveLength(1)
  })

  it('keeps only three dark bands and alternates the light sections between them', () => {
    const { container } = render(<App />)
    const sections = [...container.querySelectorAll('main > section')]
    const isDark = (s) => s.classList.contains('hero-bg') || s.classList.contains('security-bg')
    const dark = sections.filter(isDark).map((s) => s.getAttribute('aria-labelledby'))

    expect(dark).toEqual(['hero-title', 'security-title', 'closing-title'])

    let previous = null
    sections.forEach((section, i) => {
      if (isDark(section)) {
        previous = null
        return
      }
      const surface = section.classList.contains('bg-white') ? 'white' : section.classList.contains('bg-[var(--background)]') ? 'tint' : null
      expect(surface, section.getAttribute('aria-labelledby')).not.toBeNull()
      expect(surface).not.toBe(previous)
      // A hairline only where two light sections meet.
      const afterLight = i > 0 && !isDark(sections[i - 1])
      expect(section.classList.contains('border-t'), section.getAttribute('aria-labelledby')).toBe(afterLight)
      previous = surface
    })
  })

  it('labels every get started call to action with exactly "Get started"', () => {
    render(<App />)
    const ctas = screen.getAllByRole('link', { name: /get started/i })

    expect(ctas.length).toBeGreaterThan(0)
    ctas.forEach((link) => expect(link).toHaveAccessibleName('Get started'))
    expect(screen.queryByText(/get started, it's free/i)).toBeNull()
  })

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

    const section = screen.getByRole('region', { name: 'Five agents. One memory.' })
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

  it('opens with the problem instead of the old intro', () => {
    render(<App />)
    const problem = screen.getByRole('region', { name: 'Every session starts from zero.' })
    expect(problem).toHaveTextContent('Memry gives your project one.')
    expect(screen.queryByRole('heading', { name: 'Your project remembers.' })).toBeNull()
  })

  it('shows three outcomes', () => {
    render(<App />)
    const outcomes = screen.getByRole('region', { name: 'What changes with Memry' })
    expect(within(outcomes).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Pick up where you left off.',
      'Switch agents, keep the context.',
      'Spend tokens on work, not repetition.',
    ])
  })

  it('explains how it works in exactly three steps', () => {
    render(<App />)
    const how = screen.getByRole('region', { name: 'How it works' })
    const steps = within(within(how).getByRole('list', { name: 'Steps' })).getAllByRole('listitem')
    expect(steps.map((step) => within(step).getByRole('heading', { level: 3 }).textContent)).toEqual([
      'Install in seconds.',
      'Connect your agents.',
      'Work. Memry remembers.',
    ])
    expect(steps[0]).toHaveTextContent('brew install mrtheroi/tap/memry')
    expect(within(how).getByText('.memry.json', { selector: 'figcaption' })).toBeInTheDocument()
  })

  it('lists three use cases, none repeating another section', () => {
    render(<App />)
    const cases = screen.getByRole('region', { name: 'Built for the way you actually work' })
    expect(within(cases).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Long-running projects.',
      'Bugs that take days.',
      'Coming back after a break.',
    ])
  })

  it('no longer has a Why memry section', () => {
    render(<App />)
    expect(screen.queryByRole('heading', { name: 'Why memry' })).toBeNull()
  })

  it('shows five security commitments and points the Privacy nav link at them', () => {
    render(<App />)
    const security = screen.getByRole('region', { name: 'Built to be trusted with your work.' })
    expect(within(security).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Your token stays with you.',
      'No passwords.',
      'Your memories are yours.',
      'Leave anytime.',
      'Open source.',
    ])
    const memories = within(security).getByRole('heading', { name: 'Your memories are yours.' }).closest('li')
    expect(memories).toHaveTextContent(
      "Never used to train AI models. We don't read them unless you ask us to help or the law requires it.",
    )
    within(security).getByRole('link', { name: 'Read the privacy policy' })
    within(security).getByRole('link', { name: 'Versión en español' })

    const nav = screen.getByRole('navigation', { name: 'Main' })
    const privacyLink = within(nav).getByRole('link', { name: 'Privacy' })
    expect(privacyLink).toHaveAttribute('href', `#${security.id}`)
    expect(screen.queryByRole('heading', { name: 'Your memories stay yours' })).toBeNull()
  })

  it('closes with a next step forward (the docs and GitHub), never an anchor back up to get started', () => {
    render(<App />)
    const closing = screen.getByRole('region', { name: 'Give your project a memory.' })
    // The free beta is said once in the hero and once in Get started; the closing line doesn't repeat it.
    expect(closing).toHaveTextContent('Two commands. Every agent.')
    expect(closing).not.toHaveTextContent(/free/i)
    expect(closing.querySelector('a[href="#get-started"]')).toBeNull()
    expect(within(closing).getByRole('link', { name: 'Read the docs' })).toHaveAttribute(
      'href',
      'https://github.com/mrtheroi/memry-cli#readme',
    )
    expect(within(closing).getByRole('link', { name: 'View on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/mrtheroi/memry-cli',
    )
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

describe('App content without repetition', () => {
  /** Page text outside the places allowed to name things (hero chips, the diagram, the terminal). */
  const textOutside = (container, allowed) => {
    const clone = container.cloneNode(true)
    clone.querySelectorAll(allowed).forEach((el) => el.remove())
    return clone.textContent
  }

  it('names the five agents only in the hero chips, the Agents diagram and the setup terminal', () => {
    const { container } = render(<App />)
    const text = textOutside(container, '[aria-labelledby="hero-works-with"], .agents-canvas, figure[aria-label^="Terminal"]')

    agents.list.forEach((name) => expect(text).not.toContain(name))
  })

  it('mentions the free beta at most twice', () => {
    const { container } = render(<App />)
    const mentions = [...container.querySelectorAll('p, li, span')].filter(
      (el) => el.children.length === 0 && /\bfree\b|\bbeta\b/i.test(el.textContent),
    )

    expect(mentions.length).toBeLessThanOrEqual(2)
  })

  it('says "two commands" at most twice', () => {
    const { container } = render(<App />)

    expect(container.textContent.match(/two commands/gi)?.length ?? 0).toBeLessThanOrEqual(2)
  })

  it('explains .memry.json once, in How it works', () => {
    const { container } = render(<App />)
    const explanations = [...container.querySelectorAll('section')].filter((section) =>
      /\.memry\.json/.test(textOutside(section, '.agents-canvas, figure figcaption')),
    )

    expect(explanations.map((s) => s.getAttribute('aria-labelledby'))).toEqual(['how-title'])
  })

  it('covers uninstalling and deleting the account in Security only', () => {
    const { container } = render(<App />)
    const sections = [...container.querySelectorAll('section')].filter((s) => /uninstall|delete-account/.test(s.textContent))

    expect(sections.map((s) => s.getAttribute('aria-labelledby'))).toEqual(['security-title'])
  })

  it('keeps the switch-agents idea out of the use cases', () => {
    const { container } = render(<App />)
    const useCases = container.querySelector('[aria-labelledby="use-cases-title"]')

    expect(useCases.textContent).not.toMatch(/switch|multi-agent|best agent/i)
  })
})

describe('App type scale', () => {
  it('sets every section heading on one H2 scale, the closing one step larger (56px max)', () => {
    const { container } = render(<App />)
    const headings = [...container.querySelectorAll('main h2')]
    const closing = headings.find((h) => h.id === 'closing-title')

    headings.filter((h) => h !== closing).forEach((h) => expect(h, h.id).toHaveClass('text-[clamp(2rem,4vw,3rem)]'))
    expect(closing).toHaveClass('text-[clamp(2rem,4.5vw,3.5rem)]')
  })
})

import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { agents } from '../../content'
import { Agents } from './Agents'

// The diagram renders one drawing per layout (wide and narrow); CSS shows one of them.
const layouts = ['wide', 'narrow']

function drawing(container, layout) {
  return container.querySelector(`svg[data-layout="${layout}"]`)
}

const endPoint = (d) => d.trim().split(/[\s,A-Z]+/).filter(Boolean).slice(-2).join(' ')

describe('Agents diagram', () => {
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

  it('sits on a light section with dark text, keeping the diagram on its own navy canvas', () => {
    const { container } = render(<Agents />)
    const region = screen.getByRole('region', { name: agents.heading })

    expect(region).not.toHaveClass('security-bg')
    expect(region).toHaveClass('bg-[var(--background)]', 'border-t', 'border-[var(--border)]')
    expect(screen.getByRole('heading', { level: 2, name: agents.heading })).toHaveClass('text-[var(--memry-dark)]')
    expect(container.querySelector('figure.agents-canvas')).not.toBeNull()
  })

  it.each(layouts)('draws one curve per agent plus memry to the project memory (%s)', (layout) => {
    const { container } = render(<Agents />)
    const svg = drawing(container, layout)

    expect(svg.querySelectorAll('path.agent-curve')).toHaveLength(agents.list.length)
    expect(svg.querySelectorAll('path.hub-curve')).toHaveLength(1)
  })

  it.each(layouts)('sends one save pulse per agent and one recall pulse (%s)', (layout) => {
    const { container } = render(<Agents />)
    const svg = drawing(container, layout)

    expect(svg.querySelectorAll('.save-pulse')).toHaveLength(agents.list.length)
    expect(svg.querySelectorAll('.recall-pulse')).toHaveLength(1)
  })

  it.each(layouts)('carries every save pulse through memry into the project memory (%s)', (layout) => {
    const { container } = render(<Agents />)
    const svg = drawing(container, layout)
    const memory = endPoint(svg.querySelector('path.hub-curve').getAttribute('d'))
    const curves = [...svg.querySelectorAll('path.agent-curve')].map((path) => path.getAttribute('d'))

    ;[...svg.querySelectorAll('.save-pulse')].forEach((pulse, i) => {
      const legs = [...pulse.querySelectorAll('animateMotion')].map((motion) => motion.getAttribute('path'))
      expect(legs).toEqual([curves[i], svg.querySelector('path.hub-curve').getAttribute('d')])
      expect(endPoint(legs.at(-1))).toBe(memory)
    })
  })

  it.each(layouts)('glows the project memory as each save pulse arrives (%s)', (layout) => {
    const { container } = render(<Agents />)
    const glow = drawing(container, layout).querySelectorAll('.memory-glow')

    expect(glow).toHaveLength(1)
    expect(glow[0].querySelectorAll('animate')).toHaveLength(agents.list.length)
  })

  it.each(layouts)('keeps only the static curves when the user prefers reduced motion (%s)', (layout) => {
    preferReducedMotion()
    const { container } = render(<Agents />)
    const svg = drawing(container, layout)

    expect(svg.querySelectorAll('path.agent-curve')).toHaveLength(agents.list.length)
    expect(svg.querySelectorAll('.save-pulse, .recall-pulse, .memory-glow')).toHaveLength(0)
    expect(svg.querySelectorAll('animate, animateMotion')).toHaveLength(0)
  })

  it('centres the heading and body above a full-width diagram', () => {
    const { container } = render(<Agents />)
    const header = screen.getByRole('heading', { level: 2, name: agents.heading }).parentElement

    expect(header).toHaveClass('text-center')
    expect(container.querySelector('[class*="grid-cols"]')).toBeNull()
    expect(container.querySelector('[class*="max-lg:"]')).toBeNull()
  })

  it('draws the diagram on the dark navy canvas', () => {
    const { container } = render(<Agents />)
    expect(container.querySelector('figure')).toHaveClass('agents-canvas')
  })

  it('shows no status dots: the monogram tile and border glow carry each chip', () => {
    const { container } = render(<Agents />)
    expect(container.querySelectorAll('.agent-status')).toHaveLength(0)
  })

  it('shows no status dots when the user prefers reduced motion', () => {
    preferReducedMotion()
    const { container } = render(<Agents />)
    expect(container.querySelectorAll('.agent-status')).toHaveLength(0)
  })

  it('rings memry with a slow pulse only when motion is allowed', () => {
    const { container, unmount } = render(<Agents />)
    expect(container.querySelectorAll('.hub-ring')).toHaveLength(1)
    unmount()

    preferReducedMotion()
    const reduced = render(<Agents />)
    expect(reduced.container.querySelectorAll('.hub-ring')).toHaveLength(0)
  })

  it.each(layouts)('grows memry as a Memory Tree with one memory node per agent (%s)', (layout) => {
    const { container } = render(<Agents />)
    const tree = drawing(container, layout).querySelector('[data-testid="memry-tree"]')

    expect(tree).not.toBeNull()
    expect(tree.querySelectorAll('.tree-node')).toHaveLength(agents.list.length)
  })

  it('shows the project as a folder of file rows labelled "Your project"', () => {
    const { container } = render(<Agents />)
    const folder = container.querySelector('[data-testid="project-folder"]')

    expect(folder).toHaveTextContent('Your project')
    expect([...folder.querySelectorAll('.file-row')].map((row) => row.textContent)).toEqual([
      'main',
      'src/',
      'README.md',
      '.memry.json',
    ])
  })

  it.each(layouts)('lights a different tree node as each save pulse reaches memry (%s)', (layout) => {
    const { container } = render(<Agents />)
    const svg = drawing(container, layout)
    const sparks = [...svg.querySelectorAll('.tree-spark')]
    const arrivals = [...svg.querySelectorAll('.save-pulse')].map(
      (pulse) => `${pulse.querySelector('animateMotion').id}.end`,
    )

    expect(sparks).toHaveLength(agents.list.length)
    expect(sparks.map((spark) => spark.querySelector('animate').getAttribute('begin').split('-')[0]).sort()).toEqual(
      [...arrivals].sort(),
    )
    expect(new Set(sparks.map((spark) => `${spark.getAttribute('cx')} ${spark.getAttribute('cy')}`)).size).toBe(
      agents.list.length,
    )
  })

  it('highlights a folder row as each save pulse arrives, one schedule per agent', () => {
    const { container } = render(<Agents />)
    const rows = [...container.querySelectorAll('[data-testid="project-folder"] .file-row')]
    const glows = rows.flatMap((row) => [...row.querySelectorAll('.file-row-glow')])
    const delays = glows.map((glow) => glow.style.animationDelay)

    expect(glows).toHaveLength(agents.list.length)
    expect(new Set(delays).size).toBe(agents.list.length)
    expect(rows.every((row) => row.querySelector('.file-row-glow'))).toBe(true)
    // Arrival = start + agent offset + agent-to-memry + memry-to-folder legs (1.6 + 0 + 4.2 + 2.6), less a beat.
    expect(delays).toContain('8.2s')
    glows.forEach((glow) => expect(glow.style.animationDuration).toBe('16s'))
  })

  it('draws the tree and folder still, with no lighting, when the user prefers reduced motion', () => {
    preferReducedMotion()
    const { container } = render(<Agents />)

    layouts.forEach((layout) => {
      const svg = drawing(container, layout)
      expect(svg.querySelectorAll('[data-testid="memry-tree"] .tree-node')).toHaveLength(agents.list.length)
      expect(svg.querySelectorAll('.tree-spark')).toHaveLength(0)
    })
    expect(container.querySelectorAll('.file-row')).toHaveLength(agents.files.length)
    expect(container.querySelectorAll('.file-row-glow')).toHaveLength(0)
  })

  it('labels memry without a pill chip', () => {
    const { container } = render(<Agents />)
    const figure = container.querySelector('figure')

    expect(figure.querySelector('[class*="bg-[var(--memry-teal)]"]')).toBeNull()
  })

  it('names memry with the brand wordmark under the tree, its final "y" in orange', () => {
    const { container } = render(<Agents />)
    const wordmark = container.querySelector('[data-testid="memry-wordmark"]')
    const y = wordmark.querySelector('span')

    expect(wordmark).toHaveTextContent(agents.hub)
    expect(y).toHaveTextContent(/^y$/)
    expect(y).toHaveClass('text-[var(--memry-orange)]')
  })

  it('marks where the agent curves meet with a junction, ringed only when motion is allowed', () => {
    const { container, unmount } = render(<Agents />)
    const junction = container.querySelector('.hub-junction')
    expect(junction).not.toBeNull()
    expect(junction.querySelectorAll('.hub-ring')).toHaveLength(1)
    unmount()

    preferReducedMotion()
    const reduced = render(<Agents />)
    expect(reduced.container.querySelectorAll('.hub-junction')).toHaveLength(1)
    expect(reduced.container.querySelectorAll('.hub-ring')).toHaveLength(0)
  })

  it('puts a hidden monogram tile before each agent name, keeping the name as the accessible text', () => {
    render(<Agents />)
    const items = within(screen.getByRole('list', { name: 'Supported agents' })).getAllByRole('listitem')
    const tiles = items.map((item) => item.querySelector('.agent-tile'))

    expect(tiles.map((tile) => tile.dataset.monogram)).toEqual(['CC', 'Cx', 'OC', 'AG', 'WS'])
    tiles.forEach((tile) => expect(tile).toHaveAttribute('aria-hidden', 'true'))
    agents.list.forEach((name) => expect(within(screen.getByRole('list', { name: 'Supported agents' })).getByText(name)).toBeVisible())
  })

  it('brightens each chip border as its save pulse leaves, only when motion is allowed', () => {
    const { container, unmount } = render(<Agents />)
    const items = within(screen.getByRole('list', { name: 'Supported agents' })).getAllByRole('listitem')
    const chips = items.map((item) => item.querySelector('.agent-send-glow'))
    const sendTimes = [...drawing(container, 'wide').querySelectorAll('.save-pulse')].map((pulse) =>
      pulse.querySelector('animateMotion').getAttribute('begin').split(';')[0],
    )

    expect(chips.map((chip) => chip.style.animationDelay)).toEqual(sendTimes)
    chips.forEach((chip) => expect(chip.style.animationDuration).toBe('16s'))
    unmount()

    preferReducedMotion()
    const reduced = render(<Agents />)
    expect(reduced.container.querySelectorAll('.agent-send-glow')).toHaveLength(0)
  })

  it('still lists exactly the five supported agents', () => {
    render(<Agents />)
    const list = screen.getByRole('list', { name: 'Supported agents' })
    expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(agents.list)
  })

  it('captions the diagram with setup only, the command set as code', () => {
    const { container } = render(<Agents />)
    const caption = container.querySelector('figure figcaption')

    expect(caption).toHaveTextContent('memry setup asks which agents you use and connects each one.')
    expect(caption.textContent).not.toMatch(/uninstall|`/)
    expect(caption.querySelector('code')).toHaveTextContent('memry setup')
  })

  it('draws every curve in full before any animation runs, so the diagram is complete on a fast scroll', () => {
    const { container } = render(<Agents />)

    container.querySelectorAll('.agent-curve, .hub-curve').forEach((curve) => {
      expect(curve.getAttribute('pathLength')).toBeNull()
      expect(curve.style.strokeDasharray ?? '').toBe('')
    })
  })
})

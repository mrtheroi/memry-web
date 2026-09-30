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

  it('still lists exactly the five supported agents', () => {
    render(<Agents />)
    const list = screen.getByRole('list', { name: 'Supported agents' })
    expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(agents.list)
  })
})

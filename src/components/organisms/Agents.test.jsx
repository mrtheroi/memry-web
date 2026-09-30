import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { agents } from '../../content'
import { Agents } from './Agents'

// The diagram renders one drawing per layout (wide and narrow); CSS shows one of them.
const layouts = ['wide', 'narrow']

function drawing(container, layout) {
  return container.querySelector(`svg[data-layout="${layout}"]`)
}

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

  it.each(layouts)('keeps only the static curves when the user prefers reduced motion (%s)', (layout) => {
    preferReducedMotion()
    const { container } = render(<Agents />)
    const svg = drawing(container, layout)

    expect(svg.querySelectorAll('path.agent-curve')).toHaveLength(agents.list.length)
    expect(svg.querySelectorAll('.save-pulse, .recall-pulse')).toHaveLength(0)
    expect(svg.querySelectorAll('animate, animateMotion')).toHaveLength(0)
  })

  it('still lists exactly the five supported agents', () => {
    render(<Agents />)
    const list = screen.getByRole('list', { name: 'Supported agents' })
    expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(agents.list)
  })
})

import { act, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CloudVisual, CommunityVisual } from './EditionVisuals'

describe.each([
  ['CloudVisual', CloudVisual],
  ['CommunityVisual', CommunityVisual],
])('%s', (_, Visual) => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  it('lets the boundary take all the width left beside the agents, uncapped', () => {
    const { container } = render(<Visual />)
    const area = container.querySelector('[data-boundary]').parentElement

    expect(area).toHaveClass('flex-1')
    expect(area.className).not.toMatch(/(^|\s)max-w-/)
  })

  it('measures itself against the card width, so the whole picture scales with it', () => {
    const { container } = render(<Visual />)

    expect(container.firstElementChild).toHaveClass('@container')
  })

  it('keeps shrinking with the card down to a 320px phone, so nothing spills out of the boundary', () => {
    const { container } = render(<Visual />)
    const unit = container.firstElementChild.firstElementChild.style.getPropertyValue('--u')
    const floor = Number(unit.match(/^clamp\(([\d.]+)px,/)[1])
    // At a 320px viewport the card is 288px wide and its full-bleed picture 286px, so 1cqw is 2.86px.
    const narrowestCqw = 286 / 100

    expect(floor).toBeLessThanOrEqual(narrowestCqw)
  })

  it('does not animate at all when the user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })

    const { container } = render(<Visual />)

    expect(container.querySelectorAll('.edition-pulse')).toHaveLength(0)
    expect(container.querySelectorAll('animateMotion, animate')).toHaveLength(0)
    expect(container.querySelectorAll('path.edition-line')).toHaveLength(3)
  })

  it('sends one pulse along each agent line towards memry, each on its own delay', () => {
    const { container } = render(<Visual />)
    const pulses = [...container.querySelectorAll('.edition-pulse')]
    const lines = [...container.querySelectorAll('path.edition-line')].map((line) => line.getAttribute('d'))
    const motions = pulses.map((pulse) => pulse.querySelector('animateMotion'))

    expect(pulses).toHaveLength(3)
    expect(motions.map((motion) => motion.getAttribute('path'))).toEqual(lines)
    expect(new Set(motions.map((motion) => motion.getAttribute('begin'))).size).toBe(3)
  })

  it('runs the pulses only while the picture is on screen', () => {
    const originalObserver = window.IntersectionObserver
    const observers = []
    window.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback
        observers.push(this)
      }
      observe(target) {
        this.target = target
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    // jsdom has no SMIL clock; stand in for the browser's pause and unpause.
    const proto = window.SVGSVGElement.prototype
    proto.pauseAnimations = vi.fn()
    proto.unpauseAnimations = vi.fn()
    try {
      const { container } = render(<Visual />)
      const svg = container.querySelector('path.edition-line').closest('svg')
      const report = (isIntersecting) =>
        observers.filter((o) => o.target === svg).forEach((o) => o.callback([{ target: svg, isIntersecting }]))

      expect(svg).toHaveAttribute('data-playing', 'false')
      expect(proto.pauseAnimations).toHaveBeenCalled()
      act(() => report(true))
      expect(svg).toHaveAttribute('data-playing', 'true')
      expect(proto.unpauseAnimations).toHaveBeenCalledTimes(1)
      act(() => report(false))
      expect(svg).toHaveAttribute('data-playing', 'false')
    } finally {
      window.IntersectionObserver = originalObserver
      delete proto.pauseAnimations
      delete proto.unpauseAnimations
    }
  })
})

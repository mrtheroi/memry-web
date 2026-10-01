import { act, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryTree } from './MemoryTree'

describe('MemoryTree', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  it('does not twinkle when the user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })

    const { container } = render(<MemoryTree />)

    expect(container.querySelectorAll('.memory-twinkle')).toHaveLength(0)
  })

  it('twinkles every memory node, each on its own delay', () => {
    const { container } = render(<MemoryTree />)
    const halos = [...container.querySelectorAll('.memory-twinkle')]

    expect(halos).toHaveLength(8)
    expect(new Set(halos.map((halo) => halo.style.animationDelay)).size).toBe(8)
  })

  it('runs the twinkle only while the tree is on screen', () => {
    const original = window.IntersectionObserver
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
    try {
      const { container } = render(<MemoryTree />)
      const svg = container.querySelector('svg')
      const report = (isIntersecting) =>
        observers.filter((o) => o.target === svg).forEach((o) => o.callback([{ target: svg, isIntersecting }]))

      expect(svg).toHaveAttribute('data-playing', 'false')
      act(() => report(true))
      expect(svg).toHaveAttribute('data-playing', 'true')
      act(() => report(false))
      expect(svg).toHaveAttribute('data-playing', 'false')
    } finally {
      window.IntersectionObserver = original
    }
  })

  it('draws the whole tree before any animation runs: no hidden branches, memories or acorns', () => {
    const { container } = render(<MemoryTree />)

    container.querySelectorAll('path, g').forEach((node) => {
      expect(node.style.opacity).not.toBe('0')
      expect(node.getAttribute('pathLength') ?? '').toBe('')
      expect(node.style.strokeDasharray ?? '').not.toMatch(/^0px/)
    })
  })
})

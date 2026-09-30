import { render } from '@testing-library/react'
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
})

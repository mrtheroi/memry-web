import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function mockMatchMedia(initialMatches) {
  const listeners = new Set()
  const mql = {
    matches: initialMatches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: (_type, fn) => listeners.add(fn),
    removeEventListener: (_type, fn) => listeners.delete(fn),
  }
  window.matchMedia = vi.fn().mockReturnValue(mql)
  return {
    change(matches) {
      mql.matches = matches
      listeners.forEach((fn) => fn({ matches }))
    },
  }
}

describe('usePrefersReducedMotion', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
  })

  it('returns true when the user prefers reduced motion', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('returns false when the user has no motion preference', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('updates when the preference changes', () => {
    const media = mockMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    act(() => media.change(true))
    expect(result.current).toBe(true)
  })
})

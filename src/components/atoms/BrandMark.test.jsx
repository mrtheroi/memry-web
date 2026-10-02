import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandMark } from './BrandMark'

describe('BrandMark', () => {
  it('shows the Memory Tree mark instead of the mascot image', () => {
    const { container } = render(<BrandMark tone="onDark" />)
    const tree = screen.getByTestId('tree-mark')
    expect(tree.tagName.toLowerCase()).toBe('svg')
    expect(tree).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('img')).toBeNull()
  })
})

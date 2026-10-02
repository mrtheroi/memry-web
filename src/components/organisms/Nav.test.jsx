import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Nav } from './Nav'

describe('Nav', () => {
  it('keeps the brand link named Memry and shows the Memory Tree mark', () => {
    render(<Nav />)
    const brand = screen.getByRole('link', { name: 'Memry, back to top' })
    expect(brand).toHaveAttribute('href', '#top')
    expect(brand.querySelector('[data-testid="tree-mark"]')).not.toBeNull()
  })
})

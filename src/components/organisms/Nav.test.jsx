import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Nav } from './Nav'

describe('Nav', () => {
  it('keeps the brand link named Memry and shows the Memory Tree mark', () => {
    render(<Nav />)
    const brand = screen.getByRole('link', { name: 'Memry, back to top' })
    expect(brand).toHaveAttribute('href', '#top')
    expect(brand.querySelector('[data-testid="tree-mark"]')).not.toBeNull()
  })
  it('shows four section links from md (768px) and adds Self-hosting only from lg (1024px), so the header never wraps', () => {
    render(<Nav />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    const item = (name) => within(nav).getByRole('link', { name }).closest('li')

    ;['How it works', 'Get started', 'Privacy', 'FAQ'].forEach((name) => {
      expect(item(name), name).toHaveClass('hidden', 'md:block')
      expect(item(name), name).not.toHaveClass('lg:block')
    })
    expect(item('Self-hosting')).toHaveClass('hidden', 'lg:block')
    expect(item('Self-hosting')).not.toHaveClass('md:block')
  })
})

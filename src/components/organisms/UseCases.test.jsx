import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCases } from '../../content'
import { UseCases } from './UseCases'

describe('UseCases', () => {
  it('centres the heading vertically against the grid on desktop', () => {
    render(<UseCases />)

    expect(screen.getByRole('heading', { level: 2, name: useCases.heading }).parentElement).toHaveClass('lg:items-center')
  })
})

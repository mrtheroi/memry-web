import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('opens external URLs in a new tab safely', () => {
    render(<TextLink href="https://github.com/mrtheroi/memry-cli">GitHub</TextLink>)

    const link = screen.getByRole('link', { name: /GitHub/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('keeps in-page anchors in the same tab', () => {
    render(<TextLink href="#get-started">Get started</TextLink>)

    const link = screen.getByRole('link', { name: 'Get started' })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })
})

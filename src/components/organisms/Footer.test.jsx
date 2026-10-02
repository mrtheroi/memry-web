import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('links GitHub, the docs, the changelog, privacy, security and the license', () => {
    render(<Footer />)
    const links = within(screen.getByRole('navigation', { name: 'Footer' })).getAllByRole('link')
    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['GitHub', 'https://github.com/mrtheroi/memry-cli'],
      ['Docs', 'https://github.com/mrtheroi/memry-cli#readme'],
      ['Changelog', 'https://github.com/mrtheroi/memry-cli/blob/main/CHANGELOG.md'],
      ['Privacy policy', 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.md'],
      ['Security', 'mailto:mrtheroi@gmail.com'],
      ['MIT licensed', 'https://github.com/mrtheroi/memry-cli/blob/main/LICENSE'],
    ])
  })

  it('opens web links in a safe new tab and the security email in the mail app', () => {
    render(<Footer />)
    const links = within(screen.getByRole('navigation', { name: 'Footer' })).getAllByRole('link')
    links
      .filter((link) => link.getAttribute('href').startsWith('https://'))
      .forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    expect(screen.getByRole('link', { name: 'Security' })).not.toHaveAttribute('target')
  })

  it('shows the Memory Tree brand mark, not the mascot image', () => {
    const { container } = render(<Footer />)
    expect(screen.getByTestId('tree-mark')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeNull()
  })
})

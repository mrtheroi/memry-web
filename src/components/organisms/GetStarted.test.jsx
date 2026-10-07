import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { project } from '../../content'
import { GetStarted } from './GetStarted'

describe('GetStarted', () => {
  it('copies only the two install commands, never the setup output', async () => {
    const user = userEvent.setup()
    render(<GetStarted />)

    await user.click(screen.getByRole('button', { name: 'Copy install commands' }))

    expect(await navigator.clipboard.readText()).toBe('brew install mrtheroi/tap/memry\nmemry setup')
  })

  it('offers a real next step under the terminal: the docs and the repository, opened safely', () => {
    render(<GetStarted />)
    const actions = screen.getByRole('group', { name: 'Next steps' })

    const docs = within(actions).getByRole('link', { name: 'Read the docs' })
    expect(docs).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-cli#readme')
    const github = within(actions).getByRole('link', { name: 'View on GitHub' })
    expect(github).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-cli')
    ;[docs, github].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
    expect(screen.getByText('Free.')).toBeInTheDocument()
  })

  it('lists the project facts: docs, changelog, releases and source, opened safely', () => {
    render(<GetStarted />)
    const facts = screen.getByRole('list', { name: 'Project' })
    const links = within(facts).getAllByRole('link')
    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Docs', 'https://github.com/mrtheroi/memry-cli#readme'],
      ['Changelog', 'https://github.com/mrtheroi/memry-cli/blob/main/CHANGELOG.md'],
      ['Releases', 'https://github.com/mrtheroi/memry-cli/releases'],
      ['Source', 'https://github.com/mrtheroi/memry-cli'],
    ])
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('shows the static release label stored in content', () => {
    render(<GetStarted />)
    expect(project.release).toBe('Latest release: v1.0.0')
    expect(within(screen.getByRole('list', { name: 'Project' })).getByText(project.release)).toBeInTheDocument()
  })
})

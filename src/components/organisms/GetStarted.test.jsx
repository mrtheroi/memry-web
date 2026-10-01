import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
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
    expect(screen.getByText('Free public beta.')).toBeInTheDocument()
  })
})

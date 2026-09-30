import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  it('copies the exact text to the clipboard', async () => {
    const user = userEvent.setup()
    render(<CopyButton text={'brew install mrtheroi/tap/memry\nmemry setup'} label="Copy install commands" copiedLabel="Copied" />)

    await user.click(screen.getByRole('button', { name: 'Copy install commands' }))

    expect(await navigator.clipboard.readText()).toBe('brew install mrtheroi/tap/memry\nmemry setup')
  })

  it('confirms the copy to the visitor', async () => {
    const user = userEvent.setup()
    render(<CopyButton text="memry setup" label="Copy install commands" copiedLabel="Copied" />)

    await user.click(screen.getByRole('button', { name: 'Copy install commands' }))

    expect(await screen.findByRole('status')).toHaveTextContent('Copied')
  })
})

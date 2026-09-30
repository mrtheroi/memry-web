import { render, screen } from '@testing-library/react'
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
})

import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { agents } from '../../content'
import { TrustStrip } from './TrustStrip'

describe('TrustStrip', () => {
  it('lists the five supported agents and the three facts', () => {
    render(<TrustStrip />)

    const strip = screen.getByRole('region', { name: 'Works with' })
    const agentList = within(strip).getByRole('list', { name: 'Works with' })
    expect(within(agentList).getAllByRole('listitem').map((item) => item.textContent)).toEqual(agents.list)

    const facts = within(strip).getByRole('list', { name: 'Key facts' })
    expect(within(facts).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      '2 commands to install',
      'Open source (MIT)',
      'Never used to train AI models',
    ])
  })
})

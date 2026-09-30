import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getStarted } from '../../content'
import { Terminal } from './Terminal'

describe('Terminal', () => {
  it('shows the real setup command and never a non-existent init command', () => {
    render(<Terminal commands={getStarted.commands} output={getStarted.output} />)

    const terminal = screen.getByRole('figure', { name: /terminal/i })
    expect(terminal).toHaveTextContent('$ brew install mrtheroi/tap/memry')
    expect(terminal).toHaveTextContent('$ memry setup')
    expect(terminal).toHaveTextContent('✓ Installed the memry SessionStart hook')
    expect(terminal.textContent).not.toMatch(/memry init/)
  })
})

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Community } from './Community'

const region = () => screen.getByRole('region', { name: 'Hosted for you, or on your own servers.' })
const card = (title) => within(region()).getByRole('heading', { level: 3, name: title }).closest('li')

describe('Community', () => {
  it('compares Memry Cloud and Memry Community side by side, as two cards', () => {
    render(<Community />)

    expect(within(region()).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Memry Cloud',
      'Memry Community',
    ])
  })
  it('gives each edition a short tagline under its title', () => {
    render(<Community />)

    expect(within(card('Memry Cloud')).getByText('Nothing to host.')).toBeInTheDocument()
    expect(within(card('Memry Community')).getByText('Your servers, your data.')).toBeInTheDocument()
  })
  it('marks every point with a small decorative checkmark', () => {
    render(<Community />)

    ;[card('Memry Cloud'), card('Memry Community')].forEach((c) => {
      within(within(c).getByRole('list'))
        .getAllByRole('listitem')
        .forEach((li) => {
          const icon = li.querySelector('svg[data-icon="check"]')
          expect(icon).not.toBeNull()
          expect(icon).toHaveAttribute('aria-hidden', 'true')
        })
    })
  })
  it('opens Memry Cloud with a decorative picture: your agents connected to a memry server that Memry runs', () => {
    render(<Community />)
    const picture = card('Memry Cloud').querySelector('[data-illustration]')

    expect(picture).toHaveAttribute('aria-hidden', 'true')
    expect([...picture.querySelectorAll('[data-monogram]')].map((tile) => tile.dataset.monogram)).toEqual(['CC', 'Cx', 'OC'])
    expect(picture).toHaveTextContent('your agents')
    expect(picture.querySelectorAll('path.edition-line')).toHaveLength(3)
    const boundary = picture.querySelector('[data-boundary]')
    expect(boundary).toHaveAttribute('data-boundary', 'memry')
    expect(boundary).toHaveTextContent('run by Memry')
    expect(within(boundary).getByTestId('tree-mark')).toBeInTheDocument()
  })
  it('opens Memry Community with the same picture, but memry runs in containers beside PostgreSQL inside your servers', () => {
    render(<Community />)
    const picture = card('Memry Community').querySelector('[data-illustration]')

    expect(picture).toHaveAttribute('aria-hidden', 'true')
    expect([...picture.querySelectorAll('[data-monogram]')].map((tile) => tile.dataset.monogram)).toEqual(['CC', 'Cx', 'OC'])
    expect(picture).toHaveTextContent('your agents')
    expect(picture.querySelectorAll('path.edition-line')).toHaveLength(3)
    const boundary = picture.querySelector('[data-boundary]')
    expect(boundary).toHaveAttribute('data-boundary', 'yours')
    expect(boundary).toHaveClass('border-dashed')
    expect(boundary).toHaveTextContent('your servers')
    // A generic stack of shipping containers (not any product's logo), carrying memry's mark, named in plain text.
    const containers = boundary.querySelector('[data-containers]')
    expect(containers).toHaveTextContent('Docker')
    expect(containers.querySelectorAll('[data-container]')).toHaveLength(3)
    expect(within(containers).getByTestId('tree-mark')).toBeInTheDocument()
    expect(boundary.querySelector('[data-database]')).toHaveTextContent('PostgreSQL')
  })
  it('runs each illustration full-bleed across the top of its card, edge to edge', () => {
    render(<Community />)

    ;[card('Memry Cloud'), card('Memry Community')].forEach((c) => {
      const slot = c.querySelector('[data-illustration]')
      expect(slot).toHaveClass('-mx-5', '-mt-5', 'sm:-mx-7', 'sm:-mt-7', 'rounded-t-[15px]')
      expect(slot.className).not.toMatch(/(^|\s)(px-4|py-3|rounded-lg)(\s|$)/)
    })
  })
  it('describes Memry Cloud as hosted and free, and sends it to the existing get started target', () => {
    render(<Community />)
    const cloud = card('Memry Cloud')

    expect(within(within(cloud).getByRole('list')).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'We run the server for you.',
      'Log in with an email code from memry setup.',
      'Free.',
    ])
    expect(within(cloud).getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '#get-started')
  })
  it('describes Memry Community with the stated facts only', () => {
    render(<Community />)
    const self = card('Memry Community')

    expect(within(within(self).getByRole('list')).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'The same open-source server, MIT licensed. Free.',
      'Runs on your own infrastructure with Docker and PostgreSQL.',
      'Your memories stay in your database. The server sends no telemetry.',
      'One command starts the server, creates your user and connects your agents. You need Docker and curl.',
    ])
    // No price beyond free (outside the terminal, whose "$" is the shell prompt).
    const prose = self.textContent.replace(within(self).getByRole('figure').textContent, '')
    expect(prose).not.toMatch(/[$€£]|\/mo|per month|plan|tier|premium|subscription/i)
  })
  it('shows the one-command install as a single chained command that never touches files in the current directory', async () => {
    const user = userEvent.setup()
    render(<Community />)
    const self = card('Memry Community')
    // A fresh mktemp file, so no existing install.sh is overwritten, and && so
    // the installer only runs after a successful download.
    const command =
      'f=$(mktemp) && curl -fsSLo "$f" https://raw.githubusercontent.com/mrtheroi/memry-server/v0.18.1/install.sh && sh "$f" --email you@example.com'

    expect(within(self).getByRole('figure')).toHaveTextContent(command)
    await user.click(within(self).getByRole('button', { name: 'Copy the self-hosting install command' }))
    expect(await navigator.clipboard.readText()).toBe(command)
  })
  it('points Memry Community to the self-hosting guide and the server source, in a safe new tab', () => {
    render(<Community />)
    const self = card('Memry Community')
    const guide = within(self).getByRole('link', { name: 'Read the self-hosting guide' })
    const source = within(self).getByRole('link', { name: 'Server source on GitHub' })

    expect(guide).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-server/blob/main/docs/self-hosting.md')
    expect(source).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-server')
    ;[guide, source].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
  it('stacks the two light cards on phones and sets them side by side from tablet width up', () => {
    render(<Community />)
    const cards = [card('Memry Cloud'), card('Memry Community')]

    expect(cards[0].parentElement).toHaveClass('grid', 'md:grid-cols-2')
    expect(cards[0].parentElement.className).not.toMatch(/(^|\s)grid-cols-2/)
    cards.forEach((c) => expect(c).toHaveAttribute('data-tone', 'light'))
  })
})

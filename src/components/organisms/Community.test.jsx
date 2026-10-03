import { render, screen, within } from '@testing-library/react'
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
  it('describes Memry Cloud as the hosted beta and sends it to the existing get started target', () => {
    render(<Community />)
    const cloud = card('Memry Cloud')

    expect(within(within(cloud).getByRole('list')).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'We run the server for you.',
      'Log in with an email code from memry setup.',
      "Free during the beta. Pricing after it hasn't been decided yet.",
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
      'Your admin creates users and tokens; you connect with memry setup --url. Requires Memry CLI 0.6.0 or newer.',
    ])
    // No published image to promise yet, and no price beyond free.
    expect(self.textContent).not.toMatch(/docker pull|docker\.io|ghcr\.io|[$€£]|\/mo|per month|plan|tier|premium|subscription/i)
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

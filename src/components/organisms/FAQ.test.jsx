import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAQ } from './FAQ'

const items = (container) => [...container.querySelectorAll('details')]
const answerTo = (container, question) =>
  items(container).find((item) => item.querySelector('summary').textContent === question)

describe('FAQ', () => {
  it('asks exactly nine questions, each in a native disclosure', () => {
    const { container } = render(<FAQ />)
    expect(items(container).map((item) => item.querySelector('summary').textContent)).toEqual([
      'Is Memry free?',
      'Which agents does it work with?',
      'Where are my memories stored?',
      'What does Memry store?',
      'Do you use my memories to train AI models?',
      'Does it work offline?',
      'How do I remove it?',
      'Who builds Memry?',
      'How do I report a security issue?',
    ])
  })

  it('says the beta is free and that pricing is undecided, naming no price or plan', () => {
    const { container } = render(<FAQ />)
    const answer = answerTo(container, 'Is Memry free?')
    expect(answer).toHaveTextContent("Yes, during the public beta. Pricing after the beta hasn't been decided yet.")
    expect(answer.textContent).not.toMatch(/[$€£]|\d|\/mo|per month|plan|tier|pro\b|premium|subscription/i)
  })

  it('answers the training question in the privacy policy wording', () => {
    const { container } = render(<FAQ />)
    expect(answerTo(container, 'Do you use my memories to train AI models?')).toHaveTextContent(
      "No. And we don't read them unless you ask us to help or the law requires it.",
    )
  })

  it('says plainly that it does not work offline', () => {
    const { container } = render(<FAQ />)
    expect(answerTo(container, 'Does it work offline?')).toHaveTextContent(
      "No. Your agents need to reach the Memry server to load and save memories. If it can't be reached, the session simply starts without the memory context.",
    )
  })

  it('links the privacy policy safely and the security contact by email', () => {
    const { container } = render(<FAQ />)
    const policy = within(answerTo(container, 'What does Memry store?')).getByRole('link', { name: 'privacy policy' })
    expect(policy).toHaveAttribute('href', 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.md')
    expect(policy).toHaveAttribute('target', '_blank')
    expect(policy).toHaveAttribute('rel', 'noopener noreferrer')

    const email = within(answerTo(container, 'How do I report a security issue?')).getByRole('link', {
      name: 'mrtheroi@gmail.com',
    })
    expect(email).toHaveAttribute('href', 'mailto:mrtheroi@gmail.com')
    expect(email).not.toHaveAttribute('target')
  })

  it('says where memories live without naming a hosting provider', () => {
    const { container } = render(<FAQ />)
    expect(answerTo(container, 'Where are my memories stored?')).toHaveTextContent(
      "On Memry's infrastructure, tied to your account and protected in transit with HTTPS.",
    )
    expect(container.textContent).not.toMatch(/laravel cloud/i)
  })
})

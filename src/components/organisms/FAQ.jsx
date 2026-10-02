import { faq } from '../../content'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { TextLink } from '../atoms/TextLink'

/** Light band of native disclosures: works with the keyboard, screen readers and without JavaScript. */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-8 bg-white py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.75fr] lg:gap-20">
        <SectionHeading id="faq-title" className="max-w-[12ch] lg:sticky lg:top-8 lg:self-start">
          {faq.heading}
        </SectionHeading>
        <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
          {faq.items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-2xl px-5 py-5 text-lg font-semibold text-[var(--memry-dark)] sm:px-6">
                <span>{item.question}</span>
                <Chevron />
              </summary>
              <p className="max-w-[62ch] px-5 pb-6 leading-relaxed text-[var(--text-primary)] sm:px-6">
                <Answer item={item} />
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Answer({ item }) {
  if (!item.link) return <CodeText>{item.answer}</CodeText>
  const [before, after] = item.answer.split(item.link.label)
  return (
    <>
      <CodeText>{before}</CodeText>
      <TextLink href={item.link.href}>{item.link.label}</TextLink>
      <CodeText>{after}</CodeText>
    </>
  )
}

function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="faq-chevron grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border)] text-[var(--memry-teal)]"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  )
}

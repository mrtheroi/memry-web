import { why } from '../../content'
import { CodeChip } from '../atoms/CodeChip'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'

export function WhyMemry() {
  return (
    <section aria-labelledby="why-title" className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container>
        <SectionHeading id="why-title">{why.heading}</SectionHeading>
        <ul className="mt-12 grid border-t border-[var(--border)] sm:grid-cols-2">
          {why.items.map((item, i) => (
            <li
              key={item.title}
              className={`border-b border-[var(--border)] py-8 sm:px-8 ${
                i % 2 === 0 ? 'sm:border-r sm:pl-0' : 'sm:pr-0'
              }`}
            >
              <h3 className="text-xl font-semibold tracking-[-0.015em] text-[var(--memry-dark)]">{item.title}</h3>
              <p className="mt-2 max-w-[44ch] leading-relaxed text-[var(--text-primary)]">{item.body}</p>
              {item.code && (
                <p className="mt-4">
                  <CodeChip>{item.code}</CodeChip>
                </p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

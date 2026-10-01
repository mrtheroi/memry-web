import { useCases } from '../../content'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'

export function UseCases() {
  return (
    <section aria-labelledby="use-cases-title" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-20">
        <SectionHeading id="use-cases-title" className="max-w-[14ch]">
          {useCases.heading}
        </SectionHeading>
        <ul className="grid border-t border-[var(--border)] sm:grid-cols-2">
          {useCases.items.map((item, i) => (
            <li
              key={item.title}
              className={`border-b border-[var(--border)] py-8 sm:px-8 ${i % 2 === 0 ? 'sm:border-r sm:pl-0' : 'sm:pr-0'}`}
            >
              <h3 className="text-xl font-semibold tracking-[-0.015em] text-[var(--memry-dark)]">{item.title}</h3>
              <p className="mt-2 max-w-[40ch] leading-relaxed text-[var(--text-primary)]">
                <CodeText>{item.body}</CodeText>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

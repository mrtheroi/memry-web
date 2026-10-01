import { outcomes } from '../../content'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'

export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="border-t border-[var(--border)] bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading id="outcomes-title">{outcomes.heading}</SectionHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {outcomes.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 sm:p-8"
            >
              <span aria-hidden="true" className="mb-8 block h-1 w-10 rounded-full bg-[var(--memry-teal)]" />
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-[var(--memry-dark)]">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--text-primary)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

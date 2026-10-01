import { outcomes } from '../../content'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { AgentsVisual, RestoredVisual, TokensVisual } from '../molecules/OutcomeVisuals'

const visuals = [RestoredVisual, AgentsVisual, TokensVisual]

export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="border-t border-[var(--border)] bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading id="outcomes-title">{outcomes.heading}</SectionHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {outcomes.items.map((item, i) => {
            const Visual = visuals[i]
            return (
              <li
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition-[translate,border-color,box-shadow] duration-200 ease-out hover:border-[#9fd0d3] hover:shadow-[0_16px_32px_-22px_rgba(7,59,70,0.45)] focus-within:border-[#9fd0d3] focus-within:shadow-[0_16px_32px_-22px_rgba(7,59,70,0.45)] motion-safe:hover:-translate-y-[3px] motion-safe:focus-within:-translate-y-[3px] sm:p-7"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[var(--memry-teal)]" />
                <span
                  data-index
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 bottom-3 text-[4.5rem] leading-none font-extrabold tracking-[-0.05em] text-[var(--memry-teal)] opacity-[0.1] select-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  data-illustration
                  aria-hidden="true"
                  className="relative h-32 rounded-xl border border-[var(--border)] bg-white px-4 py-3"
                >
                  <Visual />
                </div>
                <h3 className="mt-7 text-2xl font-bold leading-tight tracking-[-0.025em] text-[var(--memry-dark)]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--text-primary)]">{item.body}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

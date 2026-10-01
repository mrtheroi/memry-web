import { agents, trust } from '../../content'
import { AcornIcon } from '../atoms/Acorn'
import { Container } from '../atoms/Container'

/** Compact proof band under the hero: who memry works with, and three plain facts. */
export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="border-b border-[var(--border)] bg-white">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <p id="trust-title" className="shrink-0 text-sm font-medium text-[var(--text-muted)]">
            {trust.worksWith}
          </p>
          <ul aria-labelledby="trust-title" className="flex flex-wrap gap-2.5">
            {agents.list.map((name) => (
              <li
                key={name}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-1.5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--memry-dark)]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <ul
          aria-label={trust.factsLabel}
          className="mt-7 flex flex-col gap-3 border-t border-[var(--border)] pt-7 sm:flex-row sm:flex-wrap sm:gap-x-10"
        >
          {trust.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2.5 text-[15px] font-medium text-[var(--text-primary)]">
              <AcornIcon className="h-4 w-3.5 shrink-0" />
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

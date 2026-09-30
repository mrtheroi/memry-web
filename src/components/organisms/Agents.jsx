import { agents } from '../../content'
import { AcornIcon } from '../atoms/Acorn'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'

export function Agents() {
  return (
    <section aria-labelledby="agents-title" className="border-t border-[var(--border)] bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading id="agents-title">{agents.heading}</SectionHeading>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--text-primary)]">{agents.body}</p>
        <AgentDiagram />
      </Container>
    </section>
  )
}

/** Five agents converge on memry, which keeps one project memory. Stacks vertically on small screens. */
function AgentDiagram() {
  return (
    <figure className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-10">
      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center">
        <div className="relative w-full lg:w-auto">
          <ul
            aria-label={agents.listLabel}
            className="flex flex-wrap justify-center gap-2 lg:flex-col lg:items-stretch lg:gap-3"
          >
            {agents.list.map((name) => (
              <li key={name} className="flex items-center">
                <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--memry-dark)] lg:min-w-[9.5rem] lg:text-center">
                  {name}
                </span>
                <span aria-hidden="true" className="hidden h-px w-8 bg-[var(--memry-turquoise)] lg:block" />
              </li>
            ))}
          </ul>
          {/* Joins the five ticks into one bracket, from the first chip's centre to the last. */}
          <span
            aria-hidden="true"
            className="absolute top-[1.125rem] right-0 bottom-[1.125rem] hidden w-px bg-[var(--memry-turquoise)] lg:block"
          />
        </div>

        <Connector />

        <span className="rounded-xl border border-[var(--memry-teal)] bg-[var(--memry-dark)] px-6 py-4 text-base font-semibold text-white">
          {agents.hub}
        </span>

        <Connector />

        <span className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--memry-dark)]">
          <AcornIcon className="h-6 w-5 shrink-0" />
          {agents.memory}
        </span>
      </div>
      <figcaption className="mt-8 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--text-muted)]">
        {agents.diagramNote}
      </figcaption>
    </figure>
  )
}

/** Vertical on small screens, horizontal once the diagram lays out in a row. */
function Connector() {
  return (
    <span
      aria-hidden="true"
      className="block h-8 w-px shrink-0 bg-[var(--memry-turquoise)] lg:h-px lg:w-auto lg:min-w-8 lg:max-w-48 lg:flex-1"
    />
  )
}

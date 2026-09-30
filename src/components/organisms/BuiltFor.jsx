import { builtFor, links } from '../../content'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { TextLink } from '../atoms/TextLink'

export function BuiltFor() {
  return (
    <section aria-labelledby="built-for-title" className="border-t border-[var(--border)] bg-white py-20 sm:py-24">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <SectionHeading id="built-for-title">{builtFor.heading}</SectionHeading>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-[var(--text-primary)]">{builtFor.body}</p>
          <p className="mt-5">
            <TextLink href={links.claudeCode}>{builtFor.linkLabel}</TextLink>
          </p>
        </div>
        <ConnectionDiagram />
      </Container>
    </section>
  )
}

/** How memry attaches to Claude Code: two connections, one project memory. */
function ConnectionDiagram() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8" aria-hidden="true">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:gap-5">
        <Node label="Claude Code" />
        <div className="flex flex-1 flex-col justify-center gap-3 py-1 font-mono text-[11px] text-[var(--text-muted)] sm:text-xs">
          <Link label={builtFor.connections[0]} />
          <Link label={builtFor.connections[1]} />
        </div>
        <Node label="memry" accent />
      </div>
      <p className="mt-6 border-t border-[var(--border)] pt-4 text-sm text-[var(--text-muted)]">
        {builtFor.diagramNote}
      </p>
    </div>
  )
}

function Node({ label, accent = false }) {
  return (
    <span
      className={`flex items-center justify-center rounded-xl border px-3 py-4 sm:min-w-[8rem] sm:py-5 text-center text-sm font-semibold ${
        accent
          ? 'border-[var(--memry-teal)] bg-[var(--memry-dark)] text-white'
          : 'border-[var(--border)] bg-white text-[var(--memry-dark)]'
      }`}
    >
      {label}
    </span>
  )
}

function Link({ label }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-px flex-1 bg-[var(--memry-turquoise)]" />
      <span className="whitespace-nowrap">{label}</span>
      <span className="h-px flex-1 bg-[var(--memry-turquoise)]" />
    </span>
  )
}

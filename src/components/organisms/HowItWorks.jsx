import { howItWorks } from '../../content'
import { CodeChip } from '../atoms/CodeChip'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { MemoryTree } from '../molecules/MemoryTree'

export function HowItWorks() {
  const { projects } = howItWorks
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-8 border-t border-[var(--border)] bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-24">
          <div>
            <SectionHeading id="how-title">{howItWorks.heading}</SectionHeading>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-[var(--text-muted)]">{howItWorks.lead}</p>

            <ol aria-label={howItWorks.stepsLabel} className="mt-14 space-y-10">
              {howItWorks.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--memry-teal)] font-mono text-sm text-[var(--memry-teal)]"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.015em] text-[var(--memry-dark)]">{step.title}</h3>
                    {step.body && (
                      <p className="mt-2 max-w-[58ch] leading-relaxed text-[var(--text-primary)]">
                        <CodeText>{step.body}</CodeText>
                      </p>
                    )}
                    {step.code && (
                      <p className="mt-3">
                        <CodeChip>{step.code}</CodeChip>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="self-start lg:sticky lg:top-12">
            <MemoryTree className="mx-auto w-full max-w-[360px]" />
            <figcaption className="mx-auto mt-4 max-w-[34ch] text-center text-sm leading-relaxed text-[var(--text-muted)]">
              {howItWorks.treeCaption}
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 grid gap-8 rounded-2xl bg-[var(--background-warm)] p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.015em] text-[var(--memry-dark)]">{projects.heading}</h3>
            <p className="mt-2 max-w-[60ch] leading-relaxed text-[var(--text-primary)]">{projects.body}</p>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--terminal-bg)] md:min-w-[280px]">
            <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-xs text-[var(--hero-ink-muted)]">
              {projects.filename}
            </figcaption>
            <pre className="px-4 py-4 font-mono text-sm text-[var(--hero-ink)]">
              <code>{projects.code}</code>
            </pre>
          </figure>
        </div>
      </Container>
    </section>
  )
}

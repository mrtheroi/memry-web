import { getStarted, project } from '../../content'
import { ButtonLink } from '../atoms/ButtonLink'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { TextLink } from '../atoms/TextLink'
import { CopyButton } from '../molecules/CopyButton'
import { Terminal } from '../molecules/Terminal'

export function GetStarted() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-title"
      className="scroll-mt-8 border-t border-[var(--border)] bg-[var(--background)] py-24 sm:py-32"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading id="get-started-title">{getStarted.heading}</SectionHeading>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-[var(--text-primary)]">{getStarted.lead}</p>
          <p className="mt-6 max-w-[44ch] leading-relaxed text-[var(--text-muted)]">
            {getStarted.requirements}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-warm)] px-3.5 py-1.5 text-sm font-medium text-[var(--memry-dark)]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--memry-orange)]" />
            {getStarted.beta}
          </p>
        </div>
        <div className="min-w-0">
          <Terminal
            commands={getStarted.commands}
            output={getStarted.output}
            action={
              <CopyButton
                text={getStarted.commands.join('\n')}
                label={getStarted.copyLabel}
                copiedLabel={getStarted.copiedLabel}
              />
            }
          />
          <div role="group" aria-label={getStarted.nextLabel} className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={getStarted.docsCta.href}>{getStarted.docsCta.label}</ButtonLink>
            <ButtonLink href={getStarted.githubCta.href} variant="secondary">
              {getStarted.githubCta.label}
            </ButtonLink>
          </div>
          <ul
            aria-label={project.label}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          >
            <li className="text-[var(--text-primary)]">{project.release}</li>
            {project.links.map((link) => (
              <li key={link.label}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

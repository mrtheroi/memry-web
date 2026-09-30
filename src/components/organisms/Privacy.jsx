import { links, privacy } from '../../content'
import { AcornIcon } from '../atoms/Acorn'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { TextLink } from '../atoms/TextLink'

export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="scroll-mt-8 py-24 sm:py-32">
      <Container>
        <div className="rounded-3xl bg-[var(--background-warm)] px-6 py-12 sm:px-12 sm:py-16">
          <SectionHeading id="privacy-title">{privacy.heading}</SectionHeading>
          <ul className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {privacy.commitments.map((text) => (
              <li key={text} className="flex gap-3 text-lg leading-relaxed text-[var(--text-primary)]">
                <AcornIcon className="mt-1.5 h-5 w-4 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[var(--text-muted)]">{privacy.note}</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <TextLink href={links.privacy}>{privacy.policyLabel}</TextLink>
            <span lang="es">
              <TextLink href={links.privacyEs}>{privacy.policyEsLabel}</TextLink>
            </span>
          </p>
        </div>
      </Container>
    </section>
  )
}

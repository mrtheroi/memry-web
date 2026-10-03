import { community } from '../../content'
import { ButtonLink } from '../atoms/ButtonLink'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { GlassCard } from '../molecules/GlassCard'

/** Light band after Security: the hosted edition next to the free, self-hosted one. */
export function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="scroll-mt-8 bg-[var(--background)] py-24 sm:py-32">
      <Container>
        <SectionHeading id="community-title" className="max-w-[18ch]">
          {community.heading}
        </SectionHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {community.editions.map((edition) => (
            <GlassCard key={edition.title} tone="light">
              <h3 className="text-xl font-semibold tracking-[-0.015em] text-[var(--memry-dark)]">{edition.title}</h3>
              <ul className="mt-4 space-y-3 leading-relaxed text-[var(--text-primary)]">
                {edition.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--memry-teal)]" />
                    <span className="min-w-0">
                      <CodeText>{point}</CodeText>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <ButtonLink href={edition.cta.href}>{edition.cta.label}</ButtonLink>
                {edition.secondaryCta && (
                  <ButtonLink href={edition.secondaryCta.href} variant="secondary">
                    {edition.secondaryCta.label}
                  </ButtonLink>
                )}
              </div>
            </GlassCard>
          ))}
        </ul>
      </Container>
    </section>
  )
}

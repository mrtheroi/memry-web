import { community } from '../../content'
import { ButtonLink } from '../atoms/ButtonLink'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { CopyButton } from '../molecules/CopyButton'
import { CloudVisual, CommunityVisual } from '../molecules/EditionVisuals'
import { GlassCard } from '../molecules/GlassCard'
import { Terminal } from '../molecules/Terminal'

const visuals = [CloudVisual, CommunityVisual]

/** Light band after Security: the hosted edition next to the free, self-hosted one, each with a picture of how it runs. */
export function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="scroll-mt-8 bg-[var(--background)] py-24 sm:py-32">
      <Container>
        <SectionHeading id="community-title" className="max-w-[18ch]">
          {community.heading}
        </SectionHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {community.editions.map((edition, i) => {
            const Visual = visuals[i]
            return (
              <GlassCard key={edition.title} tone="light" illustration={<Visual />} bleed title={edition.title}>
                <p className="mt-1.5 font-semibold text-[var(--memry-teal)]">{edition.tagline}</p>
                <ul className="mt-5 space-y-3 leading-relaxed text-[var(--text-primary)]">
                  {edition.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckIcon />
                      <span className="min-w-0">
                        <CodeText>{point}</CodeText>
                      </span>
                    </li>
                  ))}
                </ul>
                {edition.install && (
                  <div className="mt-6 min-w-0">
                    <Terminal
                      commands={edition.install.commands}
                      action={
                        <CopyButton
                          text={edition.install.commands.join('\n')}
                          label={edition.install.copyLabel}
                          copiedLabel={edition.install.copiedLabel}
                        />
                      }
                    />
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                      <CodeText>{edition.install.note}</CodeText>
                    </p>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <ButtonLink href={edition.cta.href}>{edition.cta.label}</ButtonLink>
                  {edition.secondaryCta && (
                    <ButtonLink href={edition.secondaryCta.href} variant="secondary">
                      {edition.secondaryCta.label}
                    </ButtonLink>
                  )}
                </div>
              </GlassCard>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/** A teal check in a pale turquoise disc, aligned with the first line of a point. */
function CheckIcon() {
  return (
    <svg
      data-icon="check"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 20"
      className="mt-[0.2em] size-5 shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="var(--memry-turquoise)" fillOpacity="0.14" />
      <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="var(--memry-teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

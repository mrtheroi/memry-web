import { closing } from '../../content'
import { ButtonLink } from '../atoms/ButtonLink'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'

/** Short dark band before the footer that echoes the hero's light ribbons, and points onwards to the docs. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="hero-bg closing-glow relative overflow-hidden py-20 sm:py-28">
      <Container className="relative">
        <SectionHeading id="closing-title" dark size="large" className="max-w-[14ch]">
          {closing.heading}
        </SectionHeading>
        <p className="mt-5 max-w-[40ch] text-xl leading-relaxed text-[var(--hero-ink)]">{closing.line}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={closing.docsCta.href} variant="onDark">
            {closing.docsCta.label}
          </ButtonLink>
          <ButtonLink href={closing.githubCta.href} variant="ghostOnDark">
            {closing.githubCta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

import { closing } from '../../content'
import { ButtonLink } from '../atoms/ButtonLink'
import { Container } from '../atoms/Container'

/** Short dark band before the footer that echoes the hero's light ribbons, and points onwards to the docs. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="hero-bg closing-glow relative overflow-hidden py-20 sm:py-28">
      <Container className="relative">
        <h2
          id="closing-title"
          className="max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-white"
        >
          {closing.heading}
        </h2>
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

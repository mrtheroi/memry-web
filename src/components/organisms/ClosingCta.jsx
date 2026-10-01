import { closing } from '../../content'
import { ButtonLink } from '../atoms/ButtonLink'
import { Container } from '../atoms/Container'

/** Dark band before the footer that echoes the hero's light ribbons. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="hero-bg closing-glow relative overflow-hidden py-28 sm:py-36">
      <Container className="relative">
        <h2
          id="closing-title"
          className="max-w-[14ch] text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-white"
        >
          {closing.heading}
        </h2>
        <p className="mt-6 max-w-[40ch] text-xl leading-relaxed text-[var(--hero-ink)]">{closing.line}</p>
        <ButtonLink href={closing.cta.href} variant="onDark" className="mt-10">
          {closing.cta.label}
        </ButtonLink>
      </Container>
    </section>
  )
}

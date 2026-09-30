import { intro } from '../../content'
import { Container } from '../atoms/Container'

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-24 sm:py-32">
      <Container className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-16">
        <h2
          id="intro-title"
          className="text-[clamp(2.75rem,6.5vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[var(--memry-dark)]"
        >
          {intro.heading}
        </h2>
        <div className="max-w-[46ch] md:pb-2">
          <p className="text-xl leading-relaxed text-[var(--text-primary)]">{intro.body}</p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">{intro.benefit}</p>
        </div>
      </Container>
    </section>
  )
}

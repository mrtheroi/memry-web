import { problem } from '../../content'
import { Container } from '../atoms/Container'

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="py-28 sm:py-40">
      <Container>
        <h2
          id="problem-title"
          className="max-w-[13ch] text-[clamp(3rem,7.5vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[var(--memry-dark)]"
        >
          {problem.heading}
        </h2>
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_1fr] md:gap-16">
          <p className="max-w-[46ch] text-xl leading-relaxed text-[var(--text-primary)] md:col-start-2">
            {problem.body}
          </p>
          <p className="max-w-[22ch] text-balance text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--memry-teal)] md:col-start-2">
            {problem.closing}
          </p>
        </div>
      </Container>
    </section>
  )
}

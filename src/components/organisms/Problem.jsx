import { problem } from '../../content'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { SessionStack } from '../molecules/SessionStack'

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading id="problem-title" className="max-w-[18ch]">
              {problem.heading}
            </SectionHeading>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--text-primary)]">{problem.body}</p>
            <p className="mt-8 text-2xl font-bold leading-snug tracking-[-0.02em] text-[var(--memry-teal)]">
              {problem.closing}
            </p>
          </div>
          <SessionStack className="mx-auto w-full max-w-md lg:max-w-[30rem]" />
        </div>
      </Container>
    </section>
  )
}

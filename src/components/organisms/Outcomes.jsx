import { outcomes } from '../../content'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { GlassCard } from '../molecules/GlassCard'
import { AgentsVisual, RestoredVisual, TokensVisual } from '../molecules/OutcomeVisuals'

const visuals = [RestoredVisual, AgentsVisual, TokensVisual]

/** Light section, same card structure as Security in its light tone: what changes once memry keeps the context. */
export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="border-t border-[var(--border)] bg-[var(--background)] py-24 sm:py-32">
      <Container>
        <SectionHeading id="outcomes-title">
          {outcomes.heading}
        </SectionHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-2 md:max-lg:[&>li:last-child]:col-span-2 lg:grid-cols-3">
          {outcomes.items.map((item, i) => {
            const Visual = visuals[i]
            return <GlassCard key={item.title} tone="light" illustration={<Visual />} title={item.title} body={item.body} />
          })}
        </ul>
      </Container>
    </section>
  )
}

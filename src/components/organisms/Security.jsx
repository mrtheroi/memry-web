import { links, security } from '../../content'
import { linkProps } from '../../lib/linkProps'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { GlassCard } from '../molecules/GlassCard'
import { CodesVisual, LeaveVisual, MemoriesVisual, OpenVisual, PolicyVisual, TokenVisual } from '../molecules/SecurityVisuals'

const darkLink =
  'focus-ring-dark rounded-lg font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-[var(--memry-turquoise)]'

const visuals = [TokenVisual, CodesVisual, MemoriesVisual, LeaveVisual, OpenVisual]

/** Deep navy band: the commitments that make memry safe to use on real work. */
export function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="security-bg scroll-mt-8 py-16 text-white sm:py-24"
    >
      <Container>
        <SectionHeading id="security-title" dark className="max-w-[16ch]">
          {security.heading}
        </SectionHeading>
        <ul className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {security.items.map((item, i) => {
            const Visual = visuals[i]
            return (
              <GlassCard
                key={item.title}
                tone="dark"
                illustration={<Visual />}
                title={item.title}
                body={<CodeText chipClassName="border-white/15 bg-white/10 text-white">{item.body}</CodeText>}
              />
            )
          })}
          <GlassCard tone="dark" illustration={<PolicyVisual />}>
            <a {...linkProps(links.privacy)} className={`${darkLink} mt-4 self-start text-xl sm:mt-6`}>
              {security.policyLabel}
            </a>
            <span lang="es" className="mt-2 self-start">
              <a {...linkProps(links.privacyEs)} className={darkLink}>
                {security.policyEsLabel}
              </a>
            </span>
          </GlassCard>
        </ul>
      </Container>
    </section>
  )
}

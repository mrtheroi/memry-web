import { links, security } from '../../content'
import { linkProps } from '../../lib/linkProps'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { GlassCard } from '../molecules/GlassCard'
import { CodesVisual, LeaveVisual, MemoriesVisual, OpenVisual, TokenVisual } from '../molecules/SecurityVisuals'

const darkLink =
  'focus-ring-dark rounded-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-[var(--memry-turquoise)]'

const visuals = [TokenVisual, CodesVisual, MemoriesVisual, LeaveVisual, OpenVisual]

/** Deep navy band: the commitments that make memry safe to use on real work. */
export function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="security-bg scroll-mt-8 py-20 text-white sm:py-24"
    >
      <Container>
        <h2
          id="security-title"
          className="max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.04em]"
        >
          {security.heading}
        </h2>
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
          <GlassCard tone="dark" className="justify-end gap-3">
            <a {...linkProps(links.privacy)} className={`${darkLink} self-start text-lg`}>
              {security.policyLabel}
            </a>
            <span lang="es" className="self-start">
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

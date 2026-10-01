import { links, security } from '../../content'
import { linkProps } from '../../lib/linkProps'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'
import { CodesVisual, LeaveVisual, MemoriesVisual, OpenVisual, TokenVisual } from '../molecules/SecurityVisuals'

const darkLink =
  'focus-ring-dark rounded-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-[var(--memry-turquoise)]'

const visuals = [TokenVisual, CodesVisual, MemoriesVisual, LeaveVisual, OpenVisual]

const card =
  'flex flex-col rounded-2xl border border-[rgba(6,182,212,0.18)] bg-white/[0.035] p-6 transition-[translate,border-color,box-shadow] duration-200 ease-out hover:border-[rgba(6,182,212,0.5)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_18px_40px_-24px_rgba(6,182,212,0.45)] focus-within:border-[rgba(6,182,212,0.5)] focus-within:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_18px_40px_-24px_rgba(6,182,212,0.45)] motion-safe:hover:-translate-y-[3px] motion-safe:focus-within:-translate-y-[3px] sm:p-7'

/** Deep navy band: the commitments that make memry safe to use on real work. */
export function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="security-bg scroll-mt-8 py-24 text-white sm:py-32"
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
              <li key={item.title} className={card}>
                <div
                  data-illustration
                  aria-hidden="true"
                  className="flex min-h-28 flex-col justify-center rounded-xl border border-white/10 bg-[rgba(2,24,32,0.55)] px-4 py-3"
                >
                  <Visual />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--hero-ink)]">
                  <CodeText chipClassName="border-white/15 bg-white/10 text-white">{item.body}</CodeText>
                </p>
              </li>
            )
          })}
          <li className={`${card} justify-end gap-3`}>
            <a {...linkProps(links.privacy)} className={`${darkLink} self-start text-lg`}>
              {security.policyLabel}
            </a>
            <span lang="es" className="self-start">
              <a {...linkProps(links.privacyEs)} className={darkLink}>
                {security.policyEsLabel}
              </a>
            </span>
          </li>
        </ul>
      </Container>
    </section>
  )
}

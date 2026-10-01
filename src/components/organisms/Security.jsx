import { links, security } from '../../content'
import { linkProps } from '../../lib/linkProps'
import { CodeText } from '../atoms/CodeText'
import { Container } from '../atoms/Container'

const darkLink =
  'focus-ring-dark rounded-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-[var(--memry-turquoise)]'

/** Dark teal band: the commitments that make memry safe to use on real work. */
export function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="scroll-mt-8 bg-[var(--memry-dark)] py-24 text-white sm:py-32"
    >
      <Container>
        <h2
          id="security-title"
          className="max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.04em]"
        >
          {security.heading}
        </h2>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-3">
          {security.items.map((item) => (
            <li key={item.title} className="bg-[var(--memry-dark)] p-7 sm:p-8">
              <span aria-hidden="true" className="mb-6 block h-1 w-8 rounded-full bg-[var(--memry-turquoise)]" />
              <h3 className="text-xl font-semibold tracking-[-0.015em]">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--hero-ink)]">
                <CodeText chipClassName="border-white/15 bg-white/10 text-white">{item.body}</CodeText>
              </p>
            </li>
          ))}
          <li className="flex flex-col justify-end gap-3 bg-[#06333d] p-7 sm:p-8">
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

import { motion } from 'motion/react'
import { hero } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ButtonLink } from '../atoms/ButtonLink'
import { Wordmark } from '../atoms/Wordmark'

// Text-free art: squirrel and acorn on the left, ribbons to the upper right,
// empty dark space in the lower right where the heading sits on desktop.
const art = {
  desktop: '/hero/memry-hero-desktop.webp',
  desktopSmall: '/hero/memry-hero-desktop-960.webp',
  mobile: '/hero/memry-hero-mobile.webp',
  width: 1672,
  height: 941,
}

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const reveal = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section aria-labelledby="hero-title" className="hero-bg relative overflow-hidden">
      <div className="relative mx-auto max-w-[1672px]">
        <div className="relative z-10 px-4 pt-28 sm:px-8 md:absolute md:left-[55.5%] md:top-[52%] md:p-0 md:pr-6">
          <motion.h1 id="hero-title" {...reveal(0.15)} className="text-white">
            <Wordmark className="block text-[clamp(3.75rem,8.2vw,8.5rem)] leading-[0.9]" />
            <span className="sr-only"> — </span>
            <span className="mt-4 block max-w-[17ch] text-[clamp(1.375rem,2.3vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-[var(--hero-ink)]">
              {hero.taglineLead}{' '}
              <span className="text-[var(--memry-turquoise)]">{hero.taglineAccent}</span>
            </span>
          </motion.h1>
          <motion.p
            {...reveal(0.25)}
            className="mt-4 max-w-[44ch] text-[clamp(1rem,1.25vw,1.25rem)] leading-snug text-[var(--hero-ink-muted)]"
          >
            {hero.hook}
          </motion.p>
          <motion.div {...reveal(0.35)} className="mt-7 flex flex-wrap gap-3 lg:mt-9">
            <ButtonLink href={hero.primaryCta.href} variant="onDark">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghostOnDark">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>
        <picture>
          <source media="(max-width: 767px)" srcSet={art.mobile} width="1122" height="1402" />
          <img
            src={art.desktop}
            srcSet={`${art.desktopSmall} 960w, ${art.desktop} 1672w`}
            sizes="100vw"
            width={art.width}
            height={art.height}
            alt={hero.imageAlt}
            fetchPriority="high"
            className="hero-art -mt-6 block w-full md:mt-0"
          />
        </picture>
      </div>
    </section>
  )
}

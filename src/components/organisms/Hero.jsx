import { motion } from 'motion/react'
import { hero } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ButtonLink } from '../atoms/ButtonLink'
import { Wordmark } from '../atoms/Wordmark'

// Text-free art: squirrel and acorn on the left, ribbons to the upper right,
// empty dark space in the lower right where the heading sits on desktop.
// From xl the heading sits over the art; below xl the art is stacked under it, full width.
const art = {
  desktop: '/hero/memry-hero-desktop.webp',
  desktopSrcSet: '/hero/memry-hero-desktop-960.webp 960w, /hero/memry-hero-desktop-1280.webp 1280w, /hero/memry-hero-desktop.webp 1672w',
  desktopSizes: '(min-width: 1672px) 1672px, 100vw',
  mobileSrcSet: '/hero/memry-hero-mobile-600.webp 600w, /hero/memry-hero-mobile-800.webp 800w, /hero/memry-hero-mobile.webp 1122w',
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
        <div className="relative z-10 px-4 pt-28 sm:px-8 xl:absolute xl:left-[55.5%] xl:bottom-[7%] xl:p-0 xl:pr-6">
          <motion.p
            {...reveal(0.05)}
            className="mb-3 text-[clamp(0.95rem,1.15vw,1.125rem)] font-medium tracking-[-0.005em] text-[var(--memry-turquoise)]"
          >
            {hero.slogan}
          </motion.p>
          <motion.h1 id="hero-title" {...reveal(0.15)} className="text-white">
            <Wordmark className="block text-[clamp(3.75rem,8.2vw,8.5rem)] leading-[0.9]" />
            <span className="sr-only"> — </span>
            <span className="mt-4 block max-w-[17ch] text-[clamp(1.5rem,2.3vw,2rem)] font-medium leading-[1.2] tracking-[-0.015em] text-[var(--hero-ink)]">
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
          <motion.div {...reveal(0.35)} className="mt-7 pb-8 xl:mt-9 xl:pb-0">
            <div className="flex flex-col gap-3 min-[360px]:flex-row">
              <ButtonLink href={hero.primaryCta.href} variant="onDark">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghostOnDark">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="mt-3 text-sm text-[var(--hero-ink-muted)]">{hero.freeNote}</p>
          </motion.div>
        </div>
        <picture>
          <source media="(max-width: 767px)" srcSet={art.mobileSrcSet} sizes="100vw" width="1122" height="1402" />
          <img
            src={art.desktop}
            srcSet={art.desktopSrcSet}
            sizes={art.desktopSizes}
            width={art.width}
            height={art.height}
            alt={hero.imageAlt}
            fetchPriority="high"
            className="hero-art -mt-6 block w-full xl:mt-0"
          />
        </picture>
      </div>
    </section>
  )
}

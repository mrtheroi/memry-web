import { motion } from 'motion/react'
import { problem } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornIcon } from '../atoms/Acorn'

const { description, sessions, memry } = problem.illustration

/*
 * Three sessions that each start from zero (the same context explained again,
 * fading and drifting as it is forgotten), then one memry session that opens
 * with the context already loaded.
 */
const sessionLook = [
  { fade: 0.78, offset: 'translate-x-0 -rotate-[1.5deg]' },
  { fade: 0.58, offset: 'translate-x-3 rotate-[1deg] sm:translate-x-5' },
  { fade: 0.4, offset: 'translate-x-6 -rotate-[0.75deg] sm:translate-x-10' },
]
const ease = [0.22, 1, 0.36, 1]
const settle = (i) => ({
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 + i * 0.35, ease } },
})
const dim = (i, fade) => ({
  hidden: { opacity: 1 },
  shown: { opacity: fade, transition: { duration: 0.9, delay: 0.55 + i * 0.35, ease: 'easeOut' } },
})
const rise = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.45, ease } },
}

const skeleton = [['w-11/12', 'w-2/3'], ['w-10/12', 'w-1/2'], ['w-3/4', 'w-7/12']]

export function SessionStack({ className = '' }) {
  const reduced = usePrefersReducedMotion()
  const animate = (variants) => (reduced ? {} : { variants })
  const stage = reduced ? {} : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.35 } }

  return (
    <figure className={`m-0 ${className}`}>
      <figcaption className="sr-only">{description}</figcaption>
      <motion.div aria-hidden="true" className="flex flex-col" {...stage}>
        {sessions.map((session, i) => (
          <motion.div
            key={session.day}
            {...animate(settle(i))}
            data-card="session"
            className={`relative mr-6 rounded-2xl border border-[var(--border)] bg-white px-5 pt-4 pb-10 sm:mr-10 ${sessionLook[i].offset} ${
              i > 0 ? '-mt-7' : ''
            }`}
          >
            <motion.div {...(reduced ? { style: { opacity: sessionLook[i].fade } } : { variants: dim(i, sessionLook[i].fade) })}>
              <span data-day className="text-xs font-semibold text-[var(--text-muted)]">
                {session.day}
              </span>
              <p className="mt-2 font-mono text-[13px] text-[var(--text-primary)]">
                <span className="mr-2 text-[var(--memry-teal)]">&gt;</span>
                {session.prompt}
              </p>
              <div className="mt-3 space-y-2 pl-5">
                {skeleton[i].map((width) => (
                  <span key={width} className={`block h-1.5 rounded-full bg-[var(--border)] ${width}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          data-card="memry"
          {...animate(rise)}
          className="relative -mt-5 rounded-2xl border border-[var(--memry-teal)] bg-white px-5 py-5 shadow-[0_18px_40px_-24px_rgba(7,59,70,0.45)] sm:mx-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span className="flex items-center gap-2 text-lg font-extrabold tracking-[-0.03em] text-[var(--memry-dark)]">
              <AcornIcon className="h-6 w-5" />
              {memry.name}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f4f5] px-3 py-1 text-xs font-semibold text-[var(--memry-teal)]">
              {memry.status}
              <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${reduced ? '' : 'check-shimmer'}`} focusable="false">
                <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <ul className="mt-4 space-y-2 font-mono text-[12.5px] leading-snug text-[var(--text-primary)]">
            {memry.lines.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--memry-turquoise)]" />
                <span className="min-w-0 break-words">{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </figure>
  )
}

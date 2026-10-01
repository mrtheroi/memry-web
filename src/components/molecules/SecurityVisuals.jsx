import { motion } from 'motion/react'
import { security } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornShape } from '../atoms/Acorn'

/* Small decorative illustrations for the Security cards (dark band). Hidden from assistive tech. */

const { token, codes, memories, leave, open } = security.visuals
const ease = [0.22, 1, 0.36, 1]
const inView = { viewport: { once: true, amount: 0.6 } }
/** Entrance props, or none under reduced motion (the final state shows as is). */
const enter = (reduced, from, to, transition) =>
  reduced ? {} : { initial: from, whileInView: to, ...inView, transition: { ease, ...transition } }
const mono = 'font-mono text-[11.5px] leading-relaxed'

/** "Your token stays with you": the agent config has no token; it lives in its own file. */
export function TokenVisual() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
      <div className={`${mono} min-w-0 text-[var(--hero-ink)]`}>
        {token.config.map((line) => {
          const [key, value] = line.split(' = ')
          return (
            <div key={line} className="whitespace-nowrap">
              <span className="text-[var(--memry-turquoise)]">{key}</span> = {value}
            </div>
          )
        })}
      </div>
      <span className="inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.05] px-2.5 py-1.5 text-xs text-[var(--hero-ink)]">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[var(--memry-turquoise)]" focusable="false">
          <circle cx="5.5" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8h6M12.5 8v2.5M14.5 8v2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="font-semibold text-white">{token.chip}</span>
        <span className="truncate font-mono text-[11px] text-[var(--hero-ink-muted)]">{token.path}</span>
      </span>
    </div>
  )
}

/** "No passwords": a six-box one-time code that expires. */
export function CodesVisual() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            data-code-box
            className="flex h-8 w-7 items-center justify-center rounded-md border border-white/15 bg-white/[0.04]"
          >
            <motion.span
              data-code-dot
              {...enter(reduced, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }, { duration: 0.3, delay: 0.3 + i * 0.18 })}
              className="h-1.5 w-1.5 rounded-full bg-white"
            />
          </span>
        ))}
      </div>
      <span className="text-xs text-[var(--hero-ink-muted)]">{codes.expires}</span>
    </div>
  )
}

/** "Your memories are yours": one memory, shielded. */
export function MemoriesVisual() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 46" className="h-12 w-11 shrink-0" focusable="false">
        <path
          d="M20 3 36 9v12c0 11-7 18.5-16 22C11 39.5 4 32 4 21V9Z"
          fill="rgba(6,182,212,0.08)"
          stroke="var(--memry-turquoise)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <g transform="translate(20 25)">
          <AcornShape />
        </g>
      </svg>
      <span className="rounded-full border border-white/12 px-2.5 py-1 text-xs text-[var(--hero-ink)]">{memories.label}</span>
    </div>
  )
}

/** "Leave anytime": one command erases the account. */
export function LeaveVisual() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className={`${mono} text-[var(--hero-ink)]`}>
      <div className="whitespace-nowrap">
        <span className="text-[var(--memry-turquoise)]">$</span> {leave.command}
      </div>
      <motion.div
        data-deleted
        {...enter(reduced, { opacity: 0 }, { opacity: 1 }, { duration: 0.4, delay: 1.1 })}
        className="mt-1 whitespace-nowrap text-white"
      >
        <span className="text-[var(--memry-turquoise)]">✓</span> {leave.done}
      </motion.div>
    </div>
  )
}

/** "Open source": the licence and what is not there. */
export function OpenVisual() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-md border border-[rgba(6,182,212,0.45)] px-2.5 py-1 text-sm font-bold tracking-[0.02em] text-white">
        {open.badge}
      </span>
      <span className="text-xs text-[var(--hero-ink)]">{open.note}</span>
    </div>
  )
}

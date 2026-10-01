import { motion } from 'motion/react'
import { outcomes } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornIcon, AcornShape } from '../atoms/Acorn'

/* Small decorative illustrations for the Outcomes cards. Hidden from assistive tech. */

const { restored, agents, tokens } = outcomes.visuals
const ease = [0.22, 1, 0.36, 1]
const inView = { viewport: { once: true, amount: 0.6 } }

/** "Pick up where you left off": the session opens and its memories come back one by one. */
export function RestoredVisual() {
  const reduced = usePrefersReducedMotion()
  const appear = (i) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x: -6 },
          whileInView: { opacity: 1, x: 0 },
          ...inView,
          transition: { duration: 0.5, delay: 0.25 + i * 0.3, ease },
        }

  return (
    <div className="flex flex-col gap-3">
      <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#e6f4f5] py-1 pr-3 pl-2 text-xs font-semibold text-[var(--memry-teal)]">
        <AcornIcon className="h-4 w-3.5" />
        {restored.status}
      </span>
      <ul className="space-y-1.5 font-mono text-[11.5px] leading-snug text-[var(--text-primary)]">
        {restored.lines.map((line, i) => (
          <motion.li key={line} {...appear(i)} className="flex items-start gap-2">
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--memry-turquoise)]" />
            <span className="min-w-0 break-words">{line}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

const chip =
  'min-w-0 truncate rounded-lg border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 text-xs font-semibold text-[var(--memry-dark)]'
const bridge = 'M6 30 C34 4 86 4 114 30'

/** "Switch agents, keep the context": one memory travels between two agents. */
export function AgentsVisual() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="flex items-center gap-1">
      <span className={chip}>{agents[0]}</span>
      <svg viewBox="0 0 120 40" className="min-w-10 flex-1 overflow-visible" focusable="false">
        <path d={bridge} fill="none" stroke="var(--memry-turquoise)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
        {/* Reduced motion: the acorn rests at the top of the bridge. */}
        <g className="travel-acorn" transform={reduced ? 'translate(60 10.5)' : undefined}>
          <g transform="scale(0.55)">
            <AcornShape />
          </g>
          {!reduced && (
            <animateMotion
              path={bridge}
              dur="4s"
              repeatCount="indefinite"
              calcMode="spline"
              keyPoints="0;1;0"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.25 1;0.45 0 0.25 1"
            />
          )}
        </g>
      </svg>
      <span className={chip}>{agents[1]}</span>
    </div>
  )
}

/** "Spend tokens on work, not repetition": a long grey bar against a short teal one. No figures. */
export function TokensVisual() {
  const reduced = usePrefersReducedMotion()
  const grow = reduced
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        ...inView,
        transition: { duration: 0.9, delay: 0.3, ease },
      }

  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <span className="text-xs font-medium text-[var(--memry-dark)]">{tokens.repeated}</span>
        <span data-bar="repeated" className="mt-1.5 block h-2.5 w-full rounded-full bg-[var(--border)]" />
      </div>
      <div>
        <span className="text-xs font-semibold text-[var(--memry-teal)]">{tokens.summary}</span>
        <motion.span
          data-bar="summary"
          {...grow}
          className="mt-1.5 block h-2.5 w-[30%] origin-left rounded-full bg-[var(--memry-teal)]"
        />
      </div>
    </div>
  )
}

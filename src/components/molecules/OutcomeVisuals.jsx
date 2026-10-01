import { motion } from 'motion/react'
import { agents as agentList, outcomes } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornIcon, AcornShape } from '../atoms/Acorn'
import { glassChip } from './GlassCard'

/* Small decorative illustrations for the Outcomes cards (dark band). Hidden from assistive tech. */

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
      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[rgba(6,182,212,0.35)] bg-[rgba(6,182,212,0.1)] py-1 pr-3 pl-2 text-xs font-semibold text-white [--memry-dark:var(--hero-ink)]">
        <AcornIcon className="h-4 w-3.5" />
        {restored.status}
      </span>
      <ul className="space-y-1.5 font-mono text-[11.5px] leading-snug text-[var(--hero-ink)]">
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

const chip = `${glassChip} flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold`

/** Glass agent chip with its monogram tile, as in the Agents diagram. */
function AgentChip({ name }) {
  return (
    <span className={chip}>
      <span data-monogram={agentList.monograms[agentList.list.indexOf(name)]} className="agent-tile" />
      <span className="truncate">{name}</span>
    </span>
  )
}

const bridge = 'M6 30 C34 4 86 4 114 30'

/** "Switch agents, keep the context": one memory travels between two agents. */
export function AgentsVisual() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="flex items-center gap-1">
      <AgentChip name={agents[0]} />
      <svg viewBox="0 0 120 40" className="min-w-10 flex-1 overflow-visible" focusable="false">
        <path d={bridge} fill="none" stroke="var(--memry-turquoise)" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
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
      <AgentChip name={agents[1]} />
    </div>
  )
}

/** "Spend tokens on work, not repetition": a long muted bar against a short turquoise one. No figures. */
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
        <span className="text-xs font-medium text-[var(--hero-ink-muted)]">{tokens.repeated}</span>
        <span data-bar="repeated" className="mt-1.5 block h-2.5 w-full rounded-full bg-white/15" />
      </div>
      <div>
        <span className="text-xs font-semibold text-[var(--memry-turquoise)]">{tokens.summary}</span>
        <motion.span
          data-bar="summary"
          {...grow}
          className="mt-1.5 block h-2.5 w-[30%] origin-left rounded-full bg-[var(--memry-turquoise)]"
        />
      </div>
    </div>
  )
}

import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { problem } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornIcon } from '../atoms/Acorn'

const { description, scenes, memry } = problem.illustration

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

// Each card floats on its own slow clock so the stack breathes instead of moving in unison.
const floats = [
  { duration: '7.2s', delay: '2.2s' },
  { duration: '6.4s', delay: '3.1s' },
  { duration: '7.8s', delay: '2.6s' },
  { duration: '6.8s', delay: '3.6s' },
]
const floatStyle = ({ duration, delay }) => ({ '--float-duration': duration, '--float-delay': delay })

function Float({ index, still, className = '', children }) {
  return (
    <div className={`${still ? '' : 'card-float'} ${className}`} style={still ? undefined : floatStyle(floats[index])}>
      {children}
    </div>
  )
}

const skeleton = [['w-11/12', 'w-2/3'], ['w-10/12', 'w-1/2'], ['w-3/4', 'w-7/12']]

/** Runs the CSS loops only while the illustration is on screen. */
function useLoopsOnScreen(ref, enabled) {
  const [loops, setLoops] = useState('paused')
  useEffect(() => {
    if (!enabled) return undefined
    const observer = new IntersectionObserver(([entry]) => setLoops(entry.isIntersecting ? 'running' : 'paused'))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, enabled])
  return loops
}

/*
 * Reload cycle: every CYCLE_MS the prompts and memory lines fade out one after
 * another, the next scene swaps in while they are hidden, and they fade back.
 */
const CYCLE_MS = 11000
const SWAP_MS = 1100

function useSceneCycle(running, count) {
  const [scene, setScene] = useState(0)
  const [phase, setPhase] = useState('idle')
  useEffect(() => {
    if (!running) return undefined
    let swap
    const cycle = setInterval(() => {
      setPhase('out')
      swap = setTimeout(() => {
        setScene((current) => (current + 1) % count)
        setPhase('in')
      }, SWAP_MS)
    }, CYCLE_MS)
    return () => {
      clearInterval(cycle)
      clearTimeout(swap)
    }
  }, [running, count])
  return { scene, phase }
}

export function SessionStack({ className = '' }) {
  const reduced = usePrefersReducedMotion()
  const stackRef = useRef(null)
  const loops = useLoopsOnScreen(stackRef, !reduced)
  const cycle = useSceneCycle(!reduced && loops === 'running', scenes.length)
  const scene = scenes[cycle.scene]
  const animate = (variants) => (reduced ? {} : { variants })
  const stage = reduced ? {} : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.35 } }

  return (
    <figure className={`m-0 ${className}`}>
      <figcaption className="sr-only">{description}</figcaption>
      <motion.div
        ref={stackRef}
        data-loops={reduced ? undefined : loops}
        data-phase={reduced ? undefined : cycle.phase}
        aria-hidden="true" className="flex flex-col" {...stage}>
        {scene.sessions.map((session, i) => (
          <Float key={session.day} index={i} still={reduced} className={i > 0 ? '-mt-7' : ''}>
            <motion.div
              {...animate(settle(i))}
              data-card="session"
              className={`relative mr-6 rounded-2xl border border-[var(--border)] bg-white px-5 pt-4 pb-10 sm:mr-10 ${sessionLook[i].offset}`}
            >
              <motion.div {...(reduced ? { style: { opacity: sessionLook[i].fade } } : { variants: dim(i, sessionLook[i].fade) })}>
                <span data-day className="text-xs font-semibold text-[var(--text-muted)]">
                  {session.day}
                </span>
                <p className="mt-2 font-mono text-[13px] text-[var(--text-primary)]">
                  <span className="mr-2 text-[var(--memry-teal)]">&gt;</span>
                  <span data-prompt className={reduced ? '' : 'scene-text'} style={reduced ? undefined : { '--line': i }}>
                    {session.prompt}
                  </span>
                  {!reduced && <span className="terminal-cursor" />}
                </p>
                <div className="mt-3 space-y-2 pl-5">
                  {skeleton[i].map((width) => (
                    <span key={width} className={`block h-1.5 rounded-full bg-[var(--border)] ${width}`} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </Float>
        ))}
        <Float index={3} still={reduced} className="-mt-5">
          <motion.div
            data-card="memry"
            {...animate(rise)}
            className={`relative rounded-2xl border border-[var(--memry-teal)] bg-white px-5 py-5 shadow-[0_18px_40px_-24px_rgba(7,59,70,0.45)] sm:mx-4 ${reduced ? '' : 'memry-reload'}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <span className="flex items-center gap-2 text-lg font-extrabold tracking-[-0.03em] text-[var(--memry-dark)]">
                <AcornIcon className="h-6 w-5" />
                {memry.name}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-[#e6f4f5] px-3 py-1 text-xs font-semibold text-[var(--memry-teal)] ${
                  reduced ? '' : 'pill-glow'
                }`}
              >
                {memry.status}
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" focusable="false">
                  <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <ul className="mt-4 space-y-2 font-mono text-[12.5px] leading-snug text-[var(--text-primary)]">
              {scene.memories.map((line, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2.5 ${reduced ? '' : 'reload-line'}`}
                  style={reduced ? undefined : { '--line': i }}
                >
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--memry-turquoise)]" />
                  <span className="min-w-0 break-words">{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </Float>
      </motion.div>
    </figure>
  )
}

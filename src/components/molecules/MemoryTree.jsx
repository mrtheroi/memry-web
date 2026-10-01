import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornShape } from '../atoms/Acorn'

/*
 * Placeholder Memory Tree illustration (replace with the official asset when
 * it exists). Branches are the project, turquoise nodes are stored memories,
 * orange acorns are the memories retrieved into the current session.
 */

const trunk = 'M200 412 C200 362 198 302 200 250'
const branches = [
  'M200 300 C170 286 140 270 110 235',
  'M200 290 C230 276 265 262 292 225',
  'M200 252 C185 222 165 196 150 160',
  'M200 252 C215 216 240 190 262 150',
  'M200 252 C201 210 200 160 202 110',
  'M110 235 C95 226 80 214 70 195',
  'M292 225 C310 215 322 200 332 180',
  'M150 160 C140 141 128 125 118 105',
  'M262 150 C275 131 286 117 300 100',
  'M202 110 C190 91 180 78 170 60',
  'M202 110 C214 92 225 80 236 62',
]
const memories = [
  [70, 195],
  [332, 180],
  [292, 225],
  [118, 105],
  [150, 160],
  [300, 100],
  [202, 110],
  [170, 60],
]
const acorns = [
  [110, 247],
  [262, 162],
  [236, 74],
]

/** Marks the svg as playing only while it is on screen, so the CSS twinkle pauses off-screen. */
function usePlayingOnScreen(ref, enabled) {
  useEffect(() => {
    if (!enabled) return undefined
    const svg = ref.current
    svg.dataset.playing = 'false'
    const observer = new IntersectionObserver(([entry]) => {
      svg.dataset.playing = String(entry.isIntersecting)
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [ref, enabled])
}

export function MemoryTree({ className = '' }) {
  const reduced = usePrefersReducedMotion()
  const svgRef = useRef(null)
  usePlayingOnScreen(svgRef, !reduced)
  // Memories and acorns settle from a slightly smaller size; they are never hidden, so the tree
  // is complete even if the entrance never plays (fast scroll, screenshots).
  const appear = (delay) =>
    reduced
      ? {}
      : {
          initial: { scale: 0.7 },
          whileInView: { scale: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <svg ref={svgRef} viewBox="40 30 330 400" className={className} aria-hidden="true" focusable="false">
      <line x1="130" y1="413" x2="270" y2="413" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
      <path
        d={trunk}
        fill="none"
        stroke="var(--memry-dark)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {branches.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={i < 5 ? 'var(--memry-dark)' : 'var(--memry-teal)'}
          strokeWidth={i < 5 ? 5 : 3}
          strokeLinecap="round"
        />
      ))}
      {memories.map(([cx, cy], i) => (
        <motion.g key={`${cx}-${cy}`} {...appear(0.2 + i * 0.07)} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle
            cx={cx}
            cy={cy}
            r="11"
            fill="var(--memry-turquoise)"
            opacity="0.14"
            {...(reduced
              ? {}
              : { className: 'memory-twinkle', style: { animationDelay: `${(i * 0.53).toFixed(2)}s` } })}
          />
          <circle cx={cx} cy={cy} r="7.5" fill="var(--memry-turquoise)" />
        </motion.g>
      ))}
      {acorns.map(([x, y], i) => (
        <motion.g key={`${x}-${y}`} {...appear(0.8 + i * 0.15)} style={{ transformOrigin: `${x}px ${y}px` }}>
          <AcornShape x={x} y={y} />
        </motion.g>
      ))}
    </svg>
  )
}

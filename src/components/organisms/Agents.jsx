import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { agents } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornIcon } from '../atoms/Acorn'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'

export function Agents() {
  return (
    <section aria-labelledby="agents-title" className="border-t border-[var(--border)] bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading id="agents-title">{agents.heading}</SectionHeading>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--text-primary)]">{agents.body}</p>
        <AgentDiagram />
      </Container>
    </section>
  )
}

/*
 * Each layout has its own coordinate system (an SVG viewBox). The HTML chips
 * and nodes sit over the SVG at the same coordinates expressed as percentages,
 * and the box keeps the viewBox's aspect ratio, so the curves meet the chips at
 * every width. Curves start and end under the chips and nodes, which hide the joins.
 */
const wide = (() => {
  const hub = { x: 560, y: 180 }
  const memory = { x: 900, y: 180 }
  const bends = [10, -8, -14, 8, -10]
  const chips = [44, 112, 180, 248, 316].map((y, i) => ({
    left: 2,
    y,
    box: { x: 20, width: 200, height: 40 },
    curve: `M200 ${y} C330 ${y + bends[i]} 420 ${hub.y + (y - hub.y) * 0.15} ${hub.x} ${hub.y}`,
  }))
  return {
    width: 1000,
    height: 360,
    pulse: 5,
    hub,
    memoryBox: { x: 750, y: memory.y, width: 230, height: 64 },
    chips,
    hubCurve: `M${hub.x} ${hub.y} C680 135 780 225 ${memory.x} ${memory.y}`,
  }
})()

const narrow = (() => {
  const hub = { x: 160, y: 322 }
  const memory = { x: 160, y: 432 }
  // Chips alternate left and right; their curves braid down the gap between them.
  const lanes = [-9, 9, -4, 4, 0]
  const chips = [28, 76, 124, 172, 220].map((y, i) => {
    const onLeft = i % 2 === 0
    const startX = onLeft ? 134 : 186
    const tangentX = onLeft ? 156 : 164
    return {
      left: onLeft ? 3 : 55,
      y,
      box: { x: onLeft ? 10 : 176, width: 134, height: 38 },
      curve: `M${startX} ${y} C${tangentX} ${y} ${hub.x + lanes[i]} ${y + (hub.y - y) * 0.6} ${hub.x} ${hub.y}`,
    }
  })
  return {
    width: 320,
    height: 480,
    pulse: 3.5,
    hub,
    memoryBox: { x: 45, y: memory.y, width: 230, height: 60 },
    chips,
    hubCurve: `M${hub.x} ${hub.y} C148 360 172 396 ${memory.x} ${memory.y}`,
  }
})()

const pct = (value, total) => `${(value / total) * 100}%`

/** Five agents converge on memry, which keeps one project memory. Stacks vertically below 768px. */
function AgentDiagram() {
  const figureRef = useRef(null)
  usePauseAnimationsOffscreen(figureRef)

  return (
    <figure ref={figureRef} className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-10">
      <div className="relative mx-auto aspect-[320/480] w-full max-w-[420px] md:aspect-[1000/360] md:max-w-none">
        <FlowDrawing layout="narrow" geometry={narrow} className="md:hidden" />
        <FlowDrawing layout="wide" geometry={wide} className="hidden md:block" />

        <ul aria-label={agents.listLabel} className="absolute inset-0">
          {agents.list.map((name, i) => (
            <li
              key={name}
              className="absolute top-[var(--n-top)] left-[var(--n-left)] w-[42%] -translate-y-1/2 md:top-[var(--w-top)] md:left-[var(--w-left)] md:w-[20%]"
              style={{
                '--n-top': pct(narrow.chips[i].y, narrow.height),
                '--n-left': `${narrow.chips[i].left}%`,
                '--w-top': pct(wide.chips[i].y, wide.height),
                '--w-left': `${wide.chips[i].left}%`,
              }}
            >
              <span className="block truncate rounded-full border border-[var(--border)] bg-white px-3 py-2 text-center text-sm font-semibold text-[var(--memry-dark)] md:py-1.5 md:text-xs lg:py-2 lg:text-sm">
                {name}
              </span>
            </li>
          ))}
        </ul>

        <span
          className="absolute top-[var(--n-top)] left-[var(--n-left)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--memry-teal)] bg-[var(--memry-dark)] px-6 py-4 text-base font-semibold whitespace-nowrap text-white md:top-[var(--w-top)] md:left-[var(--w-left)]"
          style={{
            '--n-top': pct(narrow.hub.y, narrow.height),
            '--n-left': pct(narrow.hub.x, narrow.width),
            '--w-top': pct(wide.hub.y, wide.height),
            '--w-left': pct(wide.hub.x, wide.width),
          }}
        >
          {agents.hub}
        </span>

        <span className="absolute top-[90%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold whitespace-nowrap text-[var(--memry-dark)] md:top-1/2 md:right-[2%] md:left-auto md:max-w-[26%] md:translate-x-0 md:whitespace-normal lg:max-w-none lg:whitespace-nowrap">
          <AcornIcon className="h-6 w-5 shrink-0" />
          {agents.memory}
        </span>
      </div>
      <figcaption className="mt-8 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--text-muted)]">
        {agents.diagramNote}
      </figcaption>
    </figure>
  )
}

/**
 * Holds the SVG animation clocks until the diagram is on screen, and pauses
 * them again when it scrolls away, so the pulses cost nothing off-screen and
 * start in step with the curves drawing in.
 */
function usePauseAnimationsOffscreen(ref) {
  useEffect(() => {
    const svgs = [...ref.current.querySelectorAll('svg[data-layout]')].filter(
      (svg) => typeof svg.pauseAnimations === 'function',
    )
    if (svgs.length === 0) return undefined
    svgs.forEach((svg) => svg.pauseAnimations())
    const observer = new IntersectionObserver(([entry]) => {
      svgs.forEach((svg) => (entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()))
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}

/** The curves for one layout. Decorative: the list and nodes carry the meaning. */
function FlowDrawing({ layout, geometry, className }) {
  const reduced = usePrefersReducedMotion()
  const draw = (delay) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 1.1, delay, ease: 'easeOut' },
        }
  const stroke = {
    fill: 'none',
    stroke: 'var(--memry-turquoise)',
    strokeOpacity: 0.45,
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    vectorEffect: 'non-scaling-stroke',
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-layout={layout}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className={`absolute inset-0 h-full w-full overflow-visible ${className}`}
    >
      {geometry.chips.map((chip, i) => (
        <motion.path key={chip.curve} className="agent-curve" d={chip.curve} {...stroke} {...draw(i * 0.08)} />
      ))}
      <motion.path className="hub-curve" d={geometry.hubCurve} {...stroke} {...draw(0.9)} />
      {!reduced && <Pulses layout={layout} geometry={geometry} />}
    </svg>
  )
}

/*
 * The story, told with SVG SMIL (no JS per frame):
 * SAVE: each agent sends a turquoise pulse on its own offset. It passes through
 * memry (which glows softly) and goes on into the project memory, which glows
 * faintly when it arrives. Offsets are spaced wider than the memry-to-memory leg,
 * so pulses never bunch up on that shared curve.
 * RECALL: one orange pulse (the acorn, a memory that matters) travels from the
 * project memory back through memry to one agent at a time; that chip glows.
 */
const SAVE_START = 1.6 // after the curves have drawn themselves
const SAVE_CYCLE = 16
const SAVE_IN = 4.2 // agent to memry
const SAVE_OUT = 2.6 // memry to the project memory
const SAVE_REST = SAVE_CYCLE - SAVE_IN - SAVE_OUT
const SAVE_OFFSETS = [0, 9.8, 3.1, 12.9, 6.3] // per agent; at least 3.1 s apart, never top to bottom
const RECALL_START = 5
const RECALL_TRAVEL = 4.4
const RECALL_GAP = 4
const RECALL_ORDER = [0, 3, 1, 4, 2]
const EASE = '0.45 0 0.25 1'

const seconds = (value) => `${+value.toFixed(3)}s`

/** Reverses a single-segment cubic path: "M a C b c d" becomes "M d C c b a". */
function reverseCubic(d) {
  const [ax, ay, bx, by, cx, cy, dx, dy] = d.match(/-?[\d.]+/g)
  return { start: `M${dx} ${dy}`, segment: `C${cx} ${cy} ${bx} ${by} ${ax} ${ay}` }
}

function Pulses({ layout, geometry }) {
  const glowId = `${layout}AgentsGlow`
  const softId = `${layout}AgentsSoft`
  const recallId = (k) => `${layout}Recall${k}`
  const saveInId = (i) => `${layout}Save${i}In`
  const saveOutId = (i) => `${layout}Save${i}Out`
  const box = geometry.memoryBox
  const hubBack = reverseCubic(geometry.hubCurve)

  return (
    <>
      <defs>
        <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={softId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* memry's glow, behind the node, as each save pulse passes through. */}
      <rect
        x={geometry.hub.x - 62}
        y={geometry.hub.y - 32}
        width="124"
        height="64"
        rx="16"
        fill="var(--memry-turquoise)"
        fillOpacity="0.55"
        filter={`url(#${softId})`}
        opacity="0"
      >
        {geometry.chips.map((chip, i) => (
          <animate
            key={chip.y}
            attributeName="opacity"
            begin={`${saveInId(i)}.end-0.2s`}
            dur="1.4s"
            values="0;1;0"
            keyTimes="0;0.25;1"
          />
        ))}
      </rect>

      {/* The project memory's faint glow, as each save pulse arrives. */}
      <rect
        className="memory-glow"
        x={box.x}
        y={box.y - box.height / 2}
        width={box.width}
        height={box.height}
        rx="16"
        fill="var(--memry-turquoise)"
        fillOpacity="0.4"
        filter={`url(#${softId})`}
        opacity="0"
      >
        {geometry.chips.map((chip, i) => (
          <animate
            key={chip.y}
            attributeName="opacity"
            begin={`${saveOutId(i)}.end-0.3s`}
            dur="1.5s"
            values="0;1;0"
            keyTimes="0;0.3;1"
          />
        ))}
      </rect>

      {/* A faint orange glow behind each chip, when the recall pulse reaches it. */}
      {geometry.chips.map((chip, i) => {
        const k = RECALL_ORDER.indexOf(i)
        return (
          <rect
            key={`halo-${chip.y}`}
            x={chip.box.x}
            y={chip.y - chip.box.height / 2}
            width={chip.box.width}
            height={chip.box.height}
            rx={chip.box.height / 2}
            fill="var(--memry-orange)"
            fillOpacity="0.4"
            filter={`url(#${softId})`}
            opacity="0"
          >
            <animate
              attributeName="opacity"
              begin={`${recallId(k)}.end-0.4s`}
              dur="2.2s"
              values="0;1;0"
              keyTimes="0;0.25;1"
            />
          </rect>
        )
      })}

      {geometry.chips.map((chip, i) => (
        <circle
          key={`save-${chip.y}`}
          className="save-pulse"
          r={geometry.pulse}
          fill="var(--memry-turquoise)"
          filter={`url(#${glowId})`}
          opacity="0"
        >
          {/* Two legs, chained: agent to memry, then memry to the project memory. */}
          <animateMotion
            id={saveInId(i)}
            path={chip.curve}
            begin={`${seconds(SAVE_START + SAVE_OFFSETS[i])}; ${saveOutId(i)}.end+${seconds(SAVE_REST)}`}
            dur={seconds(SAVE_IN)}
            calcMode="spline"
            keyPoints="0;1"
            keyTimes="0;1"
            keySplines={EASE}
          />
          <animateMotion
            id={saveOutId(i)}
            path={geometry.hubCurve}
            begin={`${saveInId(i)}.end`}
            dur={seconds(SAVE_OUT)}
            calcMode="spline"
            keyPoints="0;1"
            keyTimes="0;1"
            keySplines={EASE}
          />
          <animate
            attributeName="opacity"
            begin={`${saveInId(i)}.begin`}
            dur={seconds(SAVE_IN)}
            values="0;0.9;0.9"
            keyTimes="0;0.12;1"
          />
          <animate
            attributeName="opacity"
            begin={`${saveOutId(i)}.begin`}
            dur={seconds(SAVE_OUT)}
            values="0.9;0.9;0"
            keyTimes="0;0.85;1"
          />
        </circle>
      ))}

      <circle
        className="recall-pulse"
        r={geometry.pulse + 0.5}
        fill="var(--memry-orange)"
        filter={`url(#${glowId})`}
        opacity="0"
      >
        {RECALL_ORDER.map((agent, k) => {
          const toAgent = reverseCubic(geometry.chips[agent].curve)
          const last = RECALL_ORDER.length - 1
          const begin =
            k === 0
              ? `${seconds(RECALL_START)}; ${recallId(last)}.end+${seconds(RECALL_GAP)}`
              : `${recallId(k - 1)}.end+${seconds(RECALL_GAP)}`
          return (
            <animateMotion
              key={agent}
              id={recallId(k)}
              path={`${hubBack.start} ${hubBack.segment} ${toAgent.segment}`}
              begin={begin}
              dur={seconds(RECALL_TRAVEL)}
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines={EASE}
            />
          )
        })}
        {RECALL_ORDER.map((agent, k) => (
          <animate
            key={agent}
            attributeName="opacity"
            begin={`${recallId(k)}.begin`}
            dur={seconds(RECALL_TRAVEL)}
            values="0;0.95;0.95;0"
            keyTimes="0;0.08;0.9;1"
          />
        ))}
      </circle>
    </>
  )
}

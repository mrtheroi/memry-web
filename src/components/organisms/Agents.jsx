import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { agents } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AcornIcon, AcornShape } from '../atoms/Acorn'
import { Container } from '../atoms/Container'
import { SectionHeading } from '../atoms/SectionHeading'
import { glassChip } from '../molecules/GlassCard'

export function Agents() {
  return (
    <section aria-labelledby="agents-title" className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <SectionHeading id="agents-title">{agents.heading}</SectionHeading>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-primary)]">{agents.body}</p>
        </div>
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
 *
 * memry is a Memory Tree drawn in the SVG, growing up from a glowing junction at
 * the hub point where the agent curves meet, with the HTML wordmark under it. The project folder is HTML; the hub curve ends just
 * inside its edge (wide: left edge, narrow: top edge), wherever its height grows.
 */
const wide = (() => {
  /*
   * The tree + wordmark group is centred on the canvas's middle (y 180), and so is
   * the folder. Group: tree top = hub.y - (102 + 4.5) * 1.3, wordmark bottom =
   * hub.y + 12 + 30, so hub.y = (360 + 138.45 - 42) / 2 ≈ 228.
   */
  const hub = { x: 560, y: 228 }
  const folder = { x: 740, y: 180 } // the folder's left edge, vertically centred
  const bends = [10, -8, -14, 8, -10]
  const chips = [44, 112, 180, 248, 316].map((y, i) => ({
    left: 2,
    y,
    box: { x: 20, width: 200, height: 40 },
    curve: `M200 ${y} C330 ${y + bends[i]} 420 ${hub.y + (y - hub.y) * 0.05} ${hub.x} ${hub.y}`,
  }))
  return {
    width: 1000,
    height: 360,
    pulse: 5,
    strokeAxis: { x1: 200, y1: 0, x2: 900, y2: 0 },
    hub,
    // The tree grows up from the junction; the wordmark sits under it (units).
    tree: { x: hub.x, y: hub.y, scale: 1.3 },
    wordmark: { gap: 12, size: 30 },
    folder,
    memoryBox: { x: folder.x, y: folder.y, width: 240, height: 150 },
    chips,
    hubCurve: `M${hub.x} ${hub.y} C650 ${hub.y} 660 ${folder.y} ${folder.x + 10} ${folder.y}`,
  }
})()

const narrow = (() => {
  // Chips, then the tree growing up from the junction, the wordmark, and the folder, all on x 160.
  const hub = { x: 160, y: 333 }
  const folder = { x: 160, y: 385 } // the folder's top edge: 16 below the wordmark (333 + 12 + 24)
  // Chips alternate left and right; their curves braid down the gap between them.
  const lanes = [-5, 5, -2, 2, 0]
  const chips = [28, 76, 124, 172, 220].map((y, i) => {
    const onLeft = i % 2 === 0
    const startX = onLeft ? 144 : 176
    const tangentX = onLeft ? 156 : 164
    return {
      left: onLeft ? 1 : 51,
      y,
      box: { x: onLeft ? 6 : 166, width: 147, height: 38 },
      curve: `M${startX} ${y} C${tangentX} ${y} ${hub.x + lanes[i]} ${y + (hub.y - y) * 0.6} ${hub.x} ${hub.y}`,
    }
  })
  return {
    width: 320,
    height: 560,
    pulse: 3.5,
    strokeAxis: { x1: 0, y1: 28, x2: 0, y2: folder.y },
    hub,
    // The agent curves braid down the tree's axis into the junction at its base;
    // the hub curve runs on down, behind the wordmark, into the folder.
    tree: { x: hub.x, y: hub.y, scale: 0.82 },
    wordmark: { gap: 12, size: 24 },
    folder,
    memoryBox: { x: 35, y: 460, width: 250, height: 150 },
    chips,
    hubCurve: `M${hub.x} ${hub.y} C${hub.x} 355 ${hub.x} 370 ${folder.x} ${folder.y + 18}`,
  }
})()

/*
 * The Memory Tree, in its own units: origin at the trunk's base, growing upwards.
 * One turquoise memory node per agent, and two acorns (memories that matter).
 */
const TREE = {
  height: 102,
  trunk: 'M0 0 C0 -20 -1 -40 0 -56',
  branches: [
    'M0 -30 C-14 -36 -28 -44 -40 -60',
    'M0 -34 C14 -40 28 -48 42 -62',
    'M0 -56 C-8 -70 -16 -80 -22 -94',
    'M0 -56 C8 -70 18 -80 24 -92',
    'M0 -56 C0 -72 1 -86 0 -102',
  ],
  nodes: [
    [-40, -60],
    [42, -62],
    [-22, -94],
    [24, -92],
    [0, -102],
  ],
  acorns: [
    [21, -38.5],
    [-13, -68],
  ],
}


const pct = (value, total) => `${(value / total) * 100}%`

/** Five agents converge on memry, which keeps one project memory. Stacks vertically below 768px; spans the full width from 768px. */
function AgentDiagram() {
  const figureRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  usePauseAnimationsOffscreen(figureRef)

  return (
    <figure ref={figureRef} className="agents-canvas mt-12 rounded-2xl p-5 sm:p-8">
      <div className="relative mx-auto @container aspect-[320/560] w-full max-w-[420px] md:aspect-[1000/360] md:max-w-none">
        <FlowDrawing layout="narrow" geometry={narrow} className="md:hidden" />
        <FlowDrawing layout="wide" geometry={wide} className="hidden md:block" />

        <ul aria-label={agents.listLabel} className="absolute inset-0">
          {agents.list.map((name, i) => (
            <li
              key={name}
              className="absolute top-[var(--n-top)] left-[var(--n-left)] w-[48%] -translate-y-1/2 md:top-[var(--w-top)] md:left-[var(--w-left)] md:w-[20%]"
              style={{
                '--n-top': pct(narrow.chips[i].y, narrow.height),
                '--n-left': `${narrow.chips[i].left}%`,
                '--w-top': pct(wide.chips[i].y, wide.height),
                '--w-left': `${wide.chips[i].left}%`,
              }}
            >
              <span
                className={`${glassChip} flex items-center justify-center gap-1 rounded-full px-1.5 py-2 text-[0.78rem] font-semibold sm:gap-2 sm:px-3 sm:text-sm md:gap-1.5 md:px-2 md:py-1.5 md:text-xs lg:gap-2 lg:px-3 lg:py-2 lg:text-sm ${reduced ? '' : 'agent-send-glow'}`}
                // The border brightens as this agent's save pulse leaves: same delay and cycle as the SVG pulse.
                style={
                  reduced
                    ? undefined
                    : { animationDelay: seconds(SAVE_START + SAVE_OFFSETS[i]), animationDuration: seconds(SAVE_CYCLE) }
                }
              >
                {/* Letters drawn by CSS from data-monogram, so the chip's text stays the agent's name. */}
                <span aria-hidden="true" data-monogram={agents.monograms[i]} className="agent-tile" />
                <span className="truncate">{name}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* The brand wordmark under the tree, sized in container units so it scales with the drawing. */}
        <span
          data-testid="memry-wordmark"
          className="absolute top-[var(--n-top)] left-[var(--n-left)] -translate-x-1/2 text-[length:var(--n-size)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap text-white [text-shadow:0_0_6px_var(--hero-bg-mid),0_0_14px_var(--hero-bg-mid)] md:top-[var(--w-top)] md:left-[var(--w-left)] md:text-[length:var(--w-size)]"
          style={{
            '--n-top': pct(narrow.hub.y + narrow.wordmark.gap, narrow.height),
            '--n-left': pct(narrow.hub.x, narrow.width),
            '--n-size': `${(narrow.wordmark.size / narrow.width) * 100}cqw`,
            '--w-top': pct(wide.hub.y + wide.wordmark.gap, wide.height),
            '--w-left': pct(wide.hub.x, wide.width),
            '--w-size': `${(wide.wordmark.size / wide.width) * 100}cqw`,
          }}
        >
          {agents.hub.slice(0, -1)}
          <span className="text-[var(--memry-orange)]">{agents.hub.slice(-1)}</span>
        </span>

        {/* The junction where the agent curves meet, at the trunk's base; pulses pass through it. */}
        <span
          aria-hidden="true"
          className="hub-junction absolute top-[var(--n-top)] left-[var(--n-left)] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:top-[var(--w-top)] md:left-[var(--w-left)] lg:size-3"
          style={{
            '--n-top': pct(narrow.hub.y, narrow.height),
            '--n-left': pct(narrow.hub.x, narrow.width),
            '--w-top': pct(wide.hub.y, wide.height),
            '--w-left': pct(wide.hub.x, wide.width),
          }}
        >
          {!reduced && <span className="hub-ring pointer-events-none absolute -inset-1.5 rounded-full" />}
        </span>

        <ProjectFolder />
      </div>
      <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-[var(--hero-ink-muted)]">
        {agents.diagramNote}
      </figcaption>
    </figure>
  )
}

/**
 * The project as a folder: a tab, its name with an acorn (the memory), and a few
 * sample entries. Narrow: hangs from the hub curve's end, centred. Wide: its left
 * edge sits on the hub curve's end, vertically centred.
 */
function ProjectFolder() {
  const reduced = usePrefersReducedMotion()
  return (
    <div
      data-testid="project-folder"
      className="absolute top-[var(--n-top)] left-1/2 w-[78%] -translate-x-1/2 md:top-[var(--w-top)] md:left-[var(--w-left)] md:w-[24%] md:max-w-[15rem] md:translate-x-0 md:-translate-y-1/2"
      style={{
        '--n-top': pct(narrow.folder.y, narrow.height),
        '--w-top': pct(wide.folder.y, wide.height),
        '--w-left': pct(wide.folder.x, wide.width),
      }}
    >
      <span aria-hidden="true" className={`${glassChip} block h-2.5 w-[40%] rounded-t-lg border-b-0`} />
      <div className={`${glassChip} rounded-xl rounded-tl-none px-3 pt-2.5 pb-2`}>
        <p className="flex items-center gap-2 text-sm font-semibold md:text-xs lg:text-sm">
          {/* The acorn's cap is dark ink by default; lighten it for the navy canvas. */}
          <span className="flex shrink-0 [--memry-dark:var(--hero-ink)]">
            <AcornIcon className="h-5 w-4" />
          </span>
          {agents.memory}
        </p>
        <ul aria-hidden="true" className="mt-1.5 font-mono text-[0.75rem] leading-5 md:text-[0.6875rem] lg:text-[0.75rem]">
          {agents.files.map((file, row) => (
            <li key={file.name} className="file-row relative flex items-center gap-2 rounded-md px-1.5">
              {!reduced &&
                agents.list.map(
                  (agent, i) =>
                    FILE_ROW_FOR_AGENT[i] === row && (
                      // Warms up as this agent's save pulse lands: same cycle as the SVG pulse, a beat early.
                      <span
                        key={agent}
                        aria-hidden="true"
                        className="file-row-glow pointer-events-none absolute inset-0 rounded-md"
                        style={{
                          animationDelay: seconds(folderArrival(i) - 0.2),
                          animationDuration: seconds(SAVE_CYCLE),
                        }}
                      />
                    ),
                )}
              <FileGlyph kind={file.kind} />
              <span className="relative truncate">{file.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Small line glyphs for the folder's entries: a branch, a folder, a file. Generic shapes. */
function FileGlyph({ kind }) {
  const shapes = {
    branch: (
      <>
        <circle cx="4.5" cy="3" r="1.6" />
        <circle cx="4.5" cy="13" r="1.6" />
        <circle cx="11.5" cy="5" r="1.6" />
        <path d="M4.5 4.6v6.8M11.5 6.6c0 3-7 2.2-7 4.8" />
      </>
    ),
    folder: <path d="M1.5 3.5h4.5l1.5 1.7h7v8.3h-13z" />,
    file: <path d="M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3" />,
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="relative size-3.5 shrink-0 fill-none stroke-[var(--memry-turquoise)] stroke-[1.3]"
    >
      {shapes[kind]}
    </svg>
  )
}

/**
 * Holds the diagram's animation clocks until the diagram is on screen, and pauses
 * them again when it scrolls away, so the pulses cost nothing off-screen and
 * start in step with the curves drawing in.
 */
function usePauseAnimationsOffscreen(ref) {
  useEffect(() => {
    const svgs = [...ref.current.querySelectorAll('svg[data-layout]')].filter(
      (svg) => typeof svg.pauseAnimations === 'function',
    )
    if (svgs.length === 0) return undefined
    // CSS animations in the diagram (status dots, memry's ring) follow the same switch.
    const figure = ref.current
    const play = (playing) => {
      figure.dataset.playing = String(playing)
      svgs.forEach((svg) => (playing ? svg.unpauseAnimations() : svg.pauseAnimations()))
    }
    play(false)
    const observer = new IntersectionObserver(([entry]) => play(entry.isIntersecting))
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
  const strokeId = `${layout}AgentsStroke`
  const haloId = `${layout}AgentsHalo`
  const stroke = {
    fill: 'none',
    stroke: `url(#${strokeId})`,
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
      <defs>
        {/* Teal at the agents, turquoise towards memry and the memory. */}
        <linearGradient id={strokeId} gradientUnits="userSpaceOnUse" {...geometry.strokeAxis}>
          <stop offset="0" stopColor="var(--memry-teal)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--memry-turquoise)" stopOpacity="0.75" />
        </linearGradient>
        <filter id={haloId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      {/* A soft, steady halo behind memry's tree. */}
      <ellipse
        cx={treeCanopy(geometry.tree).x}
        cy={treeCanopy(geometry.tree).y}
        rx={74 * geometry.tree.scale}
        ry={58 * geometry.tree.scale}
        fill="var(--memry-turquoise)"
        fillOpacity="0.22"
        filter={`url(#${haloId})`}
      />
      {geometry.chips.map((chip, i) => (
        <motion.path key={chip.curve} className="agent-curve" d={chip.curve} {...stroke} {...draw(i * 0.08)} />
      ))}
      <motion.path className="hub-curve" d={geometry.hubCurve} {...stroke} {...draw(0.9)} />
      <MemoryTreeGlyph {...geometry.tree} />
      {!reduced && <Pulses layout={layout} geometry={geometry} />}
    </svg>
  )
}

/** The middle of the tree's canopy, in layout units. */
const treeCanopy = ({ x, y, scale }) => ({ x, y: y - TREE.height * 0.62 * scale })

/** memry's Memory Tree, static: trunk, branches, memory nodes and acorns. */
function MemoryTreeGlyph({ x, y, scale }) {
  const wood = { fill: 'none', stroke: 'var(--hero-ink)', strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke' }
  return (
    <g data-testid="memry-tree" transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={TREE.trunk} {...wood} strokeOpacity="0.7" strokeWidth="3" />
      {TREE.branches.map((d) => (
        <path key={d} d={d} {...wood} strokeOpacity="0.55" strokeWidth="1.75" />
      ))}
      {/* The acorn's cap is dark ink by default; lighten it for the navy canvas. */}
      <g style={{ '--memry-dark': 'var(--hero-ink)' }}>
        {TREE.acorns.map(([ax, ay]) => (
          <g key={`${ax} ${ay}`} transform={`translate(${ax} ${ay}) scale(0.55)`}>
            <AcornShape />
          </g>
        ))}
      </g>
      {TREE.nodes.map(([nx, ny]) => (
        <circle
          key={`${nx} ${ny}`}
          className="tree-node"
          cx={nx}
          cy={ny}
          r="4.5"
          fill="var(--memry-turquoise)"
          stroke="var(--hero-bg-mid)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
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
// Which tree node and folder row light up for each agent's save; in time order they wander.
const TREE_NODE_FOR_AGENT = [0, 1, 3, 2, 4]
const FILE_ROW_FOR_AGENT = [0, 3, 1, 0, 2]
/** When agent i's save pulse reaches the folder, first time round (then every SAVE_CYCLE). */
const folderArrival = (i) => SAVE_START + SAVE_OFFSETS[i] + SAVE_IN + SAVE_OUT

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
  const tree = geometry.tree
  const canopy = treeCanopy(tree)
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

      {/* memry's glow, behind the tree's canopy, as each save pulse passes through. */}
      <ellipse
        cx={canopy.x}
        cy={canopy.y}
        rx={56 * tree.scale}
        ry={46 * tree.scale}
        fill="var(--memry-turquoise)"
        fillOpacity="0.45"
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
      </ellipse>

      {/* One memory node lights up per arriving save: a different node for each agent. */}
      {geometry.chips.map((chip, i) => {
        const [nx, ny] = TREE.nodes[TREE_NODE_FOR_AGENT[i]]
        return (
          <circle
            key={`spark-${chip.y}`}
            className="tree-spark"
            cx={tree.x + nx * tree.scale}
            cy={tree.y + ny * tree.scale}
            r={7 * tree.scale}
            fill="#ecfeff"
            filter={`url(#${glowId})`}
            opacity="0"
          >
            <animate
              attributeName="opacity"
              begin={`${saveInId(i)}.end-0.1s`}
              dur="1.8s"
              values="0;1;1;0"
              keyTimes="0;0.15;0.45;1"
            />
            <animate
              attributeName="r"
              begin={`${saveInId(i)}.end-0.1s`}
              dur="1.8s"
              values={`${4.5 * tree.scale};${8 * tree.scale};${4.5 * tree.scale}`}
              keyTimes="0;0.3;1"
            />
          </circle>
        )
      })}

      {/* The project memory's faint, warm glow (the acorn's colour), as each save pulse arrives. */}
      <rect
        className="memory-glow"
        x={box.x}
        y={box.y - box.height / 2}
        width={box.width}
        height={box.height}
        rx="16"
        fill="var(--memry-orange)"
        fillOpacity="0.32"
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

import { useRef } from 'react'
import { community } from '../../content'
import { usePlayingOnScreen } from '../../hooks/usePlayingOnScreen'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { TreeMark } from '../atoms/TreeMark'

/*
 * Header illustrations for the two edition cards (light section), hidden from assistive tech:
 * the card text says the same thing. Both share one layout grammar, so the only difference
 * is whose boundary the memry server sits in: a cloud Memry runs, or a dashed box of your servers.
 *
 * Row geometry (px): three 36px agent tiles, 8px apart, in a 124px column; their lines meet at
 * HUB_Y, where the boundary's left edge is (the cloud's leftmost lobe sits at that height).
 */
const { agents, agentsLabel, hub, cloud, servers, containers, database } = community.visuals
const ROW = 124
const LINE_WIDTH = 48
const HUB_Y = 80
const TILE_Y = [18, 62, 106]
// Each line ends a few px inside the boundary, under its fill, which hides the join.
const LINES = TILE_Y.map((y) => `M0 ${y} C${LINE_WIDTH / 2} ${y} ${LINE_WIDTH / 2} ${HUB_Y} ${LINE_WIDTH + 8} ${HUB_Y}`)

/*
 * Pulses: one per line, on one 6 s clock each, offset so they leave the agents one after another.
 * Each travels for the first 40% of its cycle and rests (hidden) for the rest; no ids needed.
 */
const PULSE_CYCLE = 6
const PULSE_OFFSETS = [0.6, 2.6, 4.6]
const PULSE_EASE = '0.45 0 0.25 1'

function Pulse({ path, begin }) {
  return (
    <circle className="edition-pulse" r="3" fill="var(--memry-turquoise)" opacity="0">
      <animateMotion
        path={path}
        begin={`${begin}s`}
        dur={`${PULSE_CYCLE}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keyPoints="0;1;1"
        keyTimes="0;0.4;1"
        keySplines={`${PULSE_EASE};0 0 1 1`}
      />
      <animate
        attributeName="opacity"
        begin={`${begin}s`}
        dur={`${PULSE_CYCLE}s`}
        repeatCount="indefinite"
        values="0;0.95;0.95;0;0"
        keyTimes="0;0.05;0.34;0.4;1"
      />
    </circle>
  )
}

/** Your agents on the left, lines converging on the boundary that holds memry. */
function EditionVisual({ children }) {
  const reduced = usePrefersReducedMotion()
  const svgRef = useRef(null)
  usePlayingOnScreen(svgRef, !reduced)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center" style={{ height: ROW }}>
        <div className="flex shrink-0 flex-col gap-2">
          {agents.map((monogram) => (
            <span key={monogram} data-monogram={monogram} className="agent-tile agent-tile-light agent-tile-lg" />
          ))}
        </div>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${LINE_WIDTH} ${ROW}`}
          className="shrink-0 overflow-visible"
          style={{ width: LINE_WIDTH, height: ROW }}
          focusable="false"
        >
          {LINES.map((d) => (
            <path
              key={d}
              className="edition-line"
              d={d}
              fill="none"
              stroke="var(--memry-turquoise)"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
          {!reduced && LINES.map((d, i) => <Pulse key={d} path={d} begin={PULSE_OFFSETS[i]} />)}
        </svg>
        <div className="relative h-[104px] max-w-[12rem] min-w-0 flex-1">{children}</div>
      </div>
      <span className="text-xs font-medium text-[#5B6C6F]">{agentsLabel}</span>
    </div>
  )
}

/** The lowercase brand word under the mark, its last letter in the acorn's orange (as in the Agents diagram). */
function HubWord() {
  return (
    <span className="text-sm leading-none font-extrabold tracking-[-0.04em] text-[var(--memry-dark)]">
      {hub.slice(0, -1)}
      <span className="text-[var(--memry-orange)]">{hub.slice(-1)}</span>
    </span>
  )
}

/** Who holds the boundary, on a small pill across its bottom edge. */
function BoundaryLabel({ children }) {
  return (
    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border border-[rgba(8,127,134,0.3)] bg-white px-2 py-0.5 text-[11px] leading-4 font-semibold whitespace-nowrap text-[var(--memry-dark)]">
      {children}
    </span>
  )
}

const CLOUD =
  'M38 100 C18 100 6 88 6 74 C6 60 20 52 34 53 C36 34 52 22 72 25 C82 10 106 8 120 21 C134 14 156 24 157 43 C171 47 176 62 171 77 C167 92 155 100 142 100 Z'

/** Memry Cloud: memry inside a cloud that Memry runs. */
export function CloudVisual() {
  return (
    <EditionVisual>
      <div data-boundary="memry" className="absolute inset-0">
        <svg
          viewBox="0 0 176 104"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full drop-shadow-[0_10px_18px_rgba(6,182,212,0.18)]"
          focusable="false"
        >
          <path d={CLOUD} fill="#fff" stroke="var(--memry-teal)" strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pt-5">
          <span className="text-[var(--memry-dark)]">
            <TreeMark className="size-8" />
          </span>
          <HubWord />
        </div>
        <BoundaryLabel>{cloud}</BoundaryLabel>
      </div>
    </EditionVisual>
  )
}

/** One generic corrugated shipping container; `children` sit on its face. */
function ShippingContainer({ dark = false, children }) {
  return (
    <span
      data-container
      className={`grid h-7 w-10 place-items-center rounded-[3px] border ${
        dark
          ? 'border-[var(--memry-dark)] bg-[repeating-linear-gradient(90deg,#0b5560_0_2px,#073b46_2px_5px)] text-[var(--hero-ink)]'
          : 'border-[rgba(8,127,134,0.55)] bg-[repeating-linear-gradient(90deg,#d6eff2_0_2px,#f0fafb_2px_5px)]'
      }`}
    >
      {children}
    </span>
  )
}

/** A small database cylinder: the three ellipse bands every reader knows as "a database". */
function DatabaseGlyph() {
  return (
    <svg viewBox="0 0 24 30" className="h-[30px] w-6" focusable="false">
      <path
        d="M2 5v20c0 2.2 4.5 4 10 4s10-1.8 10-4V5"
        fill="#F0FAFB"
        stroke="var(--memry-teal)"
        strokeOpacity="0.8"
        strokeWidth="1.3"
      />
      <path d="M2 12c0 2.2 4.5 4 10 4s10-1.8 10-4M2 19c0 2.2 4.5 4 10 4s10-1.8 10-4" fill="none" stroke="var(--memry-teal)" strokeOpacity="0.5" strokeWidth="1.1" />
      <ellipse cx="12" cy="5" rx="10" ry="4" fill="var(--memry-turquoise)" fillOpacity="0.25" stroke="var(--memry-teal)" strokeOpacity="0.8" strokeWidth="1.3" />
    </svg>
  )
}

/** Memry Community: memry in a stack of containers, beside its PostgreSQL database, inside your servers. */
export function CommunityVisual() {
  return (
    <EditionVisual>
      <div
        data-boundary="yours"
        className="absolute inset-0 flex items-end justify-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-[rgba(8,127,134,0.55)] bg-white px-2 pb-4"
      >
        <div data-containers className="flex flex-col items-center gap-1">
          <div className="flex flex-col items-center gap-0.5">
            <ShippingContainer dark>
              <TreeMark className="size-5" />
            </ShippingContainer>
            <div className="flex gap-0.5">
              <ShippingContainer />
              <ShippingContainer />
            </div>
          </div>
          <span className="text-[11px] leading-4 font-semibold text-[var(--memry-dark)]">{containers}</span>
        </div>
        <div data-database className="flex flex-col items-center gap-1">
          <DatabaseGlyph />
          <span className="text-[11px] leading-4 font-medium text-[#5B6C6F]">{database}</span>
        </div>
        <BoundaryLabel>{servers}</BoundaryLabel>
      </div>
    </EditionVisual>
  )
}

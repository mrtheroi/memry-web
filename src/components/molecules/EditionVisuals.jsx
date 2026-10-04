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
 * The picture runs across the card's full width and is drawn in one unit, --u: 1% of its own
 * width (a size container), clamped so it stays legible on phones and calm on desktops. Tiles,
 * lines and everything inside the boundary scale with it, so the height follows the width; the
 * boundary takes whatever width is left beside the agents.
 *
 * Row geometry (u): three 10u agent tiles, 4u apart, in a 38u row; their lines (a 20u wide SVG
 * whose viewBox is in u, so the pulses stay round) meet at HUB_Y, where the cloud's leftmost lobe is.
 */
const { agents, agentsLabel, hub, cloud, servers, containers, database } = community.visuals
const u = (n) => `calc(var(--u) * ${n})`
const UNIT = 'clamp(3.2px, 1cqw, 4.2px)'
const ROW = 38
const TILE = 10
const LINE_WIDTH = 20
const HUB_Y = 25
const TILE_Y = [5, 19, 33]
// Each line ends a few u inside the boundary, under its fill, which hides the join.
const LINES = TILE_Y.map((y) => `M0 ${y} C${LINE_WIDTH / 2} ${y} ${LINE_WIDTH / 2} ${HUB_Y} ${LINE_WIDTH + 3} ${HUB_Y}`)

/*
 * Pulses: one per line, on one 6 s clock each, offset so they leave the agents one after another.
 * Each travels for the first 40% of its cycle and rests (hidden) for the rest; no ids needed.
 */
const PULSE_CYCLE = 6
const PULSE_OFFSETS = [0.6, 2.6, 4.6]
const PULSE_EASE = '0.45 0 0.25 1'

function Pulse({ path, begin }) {
  return (
    <circle className="edition-pulse" r="1.1" fill="var(--memry-turquoise)" opacity="0">
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
    <div className="@container">
      <div className="flex flex-col" style={{ '--u': UNIT, padding: `${u(7)} ${u(6)} ${u(5)}`, gap: u(5) }}>
        <div className="flex items-center" style={{ height: u(ROW) }}>
          <div className="flex shrink-0 flex-col" style={{ gap: u((ROW - 3 * TILE) / 2) }}>
            {agents.map((monogram) => (
              <span
                key={monogram}
                data-monogram={monogram}
                className="agent-tile agent-tile-light"
                style={{ width: u(TILE), height: u(TILE), borderRadius: u(2.6), fontSize: `max(11px, ${u(3.3)})` }}
              />
            ))}
          </div>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${LINE_WIDTH} ${ROW}`}
            className="shrink-0 overflow-visible"
            style={{ width: u(LINE_WIDTH), height: u(ROW) }}
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
                strokeWidth="0.45"
                strokeLinecap="round"
              />
            ))}
            {!reduced && LINES.map((d, i) => <Pulse key={d} path={d} begin={PULSE_OFFSETS[i]} />)}
          </svg>
          <div className="relative h-full min-w-0 flex-1">{children}</div>
        </div>
        <span className="font-medium text-[#5B6C6F]" style={{ fontSize: `max(12px, ${u(3.2)})` }}>
          {agentsLabel}
        </span>
      </div>
    </div>
  )
}

/** The lowercase brand word under the mark, its last letter in the acorn's orange (as in the Agents diagram). */
function HubWord() {
  return (
    <span
      className="leading-none font-extrabold tracking-[-0.04em] text-[var(--memry-dark)]"
      style={{ fontSize: `max(15px, ${u(4.8)})` }}
    >
      {hub.slice(0, -1)}
      <span className="text-[var(--memry-orange)]">{hub.slice(-1)}</span>
    </span>
  )
}

/** Who holds the boundary, on a small pill across its bottom edge. */
function BoundaryLabel({ children }) {
  return (
    <span
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-[rgba(8,127,134,0.3)] bg-white leading-tight font-semibold whitespace-nowrap text-[var(--memry-dark)]"
      style={{ fontSize: `max(11px, ${u(3.1)})`, padding: `${u(0.7)} ${u(2.8)}` }}
    >
      {children}
    </span>
  )
}

// Drawn at 2:1; it stretches with the boundary, its leftmost lobe at HUB_Y / ROW of its height.
const CLOUD =
  'M40 94 C18 94 3 83 3 66 C3 50 17 41 33 42 C35 22 54 9 77 13 C89 2 115 0 129 12 C144 4 167 13 170 33 C188 36 198 51 196 67 C194 83 180 94 162 94 Z'

/** Memry Cloud: memry inside a cloud that Memry runs. */
export function CloudVisual() {
  return (
    <EditionVisual>
      <div data-boundary="memry" className="absolute inset-0">
        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full drop-shadow-[0_10px_18px_rgba(6,182,212,0.18)]"
          focusable="false"
        >
          <path d={CLOUD} fill="#fff" stroke="var(--memry-teal)" strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: u(1.4), paddingTop: u(5) }}>
          <span className="block text-[var(--memry-dark)]" style={{ width: u(10), height: u(10) }}>
            <TreeMark className="block size-full" />
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
      className={`grid place-items-center rounded-[3px] border ${
        dark
          ? 'border-[var(--memry-dark)] bg-[repeating-linear-gradient(90deg,#0b5560_0_2px,#073b46_2px_5px)] text-[var(--hero-ink)]'
          : 'border-[rgba(8,127,134,0.55)] bg-[repeating-linear-gradient(90deg,#d6eff2_0_2px,#f0fafb_2px_5px)]'
      }`}
      style={{ width: u(11.5), height: u(7.75) }}
    >
      {children}
    </span>
  )
}

/** A small database cylinder: the three ellipse bands every reader knows as "a database". */
function DatabaseGlyph() {
  return (
    <svg viewBox="0 0 24 30" focusable="false" style={{ width: u(8.6), height: u(10.75) }}>
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

const caption = { fontSize: `max(11px, ${u(3.1)})` }

/** Memry Community: memry in a stack of containers, beside its PostgreSQL database, inside your servers. */
export function CommunityVisual() {
  return (
    <EditionVisual>
      <div
        data-boundary="yours"
        className="absolute inset-0 flex items-end justify-center border-[1.5px] border-dashed border-[rgba(8,127,134,0.55)] bg-white"
        style={{ gap: u(5.5), borderRadius: u(3.5), padding: `0 ${u(2)} ${u(6.5)}` }}
      >
        <div data-containers className="flex flex-col items-center" style={{ gap: u(1.4) }}>
          <div className="flex flex-col items-center" style={{ gap: u(0.7) }}>
            <ShippingContainer dark>
              <span className="block" style={{ width: u(5.5), height: u(5.5) }}>
                <TreeMark className="block size-full" />
              </span>
            </ShippingContainer>
            <div className="flex" style={{ gap: u(0.7) }}>
              <ShippingContainer />
              <ShippingContainer />
            </div>
          </div>
          <span className="leading-tight font-semibold text-[var(--memry-dark)]" style={caption}>
            {containers}
          </span>
        </div>
        <div data-database className="flex flex-col items-center" style={{ gap: u(1.4) }}>
          <DatabaseGlyph />
          <span className="leading-tight font-medium text-[#5B6C6F]" style={caption}>
            {database}
          </span>
        </div>
        <BoundaryLabel>{servers}</BoundaryLabel>
      </div>
    </EditionVisual>
  )
}

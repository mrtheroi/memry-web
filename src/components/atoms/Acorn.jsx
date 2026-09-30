/** The acorn: one memory. Decorative only. */
export function AcornShape({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="0" y1="-9" x2="0" y2="-13" stroke="var(--memry-dark)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="0" cy="3" rx="6.5" ry="8" fill="var(--memry-orange)" />
      <path d="M-8 -2.5 Q0 -12 8 -2.5 Q0 0.5 -8 -2.5Z" fill="var(--memry-dark)" />
    </g>
  )
}

export function AcornIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="-10 -14 20 26" className={className}>
      <AcornShape />
    </svg>
  )
}

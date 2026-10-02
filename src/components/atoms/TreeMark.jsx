/*
 * Memory Tree mark: the institutional brand icon for the nav and footer.
 * Trunk and branches use currentColor so the parent sets light or dark ink;
 * turquoise nodes are memories, the orange acorn is a retrieved memory.
 */
export function TreeMark({ className = '' }) {
  return (
    <svg
      data-testid="tree-mark"
      viewBox="0 0 28 28"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d="M14 26.5V12" strokeWidth="2.75" />
      <g strokeWidth="1.75">
        <path d="M14 20Q10 18.5 6 14.5" />
        <path d="M14 18Q18 17 21.5 14" />
        <path d="M14 12.5Q10.5 10.5 7.5 7" />
        <path d="M14 12.5Q17.5 10.5 20.5 7" />
        <path d="M14 12.5V3.5" />
      </g>
      <g fill="var(--memry-turquoise)" stroke="none">
        <circle cx="6" cy="14.5" r="2.5" />
        <circle cx="7" cy="6.5" r="2.5" />
        <circle cx="21" cy="6.5" r="2.5" />
        <circle cx="14" cy="3" r="2.5" />
      </g>
      <ellipse cx="21.5" cy="20.5" rx="2.9" ry="3.4" fill="var(--memry-orange)" stroke="none" />
      <path d="M18.1 18.2Q21.5 13.6 24.9 18.2Q21.5 19.2 18.1 18.2Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

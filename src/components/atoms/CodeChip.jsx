/**
 * Inline command or file name in JetBrains Mono. Long commands wrap (at spaces
 * first, anywhere if needed) so they never push the page wider; `nowrap` keeps
 * short inline chips such as `memry delete-account` from splitting at a hyphen.
 */
export function CodeChip({ children, nowrap = false, className = 'border-[var(--border)] bg-white text-[var(--memry-dark)]' }) {
  return (
    <code
      className={`rounded-lg border px-1.5 py-0.5 font-mono text-sm ${
        nowrap ? 'whitespace-nowrap' : '[overflow-wrap:anywhere]'
      } ${className}`}
    >
      {children}
    </code>
  )
}

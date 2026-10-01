/** Inline command or file name in JetBrains Mono. */
export function CodeChip({ children, className = 'border-[var(--border)] bg-white text-[var(--memry-dark)]' }) {
  return (
    <code className={`rounded-md border px-1.5 py-0.5 font-mono whitespace-nowrap text-[0.85em] ${className}`}>
      {children}
    </code>
  )
}

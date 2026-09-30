/** Inline command or file name in JetBrains Mono. */
export function CodeChip({ children }) {
  return (
    <code className="rounded-md border border-[var(--border)] bg-white px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--memry-dark)]">
      {children}
    </code>
  )
}

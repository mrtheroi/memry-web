import { useEffect, useState } from 'react'

const RESET_AFTER_MS = 2000

export function CopyButton({ text, label, copiedLabel, className = '' }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), RESET_AFTER_MS)
    return () => clearTimeout(id)
  }, [copied])

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span role="status" className="font-mono text-xs text-[var(--hero-ink-muted)]">
        {copied ? copiedLabel : ''}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        title={label}
        className="focus-ring-dark inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-[var(--hero-ink-muted)] transition-colors hover:border-[var(--memry-turquoise)] hover:text-white"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  )
}

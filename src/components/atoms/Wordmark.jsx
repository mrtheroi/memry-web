/** HTML wordmark: "Memr" in the surrounding ink, the final "y" in Memry orange. */
export function Wordmark({ className = '' }) {
  return (
    <span className={`font-extrabold tracking-[-0.04em] ${className}`}>
      Memr<span className="text-[var(--memry-orange)]">y</span>
    </span>
  )
}

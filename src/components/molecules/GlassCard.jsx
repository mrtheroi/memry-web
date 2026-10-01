/** Glass card on the deep navy bands (Outcomes, Security): translucent fill, faint turquoise edge, lifts on hover/focus. */
const shell =
  'flex min-w-0 flex-col rounded-2xl border border-[rgba(6,182,212,0.18)] bg-white/[0.035] p-6 transition-[translate,border-color,box-shadow] duration-200 ease-out hover:border-[rgba(6,182,212,0.5)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_18px_40px_-24px_rgba(6,182,212,0.45)] focus-within:border-[rgba(6,182,212,0.5)] focus-within:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_18px_40px_-24px_rgba(6,182,212,0.45)] motion-safe:hover:-translate-y-[3px] motion-safe:focus-within:-translate-y-[3px] sm:p-7'

/** Glassy chip on the navy: near-white label, translucent navy fill, faint turquoise edge (Agents diagram, Outcomes). */
export const glassChip =
  'border border-[rgba(6,182,212,0.3)] bg-[rgba(3,30,39,0.72)] text-[var(--hero-ink)] backdrop-blur-sm'

/** A list item: optional decorative illustration box, title and body; `children` for anything else. */
export function GlassCard({ illustration, title, body, className = '', children }) {
  return (
    <li data-glass-card className={className ? `${shell} ${className}` : shell}>
      {illustration && (
        <div
          data-illustration
          aria-hidden="true"
          className="flex min-h-28 flex-col justify-center rounded-xl border border-white/10 bg-[rgba(2,24,32,0.55)] px-4 py-3"
        >
          {illustration}
        </div>
      )}
      {title && <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em]">{title}</h3>}
      {body && <p className="mt-2 leading-relaxed text-[var(--hero-ink)]">{body}</p>}
      {children}
    </li>
  )
}

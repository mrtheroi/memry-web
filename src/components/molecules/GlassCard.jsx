const motionLift =
  'transition-[translate,border-color,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-[3px] motion-safe:focus-within:-translate-y-[3px]'

const tones = {
  /** Glass on the deep navy Security band: translucent fill, faint turquoise edge. */
  dark: {
    shell: `flex min-w-0 flex-col rounded-2xl border border-[rgba(6,182,212,0.18)] bg-white/[0.035] p-6 ${motionLift} hover:border-[rgba(6,182,212,0.5)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_18px_40px_-24px_rgba(6,182,212,0.45)] focus-within:border-[rgba(6,182,212,0.5)] focus-within:shadow-[0_0_0_1px_rgba(6,182,212,0.12),0_18px_40px_-24px_rgba(6,182,212,0.45)] sm:p-7`,
    illustration: 'border-white/10 bg-[rgba(2,24,32,0.55)]',
    title: '',
    body: 'text-[var(--hero-ink)]',
  },
  /** Solid white card on light sections: hairline border that turns teal on hover. */
  light: {
    shell: `flex min-w-0 flex-col rounded-2xl border border-[var(--border)] bg-white p-6 ${motionLift} hover:border-[var(--memry-teal)] hover:shadow-[0_16px_32px_-24px_rgba(7,59,70,0.35)] focus-within:border-[var(--memry-teal)] focus-within:shadow-[0_16px_32px_-24px_rgba(7,59,70,0.35)] sm:p-7`,
    illustration: 'border-[var(--border)] bg-[#F6FAFA]',
    title: 'text-[var(--memry-dark)]',
    body: 'text-[var(--text-primary)]',
  },
}

/** Chip on the navy (Agents diagram): near-white label, translucent navy fill, faint turquoise edge. */
export const glassChip = 'border border-[rgba(6,182,212,0.3)] bg-[rgba(3,30,39,0.72)] text-[var(--hero-ink)]'

/** A list item: optional decorative illustration box, title and body; `children` for anything else. */
export function GlassCard({ illustration, title, body, tone = 'dark', className = '', children }) {
  const t = tones[tone]
  return (
    <li data-glass-card data-tone={tone} className={className ? `${t.shell} ${className}` : t.shell}>
      {illustration && (
        <div
          data-illustration
          aria-hidden="true"
          className={`flex min-h-28 flex-col justify-center rounded-xl border px-4 py-3 ${t.illustration}`}
        >
          {illustration}
        </div>
      )}
      {title && <h3 className={`mt-6 text-xl font-semibold tracking-[-0.015em] ${t.title}`}>{title}</h3>}
      {body && <p className={`mt-2 leading-relaxed ${t.body}`}>{body}</p>}
      {children}
    </li>
  )
}

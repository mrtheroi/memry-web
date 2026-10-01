export function SectionHeading({ id, children, dark = false, className = '' }) {
  const color = dark ? 'text-white' : 'text-[var(--memry-dark)]'
  return (
    <h2 id={id} className={`text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] ${color} ${className}`}>
      {children}
    </h2>
  )
}

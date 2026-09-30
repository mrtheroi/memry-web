export function SectionHeading({ id, children, className = '' }) {
  return (
    <h2
      id={id}
      className={`text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--memry-dark)] ${className}`}
    >
      {children}
    </h2>
  )
}

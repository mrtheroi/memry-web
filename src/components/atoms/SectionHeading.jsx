const sizes = {
  // One H2 scale for every section: 32px on phones to 48px on desktop.
  default: 'text-[clamp(2rem,4vw,3rem)] leading-[1.05]',
  // The closing heading, one step larger: up to 56px.
  large: 'text-[clamp(2rem,4.5vw,3.5rem)] leading-[1]',
}

export function SectionHeading({ id, children, dark = false, size = 'default', className = '' }) {
  const color = dark ? 'text-white' : 'text-[var(--memry-dark)]'
  return (
    <h2 id={id} className={`${sizes[size]} font-bold tracking-[-0.03em] ${color} ${className}`}>
      {children}
    </h2>
  )
}

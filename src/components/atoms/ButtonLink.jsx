import { linkProps } from '../../lib/linkProps'

const variants = {
  // On the dark hero: light button, dark ink.
  onDark:
    'focus-ring-dark bg-white text-[var(--memry-dark)] hover:bg-[#E6FAFD]',
  ghostOnDark:
    'focus-ring-dark border border-white/25 text-white hover:border-[var(--memry-turquoise)]',
  // On light sections: dark teal button, white ink.
  primary:
    'focus-ring bg-[var(--memry-dark)] text-white hover:bg-[var(--memry-teal)]',
  secondary:
    'focus-ring border border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--memry-teal)]',
}

export function ButtonLink({ href, variant = 'primary', children, className = '' }) {
  return (
    <a
      {...linkProps(href)}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

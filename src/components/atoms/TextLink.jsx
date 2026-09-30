import { linkProps } from '../../lib/linkProps'

export function TextLink({ href, children, className = '' }) {
  return (
    <a
      {...linkProps(href)}
      className={`focus-ring rounded-sm font-medium text-[var(--memry-teal)] underline decoration-[var(--memry-teal)]/30 underline-offset-4 transition-colors hover:decoration-[var(--memry-teal)] ${className}`}
    >
      {children}
    </a>
  )
}

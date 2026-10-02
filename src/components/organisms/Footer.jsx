import { footer } from '../../content'
import { linkProps } from '../../lib/linkProps'
import { BrandMark } from '../atoms/BrandMark'
import { Container } from '../atoms/Container'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <BrandMark />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  {...linkProps(link.href)}
                  className="focus-ring rounded-lg text-[var(--memry-teal)] underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-[var(--text-muted)]">{footer.copyright}</p>
      </Container>
    </footer>
  )
}

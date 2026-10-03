import { links, nav } from '../../content'
import { linkProps } from '../../lib/linkProps'
import { BrandMark } from '../atoms/BrandMark'

/** Transparent navigation that sits over the dark hero. */
export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <a
        href="#main"
        className="focus-ring-dark sr-only rounded-lg bg-white px-4 py-2 font-semibold text-[var(--memry-dark)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-5 sm:px-8"
      >
        <a href="#top" aria-label="Memry, back to top" className="focus-ring-dark rounded-lg">
          <BrandMark tone="onDark" />
        </a>
        <ul className="flex items-center gap-1 text-base font-medium text-[var(--hero-ink)] sm:gap-2">
          {nav.items.map((item) => (
            <li key={item.href} className={item.fromLg ? 'hidden lg:block' : 'hidden md:block'}>
              <a href={item.href} className="focus-ring-dark rounded-lg px-3 py-2 transition-colors hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              {...linkProps(links.github)}
              className="focus-ring-dark ml-1 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 transition-colors hover:border-[var(--memry-turquoise)] hover:text-white"
            >
              <GitHubIcon />
              {nav.github}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

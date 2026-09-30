# memry-web

The landing page for [memry](https://github.com/mrtheroi/memry-cli), persistent memory for your AI agents.

A single static page built with Vite, React (JavaScript), Tailwind CSS and Motion. Fonts are
self-hosted through Fontsource. The page makes no requests to third parties at runtime: no
analytics, no cookies, no font CDN.

## Develop

```bash
npm install
npm run dev     # local dev server
npm run test    # Vitest + Testing Library
npm run build   # static output in dist/
npm run preview # serve dist/ locally
```

## Where things live

| What | Where |
| --- | --- |
| All page copy and links | `src/content.js` |
| Colors, fonts, focus rings, reduced-motion rules | `src/index.css` |
| Page sections | `src/components/organisms/` |
| Reusable pieces (terminal, copy button, tree) | `src/components/molecules/` |
| Smallest building blocks (links, buttons, wordmark) | `src/components/atoms/` |
| Hero art | `public/hero/` |
| Open Graph image and favicons | `public/` |

To change a sentence, edit `src/content.js`. Components only lay out what it exports.

## Images

- **Hero art.** `public/hero/memry-hero-desktop.webp` (1672×941, plus a 960 px version for
  smaller screens) and `public/hero/memry-hero-mobile.webp` (1122×1402). The art has no text:
  the wordmark and tagline are the page's `h1`, rendered as HTML. The desktop art keeps its
  lower right area empty for that heading; the mobile art sits under it. To replace the art,
  overwrite those files at the same names and aspect ratios (the heading position is set in
  percentages in `src/components/organisms/Hero.jsx`).
- **Memory Tree.** The "How it works" illustration is an inline SVG placeholder in
  `src/components/molecules/MemoryTree.jsx`. Swap the component for the official asset when it
  exists.
- **Open Graph image.** `public/og-image.png` is 1200×630. `index.html` points to it with an
  absolute URL on `https://memry.com.mx/`, so update the tags if the domain changes.

## Accessibility notes

- Turquoise `#06B6D4` and orange `#F97316` fail contrast as text on the light background, so they
  are used only for decoration there. Links use teal `#087F86`; buttons use white on dark teal.
- Motion is limited to the hero entrance and the tree drawing itself once. Both are skipped when
  the visitor prefers reduced motion (`src/hooks/usePrefersReducedMotion.js`).

## License

[MIT](LICENSE) © 2026 Cesar Valero

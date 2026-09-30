import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * True when the visitor asked the OS to reduce motion.
 * Components use it to skip non-essential animation.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

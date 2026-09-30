import mascot from '../../assets/mascot.webp'
import { Wordmark } from './Wordmark'

/** Mascot + wordmark, used in the navigation and footer. */
export function BrandMark({ tone = 'dark', className = '' }) {
  const ink = tone === 'onDark' ? 'text-white' : 'text-[var(--memry-dark)]'
  return (
    <span className={`inline-flex items-center gap-2 ${ink} ${className}`}>
      <img src={mascot} alt="" width="36" height="36" className="h-9 w-9" />
      <Wordmark className="text-xl" />
    </span>
  )
}

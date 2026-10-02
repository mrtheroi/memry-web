import { TreeMark } from './TreeMark'
import { Wordmark } from './Wordmark'

/** Memory Tree mark + wordmark, used in the navigation and footer. */
export function BrandMark({ tone = 'dark', className = '' }) {
  const ink = tone === 'onDark' ? 'text-white' : 'text-[var(--memry-dark)]'
  return (
    <span className={`inline-flex items-center gap-2 ${ink} ${className}`}>
      <TreeMark className="h-7 w-7" />
      <Wordmark className="text-xl" />
    </span>
  )
}

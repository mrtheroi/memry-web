import { CodeChip } from './CodeChip'

/** Renders copy where `backticked` segments are commands or file names. */
export function CodeText({ children, chipClassName }) {
  return children
    .split('`')
    .map((part, i) => (i % 2 === 1 ? <CodeChip key={i} className={chipClassName}>{part}</CodeChip> : part))
}

import { Fragment } from 'react'

/**
 * Presentational terminal: prompts in light ink, success lines with a turquoise check,
 * and multiselect questions (`{ question, choices }`) with filled boxes for selected choices.
 * `action` renders in the title bar (e.g. a copy button).
 */
export function Terminal({ commands, output = [], title = 'Terminal', action = null }) {
  return (
    <figure
      aria-label={`${title}: installing and setting up memry`}
      className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--terminal-bg)] text-left shadow-[0_24px_60px_-30px_rgba(3,30,39,0.7)]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5">
        <span className="font-mono text-xs text-[var(--hero-ink-muted)]">~/my-project</span>
        {action}
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-5 sm:whitespace-pre font-mono text-[13px] leading-7 text-[var(--hero-ink)] sm:text-sm">
        <code>
          {commands.map((command) => (
            <span key={command} className="block">
              <span className="select-none text-[var(--hero-ink-muted)]">$ </span>
              {command}
            </span>
          ))}
          {output.map((line) =>
            typeof line === 'string' ? (
              <span key={line} className="block text-[var(--hero-ink-muted)]">
                <span className="text-[var(--memry-turquoise)]">✓</span> {line}
              </span>
            ) : (
              <Choice key={line.question} {...line} />
            ),
          )}
        </code>
      </pre>
    </figure>
  )
}

function Choice({ question, choices }) {
  return (
    <span className="block">
      <span className="block">
        <span className="text-[var(--memry-orange)]">?</span> {question}
      </span>
      <span className="block pl-4 text-[var(--hero-ink-muted)]">
        {choices.map(({ label, selected }, i) => (
          <Fragment key={label}>
            <span className="whitespace-nowrap">
              <span className={selected ? 'text-[var(--memry-turquoise)]' : ''}>{selected ? '◼' : '◻'}</span>{' '}
              <span className={selected ? 'text-[var(--hero-ink)]' : ''}>{label}</span>
            </span>
            {i < choices.length - 1 && '  '}
          </Fragment>
        ))}
      </span>
    </span>
  )
}

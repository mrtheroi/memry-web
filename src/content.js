// All page copy lives here so it can be edited without touching components.

export const links = {
  github: 'https://github.com/mrtheroi/memry-cli',
  privacy: 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.md',
  privacyEs: 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.es.md',
  license: 'https://github.com/mrtheroi/memry-cli/blob/main/LICENSE',
}

export const nav = {
  items: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Get started', href: '#get-started' },
    { label: 'Privacy', href: '#privacy' },
  ],
  github: 'GitHub',
}

export const hero = {
  // The wordmark "Memry" is rendered by the Wordmark atom.
  taglineLead: 'Persistent memory for your',
  taglineAccent: 'AI agents.',
  // Accessible name for the temporary artwork, which has the wordmark baked in.
  imageAlt:
    'The Memry squirrel holding a glowing orange acorn, with ribbons of turquoise and orange light flowing from it.',
  primaryCta: { label: 'Get started', href: '#get-started' },
  secondaryCta: { label: 'GitHub', href: links.github },
}

export const intro = {
  heading: 'Your project remembers.',
  body: 'Keep project context across sessions and retrieve only what matters.',
  benefit: 'Less repeated context. Fewer tokens. Better continuity.',
}

export const howItWorks = {
  heading: 'How it works',
  lead: 'Decisions, bug fixes and discoveries saved in one session are there in the next one, so you stop explaining the same context again.',
  steps: [
    {
      title: 'Install with Homebrew',
      body: 'One formula from the memry tap. No server to run.',
      code: 'brew install mrtheroi/tap/memry',
    },
    {
      title: 'Run memry setup',
      body: 'Log in with a 6-digit code sent to your email, then choose the agents you use. Setup connects memry to each one, with the agents it finds already selected.',
      code: 'memry setup',
    },
    {
      title: 'Start a session',
      body: 'Every session starts with the recent memories of your project, in every agent. Claude Code loads them automatically through its SessionStart hook; the other agents fetch them when a session starts.',
    },
    {
      title: 'Let your agent remember',
      body: 'As it works, your agent saves decisions, bug fixes and discoveries, and searches them when they matter again.',
    },
  ],
  projects: {
    heading: 'One project, several repositories',
    body: 'By default a project is its directory name. To group repositories into one project, such as the backend and frontend of one product, add a .memry.json file at the root of each one.',
    code: '{"project": "memry"}',
    filename: '.memry.json',
  },
  treeCaption:
    'Each acorn is a memory. Together they grow into what your project knows.',
}

export const agents = {
  heading: 'One memory, every agent',
  body: 'memry works with Claude Code, Codex, OpenCode, Antigravity and Windsurf. Every agent reads and saves the same project memory, so a decision saved in Claude Code is there when you open Codex, and the other way around.',
  listLabel: 'Supported agents',
  list: ['Claude Code', 'Codex', 'OpenCode', 'Antigravity', 'Windsurf'],
  hub: 'memry',
  memory: 'Your project memory',
  diagramNote:
    'memry setup asks which agents you use and connects each one. memry uninstall removes it from all of them.',
}

export const why = {
  heading: 'Why memry',
  items: [
    {
      title: 'Switch agents, keep the context',
      body: 'Claude Code, Codex, OpenCode, Antigravity and Windsurf share one memory. Start in one, continue in another.',
    },
    {
      title: 'Across machines and projects',
      body: 'memry is hosted, so there is no server to run. Your memories follow your account, and a new laptop picks up the same context.',
    },
    {
      title: 'One command to uninstall',
      body: 'memry uninstall removes memry from every agent you set up and deletes your local login.',
      code: 'memry uninstall',
    },
    {
      title: 'Delete your account anytime',
      body: 'memry delete-account permanently deletes your account and every memory on the server.',
      code: 'memry delete-account',
    },
  ],
}

export const getStarted = {
  heading: 'Get started',
  lead: 'Two commands, then start a new session in any of your agents.',
  commands: ['brew install mrtheroi/tap/memry', 'memry setup'],
  output: [
    'Logged in as you@example.com',
    {
      question: 'Which agents do you use?',
      choices: [
        { label: 'Claude Code', selected: true },
        { label: 'Codex', selected: true },
        { label: 'OpenCode', selected: false },
        { label: 'Antigravity', selected: true },
        { label: 'Windsurf', selected: false },
      ],
    },
    'Claude Code: memry is set up',
    'Codex: memry is set up',
    'Antigravity: memry is set up',
  ],
  copyLabel: 'Copy install commands',
  copiedLabel: 'Copied',
  requirements: 'Requires macOS or Linux, Homebrew and at least one supported agent.',
  beta: 'Free public beta.',
}

export const privacy = {
  heading: 'Your memories stay yours',
  commitments: [
    'We do not sell your data or share it with advertisers.',
    'Your memories are never used to train AI models.',
    'We do not read your memories, unless you ask us to help with a problem or the law requires it.',
    'If we change how your data is used, we email you before it applies.',
  ],
  note: 'This site has no tracking, analytics or cookies.',
  policyLabel: 'Read the privacy policy',
  policyEsLabel: 'Versión en español',
}

export const footer = {
  links: [
    { label: 'GitHub', href: links.github },
    { label: 'Privacy policy', href: links.privacy },
    { label: 'MIT licensed', href: links.license },
  ],
  copyright: '© 2026 Cesar Valero',
}

// All page copy lives here so it can be edited without touching components.

export const links = {
  github: 'https://github.com/mrtheroi/memry-cli',
  privacy: 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.md',
  privacyEs: 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.es.md',
  license: 'https://github.com/mrtheroi/memry-cli/blob/main/LICENSE',
  claudeCode: 'https://docs.anthropic.com/en/docs/claude-code',
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
      body: 'Log in with a 6-digit code sent to your email. Setup registers the memry MCP server in Claude Code and adds a SessionStart hook.',
      code: 'memry setup',
    },
    {
      title: 'Start a session',
      body: 'Every new, resumed or compacted session starts with the recent memories of your project, so Claude picks up where you left off.',
    },
    {
      title: 'Let your agent remember',
      body: 'As it works, Claude saves decisions, bug fixes and discoveries, and searches them when they matter again.',
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

export const builtFor = {
  heading: 'Built for Claude Code',
  body: 'memry plugs into Claude Code as an MCP server and a SessionStart hook. Claude gets tools to save and search memories, and every session opens with your project’s context.',
  linkLabel: 'About Claude Code',
  connections: ['MCP server', 'SessionStart hook'],
  diagramNote:
    'Save and search memories while you work. Load your project’s context when a session starts.',
}

export const why = {
  heading: 'Why memry',
  items: [
    {
      title: 'No server to run',
      body: 'memry is hosted. Install the CLI, log in, and you are done.',
    },
    {
      title: 'Across machines and projects',
      body: 'Your memories follow your account, so a new laptop picks up the same context.',
    },
    {
      title: 'One command to uninstall',
      body: 'memry uninstall removes memry from Claude Code and deletes your local login.',
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
  lead: 'Two commands, then start a new Claude Code session.',
  commands: ['brew install mrtheroi/tap/memry', 'memry setup'],
  output: [
    'Logged in as you@example.com',
    'Registered the memry MCP server in Claude Code',
    'Installed the memry SessionStart hook',
  ],
  copyLabel: 'Copy install commands',
  copiedLabel: 'Copied',
  requirements: 'Requires macOS or Linux, Homebrew and Claude Code.',
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

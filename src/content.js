// All page copy lives here so it can be edited without touching components.

export const links = {
  github: 'https://github.com/mrtheroi/memry-cli',
  docs: 'https://github.com/mrtheroi/memry-cli#readme',
  privacy: 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.md',
  privacyEs: 'https://github.com/mrtheroi/memry-cli/blob/main/PRIVACY.es.md',
  license: 'https://github.com/mrtheroi/memry-cli/blob/main/LICENSE',
  changelog: 'https://github.com/mrtheroi/memry-cli/blob/main/CHANGELOG.md',
  releases: 'https://github.com/mrtheroi/memry-cli/releases',
  security: 'mailto:mrtheroi@gmail.com',
}

export const nav = {
  items: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Get started', href: '#get-started' },
    { label: 'Privacy', href: '#security' },
    { label: 'FAQ', href: '#faq' },
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
  hook: "Your agents forget. Your project shouldn't.",
  primaryCta: { label: 'Get started', href: '#get-started' },
  betaNote: 'Free during the public beta.',
  secondaryCta: { label: 'View on GitHub', href: links.github },
}

export const problem = {
  heading: 'Every session starts from zero.',
  body: 'You explain the architecture. The decisions. The bug you fixed last week. Then the session ends, and tomorrow you explain it all again. Your agents are brilliant, but they have no memory.',
  closing: 'Memry gives your project one.',
  illustration: {
    description:
      'Three sessions, Monday to Wednesday, where the same context is explained again each day. Then a Memry session that starts with the context already loaded.',
    scenes: [
      {
        sessions: [
          { day: 'Monday', prompt: 'Let me explain the architecture again…' },
          { day: 'Tuesday', prompt: 'As I said yesterday, we use…' },
          { day: 'Wednesday', prompt: '…and again: the auth flow works like…' },
        ],
        memories: ['Decision: Postgres full-text search', 'Fixed: login code email', 'Convention: one topic per memory'],
      },
      {
        sessions: [
          { day: 'Monday', prompt: 'Again, we deploy with Docker…' },
          { day: 'Tuesday', prompt: 'Reminder: never push to main directly…' },
          { day: 'Wednesday', prompt: '…and staging uses its own database' },
        ],
        memories: ['Config: deploy with Docker', 'Decision: PRs only, no direct pushes', 'Config: separate staging database'],
      },
      {
        sessions: [
          { day: 'Monday', prompt: 'Remember the API returns 422 when…' },
          { day: 'Tuesday', prompt: 'Validation happens before saving…' },
          { day: 'Wednesday', prompt: '…and errors use the same JSON shape' },
        ],
        memories: ['Convention: validate before saving', 'Decision: one JSON error shape', 'Fixed: 422 on duplicate emails'],
      },
    ],
    memry: {
      name: 'memry',
      status: 'Context loaded',
    },
  },
}

export const outcomes = {
  heading: 'What changes with Memry',
  items: [
    {
      title: 'Pick up where you left off.',
      body: 'Every session opens with the decisions, fixes and conventions that matter for this project. No warm-up.',
    },
    {
      title: 'Switch agents, keep the context.',
      body: 'Start a task in one agent and finish it in another. The memory follows the project, not the tool.',
    },
    {
      title: 'Spend tokens on work, not repetition.',
      body: 'Memry loads a compact summary first and fetches the details only when they matter.',
    },
  ],
  visuals: {
    restored: {
      status: 'Session restored',
      lines: ['Decision: one JSON error shape', 'Fixed: login code email', 'Convention: validate before saving'],
    },
    // Monogram tiles of two agents (see agents.monograms); no names, the card title carries the idea.
    agents: ['CC', 'Cx'],
    tokens: { repeated: 're-explaining', summary: 'Memry summary' },
  },
}

export const howItWorks = {
  heading: 'How it works',
  lead: 'Decisions, bug fixes and discoveries saved in one session are there in the next one, so you stop explaining the same context again.',
  steps: [
    {
      title: 'Install in seconds.',
      code: 'brew install mrtheroi/tap/memry',
    },
    {
      title: 'Connect your agents.',
      body: '`memry setup` logs you in with an email code and wires every agent you choose.',
    },
    {
      title: 'Work. Memry remembers.',
      body: 'Your agents save what matters as they go, and every new session starts with it.',
    },
  ],
  stepsLabel: 'Steps',
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
  heading: 'Five agents. One memory.',
  body: "A decision saved in one agent is waiting for you in the next. Switch tools whenever you want; your project's context comes with you.",
  listLabel: 'Supported agents',
  list: ['Claude Code', 'Codex', 'OpenCode', 'Antigravity', 'Windsurf'],
  // Lettered tiles shown before each name, in the same order as `list` (no logos).
  monograms: ['CC', 'Cx', 'OC', 'AG', 'WS'],
  hub: 'memry',
  memory: 'Your project',
  files: [
    { kind: 'branch', name: 'main' },
    { kind: 'folder', name: 'src/' },
    { kind: 'file', name: 'README.md' },
    { kind: 'file', name: '.memry.json' },
  ],
  diagramNote: '`memry setup` asks which agents you use and connects each one.',
}

export const useCases = {
  heading: 'Built for the way you actually work',
  items: [
    {
      title: 'Long-running projects.',
      body: 'Weeks of decisions stay available, not buried in old chats.',
    },
    {
      title: 'Bugs that take days.',
      body: 'What you tried, what failed and what finally fixed it carry over to the next session.',
    },
    {
      title: 'Coming back after a break.',
      body: 'Monday morning, or after vacation: your agent already knows where you were.',
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
  nextLabel: 'Next steps',
  docsCta: { label: 'Read the docs', href: links.docs },
  githubCta: { label: 'View on GitHub', href: links.github },
}

export const project = {
  label: 'Project',
  // Static on purpose (no API calls from the page): update on each release.
  release: 'Latest release: v0.5.0',
  links: [
    { label: 'Docs', href: links.docs },
    { label: 'Changelog', href: links.changelog },
    { label: 'Releases', href: links.releases },
    { label: 'Source', href: links.github },
  ],
}

export const security = {
  heading: 'Built to be trusted with your work.',
  items: [
    {
      title: 'Your token stays with you.',
      body: "It never lands in your agents' config files.",
    },
    {
      title: 'No passwords.',
      body: 'One-time email codes that expire in 5 minutes.',
    },
    {
      title: 'Your memories are yours.',
      body: "Never used to train AI models. We don't read them unless you ask us to help or the law requires it.",
    },
    {
      title: 'Leave anytime.',
      body: '`memry uninstall` removes Memry from every agent; `memry delete-account` erases everything.',
    },
    {
      title: 'Open source.',
      body: 'MIT licensed. No tracking, no cookies.',
    },
  ],
  visuals: {
    token: {
      config: ['command = ".../memry"', 'args = ["mcp"]'],
      chip: 'token',
      path: '~/.config/memry',
    },
    codes: { expires: 'expires in 5:00' },
    memories: { label: 'not used for training' },
    leave: { command: 'memry delete-account', done: 'Deleted' },
    open: { badge: 'MIT', note: 'no tracking · no cookies' },
    policy: { title: 'Privacy policy', languages: ['EN', 'ES'] },
  },
  policyLabel: 'Read the privacy policy',
  policyEsLabel: 'Versión en español',
}

export const faq = {
  heading: 'Questions, answered.',
  // `link.label` must appear verbatim in `answer`; that phrase becomes the link.
  items: [
    {
      question: 'Is Memry free?',
      answer: "Yes, during the public beta. Pricing after the beta hasn't been decided yet.",
    },
    {
      question: 'Which agents does it work with?',
      answer:
        'Claude Code, Codex, OpenCode, Antigravity and Windsurf. `memry setup` asks which ones you use and connects each of them.',
    },
    {
      question: 'Where are my memories stored?',
      answer: "On Memry's infrastructure, tied to your account and protected in transit with HTTPS.",
    },
    {
      question: 'What does Memry store?',
      answer:
        "Your email, and the memories and prompts your agents choose to save. Don't let them save passwords or API keys. See the privacy policy.",
      link: { label: 'privacy policy', href: links.privacy },
    },
    {
      question: 'Do you use my memories to train AI models?',
      answer: "No. And we don't read them unless you ask us to help or the law requires it.",
    },
    {
      question: 'Does it work offline?',
      answer:
        "No. Your agents need to reach the Memry server to load and save memories. If it can't be reached, the session simply starts without the memory context.",
    },
    {
      question: 'How do I remove it?',
      answer:
        '`memry uninstall` removes Memry from every agent and revokes your token on this machine. `memry delete-account` permanently deletes your account and every memory.',
    },
    {
      question: 'Who builds Memry?',
      answer: 'Cesar Valero, in Mexico. Memry is open source under the MIT license.',
    },
    {
      question: 'How do I report a security issue?',
      answer: 'Email mrtheroi@gmail.com.',
      link: { label: 'mrtheroi@gmail.com', href: links.security },
    },
  ],
}

export const closing = {
  heading: 'Give your project a memory.',
  line: 'Two commands. Every agent.',
  docsCta: { label: 'Read the docs', href: links.docs },
  githubCta: { label: 'View on GitHub', href: links.github },
}

export const footer = {
  links: [
    { label: 'GitHub', href: links.github },
    { label: 'Docs', href: links.docs },
    { label: 'Changelog', href: links.changelog },
    { label: 'Privacy policy', href: links.privacy },
    { label: 'Security', href: links.security },
    { label: 'MIT licensed', href: links.license },
  ],
  copyright: '© 2026 Cesar Valero',
}

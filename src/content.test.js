import { describe, expect, it } from 'vitest'
import { problem } from './content'

describe('problem illustration scenes', () => {
  it('has three scenes, each with Monday to Wednesday prompts and three memories', () => {
    const { scenes } = problem.illustration

    expect(scenes).toHaveLength(3)
    scenes.forEach((scene) => {
      expect(scene.sessions.map((session) => session.day)).toEqual(['Monday', 'Tuesday', 'Wednesday'])
      scene.sessions.forEach((session) => expect(session.prompt).toEqual(expect.any(String)))
      expect(scene.memories).toHaveLength(3)
      scene.memories.forEach((memory) => expect(memory).toEqual(expect.any(String)))
    })
  })
})

describe('product name casing', () => {
  // Fields that hold commands, code, file contents or the lowercase wordmark logo.
  const codeKeys = new Set(['commands', 'output', 'code', 'filename', 'config', 'path', 'command', 'hub', 'files', 'name'])
  const prose = (value, key = '') => {
    if (codeKeys.has(key)) return []
    if (typeof value === 'string') return [value.split('`').filter((_, i) => i % 2 === 0).join(' ')]
    if (Array.isArray(value)) return value.flatMap((v) => prose(v))
    if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => prose(v, k))
    return []
  }

  it('writes the product as "Memry" in prose, keeping lowercase memry for commands and code', async () => {
    const content = await import('./content')
    const { links, ...copy } = content
    const lowercase = prose(copy).filter((text) => /(^|[^.\w/~-])memry\b/.test(text))

    expect(lowercase).toEqual([])
  })

  it('closes the Problem section with "Memry gives your project one."', () => {
    expect(problem.closing).toBe('Memry gives your project one.')
  })
})

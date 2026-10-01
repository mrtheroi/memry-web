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

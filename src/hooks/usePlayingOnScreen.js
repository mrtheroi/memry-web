import { useEffect } from 'react'

/**
 * Marks an svg as playing only while it is on screen (data-playing, for CSS animations)
 * and pauses its SMIL clock off-screen where the browser supports it.
 */
export function usePlayingOnScreen(ref, enabled) {
  useEffect(() => {
    if (!enabled) return undefined
    const svg = ref.current
    const play = (playing) => {
      svg.dataset.playing = String(playing)
      if (typeof svg.pauseAnimations === 'function') (playing ? svg.unpauseAnimations() : svg.pauseAnimations())
    }
    play(false)
    const observer = new IntersectionObserver(([entry]) => play(entry.isIntersecting))
    observer.observe(svg)
    return () => observer.disconnect()
  }, [ref, enabled])
}

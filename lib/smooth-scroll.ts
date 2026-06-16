import type Lenis from 'lenis'

// Shared reference so navigation / transitions can control the scroll position.
export const lenisRef: { current: Lenis | null } = { current: null }

export function scrollToTop(immediate = true) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(0, { immediate })
  } else if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function setLenisStopped(stopped: boolean) {
  if (!lenisRef.current) return
  if (stopped) lenisRef.current.stop()
  else lenisRef.current.start()
}

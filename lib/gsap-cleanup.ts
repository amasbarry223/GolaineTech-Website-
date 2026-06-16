import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { markGsapScenario } from '@/lib/gsap-diagnostics'

/** Kill all ScrollTriggers and restore pinned DOM before React unmounts. */
export function destroyScrollTriggers() {
  if (typeof window === 'undefined') return

  markGsapScenario('navigation')

  const triggers = ScrollTrigger.getAll()
  if (!triggers.length) return

  triggers.forEach((st) => {
    try {
      st.kill(true)
    } catch {
      // Pin spacer may already be restored by matchMedia/useGSAP revert.
    }
  })

  ScrollTrigger.clearScrollMemory()
}

'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Recalculate ScrollTrigger positions after route changes. */
export function ScrollTriggerRouteCleanup() {
  const pathname = usePathname()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}

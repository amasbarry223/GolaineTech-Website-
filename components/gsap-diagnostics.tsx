'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  markGsapScenario,
  reportGsapDomError,
} from '@/lib/gsap-diagnostics'

/** Dev-only: trace which user action preceded a GSAP/React DOM conflict. */
export function GsapDiagnostics() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let scrollTimer: ReturnType<typeof setTimeout> | undefined

    const onScroll = () => {
      markGsapScenario('scroll')
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => markGsapScenario('idle'), 500)
    }

    const onResize = () => {
      markGsapScenario('resize')
    }

    const onError = (event: ErrorEvent) => {
      const message = event.message ?? ''
      if (!message.includes('removeChild')) return

      const triggers = ScrollTrigger.getAll()
      const pinned = triggers.some((st) => st.isActive && Boolean(st.pin))

      reportGsapDomError(new Error(message), {
        pathname,
        scrollY: window.scrollY,
        pinned,
        triggerCount: triggers.length,
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('error', onError)

    return () => {
      clearTimeout(scrollTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('error', onError)
    }
  }, [pathname])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    markGsapScenario('navigation')
    const timer = setTimeout(() => markGsapScenario('idle'), 1200)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

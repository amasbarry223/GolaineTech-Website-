'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'

/**
 * Pinned horizontal scroll section.
 * Layout is CSS-only (no JS breakpoint swap) so React never remounts the
 * pinned <section>. GSAP matchMedia owns desktop scroll + pin lifecycle.
 */
export function HorizontalScroll({
  intro,
  items,
}: {
  intro: React.ReactNode
  items: React.ReactNode[]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const track = trackRef.current
          const section = sectionRef.current
          if (!track || !section) return

          gsap.set(track, { clearProps: 'transform' })

          const getAmount = () => track.scrollWidth - window.innerWidth + 96

          gsap.to(track, {
            x: () => -getAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getAmount()}`,
              pin: true,
              scrub: 1,
              snap: {
                snapTo: 1 / Math.max(items.length, 1),
                duration: { min: 0.15, max: 0.35 },
                delay: 0.05,
              },
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onToggle: (self) => {
                if (process.env.NODE_ENV === 'development' && self.isActive) {
                  import('@/lib/gsap-diagnostics').then(({ markGsapScenario }) => {
                    markGsapScenario('pin-active')
                  })
                }
              },
            },
          })
        },
        sectionRef,
      )

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [items.length], revertOnUpdate: true },
  )

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-20 md:h-screen md:overflow-hidden md:px-0 md:py-0"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-10 md:h-full md:flex-row md:items-center md:gap-5 md:px-12 md:will-change-transform"
      >
        <div className="relative z-10 mb-12 md:mb-0 md:flex md:h-full md:w-[26vw] md:shrink-0 md:flex-col md:justify-center md:pr-6">
          {intro}
        </div>
        {items.map((item, i) => (
          <div key={i} className="md:w-[52vw] md:shrink-0">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

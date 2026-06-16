'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from 'motion/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { cn } from '@/lib/utils'
import { usePreloaderReady } from '@/components/preloader-context'

type GsapRevealTextProps = {
  text: string
  className?: string
  id?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  by?: 'word' | 'line'
  /** Reveal on mount (hero) instead of scroll */
  immediate?: boolean
  /** ScrollTrigger start — défaut plus permissif pour sections pinnées */
  scrollStart?: string
}

export function GsapRevealText({
  text,
  className,
  id,
  as: Tag = 'span',
  delay = 0,
  by = 'word',
  immediate: immediateProp,
  scrollStart = 'top bottom',
}: GsapRevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const preloaderReady = usePreloaderReady()
  const shouldReduceMotion = useReducedMotion()
  const immediate = immediateProp ?? false

  useGSAP(
    () => {
      if (shouldReduceMotion) return

      registerGsapPlugins()
      const root = ref.current
      if (!root) return

      const parts = root.querySelectorAll<HTMLElement>('[data-reveal-part]')
      if (!parts.length) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(parts, { yPercent: 110 })

        const animateIn = () => {
          gsap.to(parts, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.08,
            delay,
            ease: 'power3.out',
          })
        }

        if (immediate) {
          const run = () => animateIn()

          if (preloaderReady || sessionStorage.getItem('golaine-preloaded')) {
            run()
          } else {
            window.addEventListener('golaine:preloader-done', run, { once: true })
            return () => window.removeEventListener('golaine:preloader-done', run)
          }
        } else {
          gsap.to(parts, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.08,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root,
              start: scrollStart,
              once: true,
            },
          })
        }
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [preloaderReady, immediate, delay, text, shouldReduceMotion, scrollStart] },
  )

  const pieces = by === 'line' ? text.split('\n') : text.split(' ')

  if (shouldReduceMotion) {
    const Plain = Tag
    return (
      <Plain ref={ref as never} id={id} className={cn(className)}>
        {text}
      </Plain>
    )
  }

  return (
    <Tag ref={ref as never} id={id} className={cn(className)}>
      {pieces.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className={cn(
            'overflow-hidden',
            by === 'line'
              ? 'block leading-[1.08] pb-[0.08em]'
              : 'inline-block align-bottom',
          )}
        >
          <span data-reveal-part className="inline-block will-change-transform">
            {part}
            {by === 'word' && i < pieces.length - 1 ? '\u00a0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}

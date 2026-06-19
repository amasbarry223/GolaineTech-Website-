'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/smooth-scroll'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!canHover.matches || prefersReducedMotion()) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor]',
      ) as HTMLElement | null
      if (target) {
        setHovering(true)
        setLabel(target.getAttribute('data-cursor') || '')
      } else {
        setHovering(false)
        setLabel('')
      }
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15
      ring.y += (pos.y - ring.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot — position exacte, pas de lag */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      />
      {/* Ring — scale uniquement, zéro layout reflow */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-[17px] -mt-[17px] flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-full border"
        style={{
          transform: 'translate3d(0,0,0)',
          scale: hovering ? 1.88 : 1,
          transition: 'scale 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.25s ease, border-color 0.25s ease',
          backgroundColor: label ? 'var(--accent)' : 'transparent',
          borderColor: label ? 'var(--accent)' : 'rgba(245,245,242,0.4)',
          willChange: 'transform',
        }}
      >
        {label ? (
          <span
            className="text-[8px] font-medium uppercase tracking-widest text-background"
            style={{
              opacity: hovering ? 1 : 0,
              transition: 'opacity 0.2s ease',
              scale: hovering ? `${1 / 1.88}` : '1',
            }}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  )
}

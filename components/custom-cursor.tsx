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
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-foreground/40 transition-[width,height,background-color] duration-300 ease-out"
        style={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          marginLeft: hovering ? -32 : -17,
          marginTop: hovering ? -32 : -17,
          backgroundColor: label ? 'var(--accent)' : 'transparent',
          borderColor: label ? 'var(--accent)' : 'rgba(245,245,242,0.4)',
        }}
      >
        {label ? (
          <span className="text-[10px] font-medium uppercase tracking-widest text-background">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  )
}

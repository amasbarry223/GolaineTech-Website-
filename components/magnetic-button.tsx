'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import { useTransition } from '@/components/page-transition'

type MagneticButtonProps = {
  children: React.ReactNode
  href?: string
  label?: string
  onClick?: () => void
  className?: string
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit'
}

const sharedClass = (variant: 'solid' | 'outline', className?: string) =>
  cn(
    'group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest transition-colors focus-ring',
    variant === 'solid'
      ? 'bg-accent text-background hover:bg-accent-2'
      : 'border border-foreground/20 text-foreground hover:border-accent hover:text-accent',
    className,
  )

export function MagneticButton({
  children,
  href,
  label,
  onClick,
  className,
  variant = 'solid',
  type = 'button',
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { navigate } = useTransition()
  const shouldReduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const getRect = () =>
    (anchorRef.current ?? buttonRef.current)?.getBoundingClientRect()

  const handleMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return
    const rect = getRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.4)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.4)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const motionStyle = shouldReduceMotion ? undefined : { x: sx, y: sy }

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={(e) => {
          if (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.button !== 0
          ) {
            return
          }
          e.preventDefault()
          navigate(href, label)
        }}
        style={motionStyle}
        data-cursor={label}
        className={sharedClass(variant, className)}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={motionStyle}
      data-cursor={label}
      className={sharedClass(variant, className)}
    >
      {children}
    </motion.button>
  )
}

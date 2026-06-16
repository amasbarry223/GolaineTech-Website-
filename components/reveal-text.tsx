'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type RevealTextProps = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  /** split by 'word' (default) or 'line' (split on \n) */
  by?: 'word' | 'line'
  /** Play on mount (hero post-preloader) instead of whileInView */
  immediate?: boolean
}

const container = (delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: delay },
  },
})

const child = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function RevealText({
  text,
  className,
  as = 'span',
  delay = 0,
  by = 'word',
  immediate = false,
}: RevealTextProps) {
  const Tag = motion[as]
  const parts = by === 'line' ? text.split('\n') : text.split(' ')
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  return (
    <Tag
      className={cn('inline-block', className)}
      variants={container(delay)}
      initial="hidden"
      animate={immediate ? 'visible' : undefined}
      whileInView={immediate ? undefined : 'visible'}
      viewport={immediate ? undefined : { once: true, margin: '-10%' }}
    >
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className={cn(
            'overflow-hidden',
            by === 'line'
              ? 'block leading-[1.08] pb-[0.08em]'
              : 'relative inline-block align-bottom',
          )}
        >
          <motion.span variants={child} className="inline-block">
            {part}
            {by === 'word' && i < parts.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

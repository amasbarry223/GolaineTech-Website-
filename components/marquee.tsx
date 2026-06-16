'use client'

import { cn } from '@/lib/utils'

export function Marquee({
  items,
  className,
  duration = 30,
}: {
  items: string[]
  className?: string
  duration?: number
}) {
  return (
    <div className={cn('relative flex w-full overflow-hidden', className)}>
      {/* Static text for screen readers */}
      <span className="sr-only">{items.join(' — ')}</span>

      {/* Animated visual — hidden from screen readers */}
      <div
        aria-hidden="true"
        className="flex shrink-0 animate-marquee items-center"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap">{item}</span>
            <span className="mx-8 text-accent">—</span>
          </span>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { prefersReducedMotion } from '@/lib/smooth-scroll'

export function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('golaine-preloaded')) {
      setDone(true)
      window.dispatchEvent(new CustomEvent('golaine:preloader-done'))
      return
    }
    if (prefersReducedMotion()) {
      sessionStorage.setItem('golaine-preloaded', '1')
      setDone(true)
      window.dispatchEvent(new CustomEvent('golaine:preloader-done'))
      return
    }

    const start = performance.now()
    const duration = 1800
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          sessionStorage.setItem('golaine-preloaded', '1')
          setDone(true)
          window.dispatchEvent(new CustomEvent('golaine:preloader-done'))
        }, 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-start justify-between bg-background px-6 pb-8 pt-8 md:px-12 md:pb-12 md:pt-12"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex w-full items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Chargement
            </span>
            <span className="font-mono text-sm tabular-nums text-accent">
              {count}
              <span className="text-muted-foreground">%</span>
            </span>
          </div>

          <div>
            <span className="block font-heading text-[14vw] leading-[0.88] tracking-tight text-foreground md:text-[7.5vw]">
              Golaine
            </span>
            <span className="block font-heading text-[14vw] leading-[0.88] tracking-tight text-accent md:text-[7.5vw]">
              Tech
            </span>
          </div>

          <div className="flex w-full items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              Bamako, Mali
            </span>
            <motion.div
              className="h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              style={{ maxWidth: '200px' }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

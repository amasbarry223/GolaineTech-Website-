'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { prefersReducedMotion } from '@/lib/smooth-scroll'

const EASE_EXPO = [0.76, 0, 0.24, 1] as const
const EASE_SOFT = [0.22, 1, 0.36, 1] as const
const DURATION_MS = 2700

/* ─── Character-split reveal ─── */
function SplitReveal({
  text,
  color,
  outlined = false,
  startIndex = 0,
}: {
  text: string
  color: string
  outlined?: boolean
  startIndex?: number
}) {
  return (
    <div className="flex overflow-hidden leading-none" aria-hidden>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block font-heading tracking-[-0.045em]"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 11rem)',
            lineHeight: 0.87,
            color: outlined ? 'transparent' : color,
            WebkitTextStroke: outlined ? `1.5px ${color}` : undefined,
          }}
          initial={{ y: '115%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.42 + (startIndex + i) * 0.05,
            duration: 0.78,
            ease: EASE_SOFT,
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </div>
  )
}

/* ─── Main preloader ─── */
export function Preloader() {
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)

  const rawP = useMotionValue(0)
  const springP = useSpring(rawP, { stiffness: 44, damping: 16, mass: 1.1 })

  useEffect(() => {
    const unsub = springP.on('change', (v: number) =>
      setCount(Math.round(v * 100)),
    )
    return unsub
  }, [springP])

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
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS)
      rawP.set(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          sessionStorage.setItem('golaine-preloaded', '1')
          setDone(true)
          window.dispatchEvent(new CustomEvent('golaine:preloader-done'))
        }, 520)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [rawP])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex select-none flex-col overflow-hidden bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.18 } }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 1.05, ease: EASE_EXPO },
          }}
        >
          {/* ── Noise grain ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.028]"
            aria-hidden
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '220px 220px',
            }}
          />

          {/* ── Ambient glow — top right ── */}
          <div
            className="pointer-events-none absolute -right-[8%] -top-[8%] z-0 h-[65vh] w-[55vw] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(39,183,165,0.10) 0%, transparent 65%)',
            }}
            aria-hidden
          />
          {/* ── Ambient glow — bottom left ── */}
          <div
            className="pointer-events-none absolute -bottom-[12%] -left-[8%] z-0 h-[48vh] w-[42vw] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(39,183,165,0.055) 0%, transparent 70%)',
            }}
            aria-hidden
          />

          {/* ── TOP BAR ── */}
          <motion.header
            className="relative z-10 flex shrink-0 items-center justify-between px-8 pt-9 md:px-14 md:pt-11"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: EASE_SOFT }}
          >
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded font-heading text-[11px] font-bold leading-none text-background"
                style={{ background: 'var(--accent)' }}
                aria-hidden
              >
                G
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                Golaine Tech
              </span>
            </div>

            {/* Status pulse + location */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-[5px] w-[5px] shrink-0" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/55" />
                <span className="relative block h-full w-full rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
                Bamako&nbsp;·&nbsp;Mali&nbsp;·&nbsp;2026
              </span>
            </div>
          </motion.header>

          {/* ── CENTER: brand ── */}
          <div className="relative z-10 flex flex-1 flex-col justify-end px-8 pb-4 md:px-14">

            {/* Ghost watermark counter — lower right, cropped */}
            <motion.div
              className="pointer-events-none absolute bottom-2 right-4 select-none md:right-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.4 }}
              aria-hidden
            >
              <span
                className="font-heading tabular-nums leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(7rem, 26vw, 22rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(245,245,242,0.042)',
                }}
              >
                {String(count).padStart(3, '0')}
              </span>
            </motion.div>

            {/* Left accent bar + horizontal rule */}
            <div className="mb-7 flex items-end gap-5">
              <motion.div
                className="w-px shrink-0 origin-top bg-accent/40"
                style={{ height: 'clamp(2.5rem, 6vw, 5rem)' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.22, duration: 0.9, ease: EASE_SOFT }}
                aria-hidden
              />
              <motion.div
                className="h-px w-full origin-left bg-foreground/[0.08]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 1.1, ease: EASE_SOFT }}
                aria-hidden
              />
            </div>

            {/* Brand name — character stagger */}
            <SplitReveal
              text="Golaine"
              color="var(--foreground)"
              startIndex={0}
            />
            <SplitReveal
              text="Tech"
              color="var(--accent)"
              outlined
              startIndex={7}
            />

            {/* Tagline */}
            <motion.p
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/22"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.9, ease: EASE_SOFT }}
              aria-hidden
            >
              Transformation&nbsp;Numérique&nbsp;·&nbsp;Afrique&nbsp;de&nbsp;l'Ouest
            </motion.p>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="relative z-10 shrink-0 px-8 pb-10 md:px-14 md:pb-14">

            {/* Counter + label row */}
            <motion.div
              className="mb-4 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/18">
                Initialisation
              </span>
              <span
                className="font-mono tabular-nums leading-none text-foreground/45"
                style={{
                  fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
                  letterSpacing: '0.05em',
                }}
                aria-live="polite"
                aria-label={`Chargement ${count} pourcent`}
              >
                {String(count).padStart(3, '0')}
                <span className="ml-0.5 text-accent/70">%</span>
              </span>
            </motion.div>

            {/* Progress track */}
            <div
              className="relative h-px w-full bg-foreground/[0.07]"
              role="progressbar"
              aria-valuenow={count}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
                style={{ scaleX: springP }}
              />
              {/* Tip glow */}
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left"
                style={{ scaleX: springP, boxShadow: '5px 0 18px 2px var(--accent)' }}
                aria-hidden
              />
            </div>

            {/* Shadow track */}
            <div className="mt-[2px] h-px w-full overflow-hidden">
              <motion.div
                className="h-full w-full origin-left bg-accent/[0.11]"
                style={{ scaleX: springP }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

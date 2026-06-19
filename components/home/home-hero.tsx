'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides, heroAutoplayMs } from '@/data/hero-slides'
import { HeroSlideMediaView } from '@/components/home/hero-slide-media'
import { MagneticButton } from '@/components/magnetic-button'
import { usePreloaderReady } from '@/components/preloader-context'
import { cn } from '@/lib/utils'

const btnMd =
  '!px-9 !py-4 !text-sm !tracking-[0.1em] sm:!px-10 sm:!py-4'

const btnOutlineHero =
  '!border-foreground/60 !bg-background !text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.55)] hover:!border-accent hover:!bg-bg-soft'

const btnPrimaryHero =
  '!bg-accent !text-background shadow-[0_8px_36px_rgba(39,183,165,0.6)] hover:!bg-accent-2'

export function HomeHero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const ready = usePreloaderReady()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef(Date.now())

  const total = heroSlides.length
  const slide = heroSlides[index]

  const goTo = useCallback((next: number) => {
    setIndex(((next % total) + total) % total)
    setProgress(0)
    startRef.current = Date.now()
  }, [total])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    if (paused || shouldReduceMotion) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    startRef.current = Date.now()
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      setProgress(Math.min(1, elapsed / heroAutoplayMs))
      if (elapsed >= heroAutoplayMs) next()
    }, 50)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [index, paused, shouldReduceMotion, next])

  const showContent = ready || shouldReduceMotion

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-background"
      aria-roledescription="carousel"
      aria-label="Hero Golaine Tech"
    >
      {/* Arrière-plans */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <HeroSlideMediaView
                media={slide.media}
                active={!paused}
                priority={index === 0}
              />
              {/* Calme le média pour ne pas rivaliser avec le contenu */}
              <div className="absolute inset-0 bg-[#0e0e10]/25" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scrim section — dégradés uniquement, pas de panneau */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[#0e0e10]/12" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 72% at 50% 46%, rgba(14,14,16,0.82) 0%, rgba(14,14,16,0.55) 36%, rgba(14,14,16,0.18) 58%, transparent 76%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/45 via-transparent to-[#0e0e10]/65" />
        </div>
      </div>

      {/* Contenu centré */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-[5.5rem] pt-24 text-center md:px-10 md:pb-24 md:pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[44rem]"
          >
            {/* Halo discret derrière texte + boutons — sans carte glass */}
            <div
              className="pointer-events-none absolute -inset-x-10 -inset-y-12 md:-inset-x-14 md:-inset-y-14"
              style={{
                background:
                  'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(14,14,16,0.42) 0%, transparent 72%)',
              }}
              aria-hidden
            />

            <div className="relative">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent [text-shadow:0_1px_14px_rgba(0,0,0,0.85)]">
              {slide.eyebrow}
            </p>

            <h1 className="mt-6 font-heading text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_6px_24px_rgba(0,0,0,0.65)]">
              <span className="block">{slide.title}</span>
              {slide.titleAccent && (
                <span className="block text-foreground">{slide.titleAccent}</span>
              )}
            </h1>

            <p className="mx-auto mt-7 max-w-[36rem] text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]">
              {slide.description}
            </p>

            {slide.supporting && (
              <p className="mx-auto mt-4 max-w-[36rem] text-pretty text-base leading-relaxed text-foreground/80 md:text-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.75)]">
                {slide.supporting}
              </p>
            )}

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <MagneticButton
                href={slide.primaryCta.href}
                label={slide.primaryCta.label}
                className={cn(btnMd, btnPrimaryHero)}
              >
                {slide.primaryCta.label}
              </MagneticButton>
              <MagneticButton
                href={slide.secondaryCta.href}
                label={slide.secondaryCta.label}
                variant="outline"
                className={cn(btnMd, btnOutlineHero)}
              >
                {slide.secondaryCta.label}
              </MagneticButton>
            </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contrôles — discrets en bas */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border/30 bg-background/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
              <span className="text-border/80"> / </span>
              {String(total).padStart(2, '0')}
            </span>

            <div className="hidden items-center gap-1.5 sm:flex" role="tablist" aria-label="Slides">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1} — ${s.eyebrow}`}
                  onClick={() => goTo(i)}
                  className="focus-ring group p-1"
                >
                  <motion.span
                    className="block h-[2px] rounded-full origin-left"
                    animate={{
                      scaleX: i === index ? 2.67 : 1,
                      opacity: i === index ? 1 : 0.25,
                      backgroundColor: i === index ? 'var(--accent)' : 'rgba(245,245,242,0.5)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    style={{ width: '0.75rem' }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Reprendre le défilement' : 'Pause'}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Slide précédente"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Slide suivante"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {!paused && !shouldReduceMotion && (
          <div className="h-px w-full bg-border/20">
            <div
              className="h-full origin-left bg-accent/90 transition-transform duration-75 ease-linear"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

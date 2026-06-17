'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { withAlpha } from '@/lib/color-alpha'
import { TransitionLink } from '@/components/page-transition'
import { ArrowUpRight } from 'lucide-react'

export type Service = {
  index: string
  slug: string
  title: string
  description: string
  items: string[]
  bg: string
  fg: string
  muted: string
  accentLine?: string
  lightScheme?: boolean
  image: string
}

export function StickyServices({ services }: { services: Service[] }) {
  const stackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      registerGsapPlugins()
      const stack = stackRef.current
      const progress = progressRef.current
      if (!stack || !progress) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: stack,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        })

        const panels = gsap.utils.toArray<HTMLElement>('.service-panel')
        panels.forEach((panel, i) => {
          const watermark = panel.querySelector('.service-watermark')
          const items = panel.querySelectorAll('.service-item')

          ScrollTrigger.create({
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          })

          if (watermark) {
            gsap.fromTo(
              watermark,
              { scale: 0.88, opacity: 0.06 },
              {
                scale: 1,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top bottom',
                  end: 'top 30%',
                  scrub: 0.6,
                },
              },
            )
          }

          if (items.length) {
            gsap.fromTo(
              items,
              { opacity: 0.35, x: -12 },
              {
                opacity: 1,
                x: 0,
                stagger: 0.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 65%',
                  end: 'top 25%',
                  scrub: 0.5,
                },
              },
            )
          }
        })
      })

      return () => mm.revert()
    },
    { scope: stackRef, dependencies: [services.length] },
  )

  return (
    <div ref={stackRef} className="services-stack relative">
      <div
        className="pointer-events-none sticky top-0 z-[50] h-px w-full origin-left bg-accent/20"
        aria-hidden
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div
        className="pointer-events-none sticky top-4 z-[51] flex justify-center md:hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="rounded-full border border-border/40 bg-background/80 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
          {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
        </span>
      </div>

      {services.map((service, panelIndex) => (
        <div
          key={service.index}
          className="service-panel sticky top-3 mx-3 flex min-h-[72svh] flex-col overflow-hidden rounded-[3rem] md:top-4 md:mx-5 md:min-h-[85svh] lg:min-h-[calc(100vh-2rem)]"
          style={{
            backgroundColor: service.bg,
            color: service.fg,
            zIndex: panelIndex + 2,
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
            style={{ backgroundColor: service.accentLine ?? service.fg }}
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: service.lightScheme
                ? `radial-gradient(ellipse 80% 60% at 85% 50%, ${withAlpha(service.fg, 0.06)}, transparent 70%)`
                : `radial-gradient(ellipse 70% 55% at 78% 42%, ${withAlpha(service.accentLine ?? '#27b7a5', 0.14)}, transparent 68%)`,
            }}
          />

          <span
            aria-hidden
            className="service-watermark pointer-events-none absolute bottom-0 left-0 select-none font-heading leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(8rem, 28vw, 22rem)',
              color: withAlpha(service.fg, service.lightScheme ? 0.06 : 0.09),
              lineHeight: 0.82,
            }}
          >
            {service.index}
          </span>

          {/* Top bar */}
          <div className="relative flex items-center justify-between px-8 pt-8 md:px-14 md:pt-10">
            <span
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: withAlpha(service.fg, 0.5) }}
            >
              {service.title}
            </span>

            <div className="flex items-center gap-1.5" aria-hidden>
              {services.map((_, i) => (
                <span
                  key={i}
                  className="h-[3px] rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: i === panelIndex ? '2rem' : '0.5rem',
                    backgroundColor:
                      i === panelIndex
                        ? service.accentLine ?? service.fg
                        : withAlpha(service.fg, 0.22),
                  }}
                />
              ))}
            </div>
          </div>

          {/* Two-column body */}
          <div className="relative flex flex-1 flex-col lg:grid lg:grid-cols-2">

            {/* LEFT — texte */}
            <div className="relative z-10 flex flex-col justify-center px-8 py-8 md:px-14 md:py-10">
              <span
                className="font-mono text-[11px] tabular-nums"
                style={{ color: withAlpha(service.fg, 0.3) }}
                aria-hidden
              >
                {service.index}
              </span>

              <h3
                className="relative mt-3 font-heading leading-[0.9] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.75rem)' }}
              >
                {service.title}
              </h3>

              <div
                className="my-7 h-px w-14"
                style={{ backgroundColor: service.accentLine ?? withAlpha(service.fg, 0.3) }}
              />

              <p
                className="max-w-sm text-base leading-relaxed"
                style={{ color: service.muted }}
              >
                {service.description}
              </p>

              <ul className="mt-7 flex flex-col gap-0">
                {service.items.map((item, i) => (
                  <li
                    key={item}
                    className="service-item flex items-center justify-between border-b py-3"
                    style={{ borderColor: withAlpha(service.fg, 0.12) }}
                  >
                    <span className="text-[0.9375rem]">{item}</span>
                    <span
                      className="font-mono text-xs tabular-nums"
                      style={{ color: withAlpha(service.fg, 0.35) }}
                      aria-hidden
                    >
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ul>

              <TransitionLink
                href={`/contact?service=${service.slug}`}
                label={`Nous contacter — ${service.title}`}
                className="focus-ring mt-9 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
                style={{ color: service.accentLine ?? service.fg }}
              >
                Nous contacter
                <ArrowUpRight className="h-3.5 w-3.5" />
              </TransitionLink>
            </div>

            {/* RIGHT — image (desktop) */}
            {service.image && (
              <div className="relative hidden lg:block">
                <Image
                  src={service.image}
                  fill
                  alt=""
                  className="object-cover"
                  style={{ opacity: service.lightScheme ? 0.8 : 0.9 }}
                  sizes="50vw"
                />
                {/* Fondu gauche pour raccorder les colonnes */}
                <div
                  className="absolute inset-y-0 left-0 w-1/4"
                  style={{ background: `linear-gradient(to right, ${service.bg}, transparent)` }}
                />
                {/* Fondu haut & bas */}
                <div
                  className="absolute inset-x-0 top-0 h-20"
                  style={{ background: `linear-gradient(to bottom, ${service.bg}, transparent)` }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-20"
                  style={{ background: `linear-gradient(to top, ${service.bg}, transparent)` }}
                />
              </div>
            )}

            {/* Image mobile — bandeau sous le texte */}
            {service.image && (
              <div className="relative h-44 shrink-0 lg:hidden">
                <Image
                  src={service.image}
                  fill
                  alt=""
                  className="object-cover"
                  style={{ opacity: service.lightScheme ? 0.65 : 0.75 }}
                  sizes="100vw"
                />
                <div
                  className="absolute inset-x-0 top-0 h-12"
                  style={{ background: `linear-gradient(to bottom, ${service.bg}, transparent)` }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-12"
                  style={{ background: `linear-gradient(to top, ${service.bg}, transparent)` }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

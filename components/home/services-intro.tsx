'use client'

import { GsapRevealText } from '@/components/gsap-reveal-text'
import { servicesIntro } from '@/data/home-services'

export function ServicesIntro() {
  return (
    <section
      className="relative z-0 border-t border-border bg-background"
      aria-labelledby="services-intro-title"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-[10vw] md:px-12">
        <header className="mb-10 flex items-center justify-between md:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {servicesIntro.eyebrow}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/25">
            01—09
          </span>
        </header>

        <div className="max-w-4xl">
          <GsapRevealText
            as="h2"
            id="services-intro-title"
            text={servicesIntro.title}
            className="font-heading text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground text-balance"
          />

          <GsapRevealText
            as="p"
            text={servicesIntro.description}
            delay={0.1}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg"
          />
        </div>
      </div>
    </section>
  )
}

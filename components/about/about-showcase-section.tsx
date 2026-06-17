'use client'

import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'
import { aboutContent } from '@/data/about'
import { TransitionLink } from '@/components/page-transition'
import { cn } from '@/lib/utils'

type AboutShowcaseSectionProps = {
  showCta?: boolean
  headingLevel?: 'h1' | 'h2'
  className?: string
  id?: string
}

export function AboutShowcaseSection({
  showCta = true,
  headingLevel = 'h2',
  className,
  id = 'home-about-title',
}: AboutShowcaseSectionProps) {
  const Heading = headingLevel

  const bodyParagraphs = [aboutContent.lead, ...aboutContent.paragraphs]

  return (
    <section
      id={id}
      className={cn('relative overflow-hidden bg-background py-[clamp(4rem,10vw,7rem)]', className)}
      aria-labelledby={id}
    >
      <div
        className="pointer-events-none absolute left-[6%] top-[14%] z-0 h-40 w-40 rounded-full border border-accent/15 md:h-52 md:w-52"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[8%] z-0 h-56 w-56 rounded-full border border-accent/10 md:right-[14%] md:h-72 md:w-72"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Colonne texte */}
        <div className="max-w-xl lg:max-w-none">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {aboutContent.eyebrow}
          </p>

          <Heading className="mt-6 font-heading text-[clamp(1.85rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-foreground text-balance">
            {aboutContent.title}
          </Heading>

          <div className="mt-8 space-y-5">
            {bodyParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-pretty text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 space-y-4">
            {aboutContent.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className="text-pretty text-base leading-relaxed text-foreground/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {showCta && (
            <TransitionLink
              href="/a-propos"
              label={aboutContent.cta}
              className="focus-ring mt-10 inline-flex items-center gap-2 rounded-full border border-accent/30 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-opacity hover:opacity-80"
            >
              {aboutContent.cta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </TransitionLink>
          )}
        </div>

        {/* Colonne visuelle */}
        <figure className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end">
          <div
            className="absolute -left-3 -top-3 z-20 h-[88px] w-[88px] rounded-2xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-[2px] md:-left-5 md:-top-5 md:h-[104px] md:w-[104px]"
            aria-hidden
          />

          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] md:aspect-[5/4] md:rounded-[32px]">
            <Image
              src={aboutContent.image.src}
              fill
              alt={aboutContent.image.alt}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-16 font-mono text-[11px] leading-relaxed tracking-wide text-foreground/70 md:px-8 md:pb-8 md:text-xs">
              {aboutContent.image.caption}
            </figcaption>
          </div>

          <div
            className="pointer-events-none absolute -bottom-6 -right-4 z-20 h-28 w-28 rounded-full border border-accent/20 md:-bottom-8 md:-right-6 md:h-36 md:w-36"
            aria-hidden
          />
        </figure>
      </div>
    </section>
  )
}

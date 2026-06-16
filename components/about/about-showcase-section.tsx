'use client'

import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'
import { aboutContent } from '@/data/about'
import { TransitionLink } from '@/components/page-transition'
import { cn } from '@/lib/utils'

const GOLD = '#c4a47c'

type AboutShowcaseSectionProps = {
  /** Sur la page dédiée, masquer le CTA « En savoir plus » */
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
      className={cn('relative overflow-hidden bg-[#0a0c10] py-[clamp(4rem,10vw,7rem)]', className)}
      aria-labelledby={id}
    >
      {/* Cercles décoratifs — comme le mockup */}
      <div
        className="pointer-events-none absolute left-[6%] top-[14%] z-0 h-40 w-40 rounded-full border border-[#c4a47c]/25 md:h-52 md:w-52"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[8%] z-0 h-56 w-56 rounded-full border border-[#c4a47c]/18 md:right-[14%] md:h-72 md:w-72"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Colonne texte */}
        <div className="max-w-xl lg:max-w-none">
          <p
            className="font-mono text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            {aboutContent.eyebrow}
          </p>

          <Heading className="mt-6 font-heading text-[clamp(1.65rem,3.8vw,2.65rem)] font-semibold leading-[1.18] tracking-tight text-white text-balance">
            {aboutContent.title}
          </Heading>

          <div className="mt-8 space-y-5">
            {bodyParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-pretty text-[15px] leading-[1.75] text-[#9ca3af] md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 space-y-4">
            {aboutContent.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: GOLD }}
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className="text-pretty text-[15px] leading-relaxed text-[#d1d5db] md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {showCta && (
            <TransitionLink
              href="/a-propos"
              label={aboutContent.cta}
              className="focus-ring mt-10 inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              {aboutContent.cta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </TransitionLink>
          )}
        </div>

        {/* Colonne visuelle */}
        <figure className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end">
          {/* Cadre décoratif — coin supérieur gauche */}
          <div
            className="absolute -left-3 -top-3 z-20 h-[88px] w-[88px] rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-[2px] md:-left-5 md:-top-5 md:h-[104px] md:w-[104px]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-16 font-mono text-[11px] leading-relaxed tracking-wide text-white md:px-8 md:pb-8 md:text-xs">
              {aboutContent.image.caption}
            </figcaption>
          </div>

          {/* Cercle qui chevauche le coin bas-droite de l'image */}
          <div
            className="pointer-events-none absolute -bottom-6 -right-4 z-20 h-28 w-28 rounded-full border border-[#c4a47c]/30 md:-bottom-8 md:-right-6 md:h-36 md:w-36"
            aria-hidden
          />
        </figure>
      </div>
    </section>
  )
}

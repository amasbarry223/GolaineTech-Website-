'use client'

import { RevealText } from '@/components/reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { TransitionLink } from '@/components/page-transition'
import type { StudioCareer } from '@/data/studio'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export function CareerPageContent({ career }: { career: StudioCareer }) {
  return (
    <div>
      <section className="relative flex min-h-[70vh] flex-col justify-end px-6 pb-16 pt-36 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <TransitionLink
            href="/studio"
            label="Retour au studio"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Studio
          </TransitionLink>

          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            {career.type} · {career.location}
          </p>
          <RevealText
            as="h1"
            text={career.title}
            by="line"
            className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-tight text-foreground"
          />
          <RevealText
            as="p"
            text={career.intro}
            by="word"
            delay={0.2}
            className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
          />
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl tracking-tight text-foreground md:text-3xl">
              Missions
            </h2>
            <ul className="mt-8 space-y-4">
              {career.missions.map((m) => (
                <li key={m} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl tracking-tight text-foreground md:text-3xl">
              Profil recherché
            </h2>
            <ul className="mt-8 space-y-4">
              {career.profile.map((p) => (
                <li key={p} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-10 px-6 py-24 text-center md:px-12">
        <RevealText
          as="h2"
          text="Envie de nous rejoindre ?"
          by="word"
          className="font-heading text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-foreground"
        />
        <MagneticButton
          href={`/contact?role=${career.slug}`}
          label={`Postuler — ${career.title}`}
        >
          Postuler
          <ArrowUpRight className="h-4 w-4" />
        </MagneticButton>
      </section>
    </div>
  )
}

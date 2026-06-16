'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { RevealText } from '@/components/reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { Parallax } from '@/components/parallax'
import { TransitionLink } from '@/components/page-transition'
import { ReelPlayer } from '@/components/studio/reel-player'
import {
  studioAwards,
  studioCareers,
  studioMethodology,
  studioRealisations,
  studioServices,
} from '@/data/studio'
import { ArrowUpRight } from 'lucide-react'

export function StudioPageContent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.service-pill',
          { opacity: 0, y: 16, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.055,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.pills-wrap', start: 'top 82%' },
          },
        )

        gsap.fromTo(
          '.method-step',
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.method-grid', start: 'top 78%' },
          },
        )

        gsap.fromTo(
          '.proof-image',
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.proof-grid', start: 'top 85%' },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-36 md:px-12">
        {/* Studio image — right panel, desktop only */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
          aria-hidden
        >
          <Image
            src="/projects/studio-render.png"
            fill
            alt=""
            priority
            className="object-cover"
            sizes="46vw"
          />
          {/* Left blend */}
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-background to-transparent" />
          {/* Subtle overall tint */}
          <div className="absolute inset-0 bg-background/25" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <h1 className="font-heading text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-tight text-foreground text-balance lg:max-w-[56%]">
            <RevealText text={"Nous transformons"} by="word" className="block" />
            <RevealText text={"vos ambitions en produits"} by="word" delay={0.1} className="block" />
            <RevealText text={"digitaux qui durent."} by="word" delay={0.2} className="block" />
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:max-w-[52%]">
            <RevealText
              as="p"
              text={
                "Studio de transformation numérique basé à Bamako, Mali. Nous concevons des solutions digitales pour les entreprises qui refusent la médiocrité."
              }
              by="word"
              delay={0.3}
              className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
            />
            <div className="shrink-0">
              <MagneticButton href="/contact" label="Travailler ensemble">
                Travailler ensemble
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-accent/20"
          aria-hidden
        />
      </section>

      {/* ── Reel & équipe ── */}
      <section className="border-b border-border px-6 py-[10vw] md:px-12">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <ReelPlayer />

          <div>
            <RevealText
              as="h2"
              text="La culture du studio"
              by="word"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-foreground"
            />
            <p className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Un collectif pluridisciplinaire — design, ingénierie, IA — qui travaille en proximité
              avec vos équipes. Nous filmons nos processus, partageons nos méthodes et célébrons
              chaque livraison comme une victoire commune.
            </p>
            <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              Basés à Bamako, nous collaborons avec des clients en Afrique et à l&apos;international.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cinematic divider ── */}
      <Parallax className="relative h-[55vh] min-h-[280px] w-full overflow-hidden" speed={0.12}>
        <Image
          src="/projects/aurora.png"
          fill
          alt="Aperçu d'un projet Golaine Tech"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/40" />
      </Parallax>

      {/* ── Distinctions ── */}
      <section className="border-b border-border px-6 py-[10vw] md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <RevealText
            as="h2"
            text="Reconnaissance"
            by="word"
            className="mb-14 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-foreground"
          />
          <ul className="divide-y divide-border">
            {studioAwards.map((award, i) => (
              <motion.li
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col gap-2 py-6 transition-colors hover:text-accent md:flex-row md:items-center md:justify-between md:py-8"
              >
                <div>
                  <p className="font-heading text-xl tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
                    {award.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{award.org}</p>
                </div>
                <span className="font-mono text-xs text-accent/70">{award.year}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Carrières ── */}
      <section className="px-6 py-[10vw] md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <RevealText
            as="h2"
            text="Carrières"
            by="word"
            className="mb-14 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-foreground"
          />
          <ul className="divide-y divide-border">
            {studioCareers.map((role, i) => (
              <motion.li
                key={role.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group py-6 md:py-8"
              >
                <TransitionLink
                  href={`/careers/${role.slug}`}
                  label={`Postuler — ${role.title}`}
                  className="focus-ring flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                >
                  <span className="font-heading text-xl tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
                    {role.title}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {role.type} · {role.location}
                  </span>
                </TransitionLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Réalisations ── */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">

          {/* Header row */}
          <div className="proof-grid mb-12 flex items-baseline justify-between">
            <RevealText
              as="h2"
              text="Quelques réalisations"
              by="word"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-foreground"
            />
            <TransitionLink
              href="/work"
              label="Voir tous les projets"
              className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent md:inline-block"
            >
              Voir tout →
            </TransitionLink>
          </div>

          {/* Mobile: 2-col */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {studioRealisations.map((r, i) => (
              <div
                key={r.src}
                className={`proof-image group relative overflow-hidden rounded-2xl ${
                  i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <Image src={r.src} fill alt={r.label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/85 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {r.label}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: 3 + 3 structured grid */}
          <div className="hidden space-y-5 md:block">

            {/* Row 1 — portrait · landscape (offset) · portrait */}
            <div className="grid grid-cols-3 items-start gap-5">
              {/* Col 1 — tall portrait */}
              <div className="proof-image group relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={studioRealisations[0].src} fill alt={studioRealisations[0].label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/90 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {studioRealisations[0].label}
                </p>
              </div>

              {/* Col 2 — landscape, offset down to create rhythm */}
              <div className="proof-image group relative mt-12 aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={studioRealisations[1].src} fill alt={studioRealisations[1].label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/90 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {studioRealisations[1].label}
                </p>
              </div>

              {/* Col 3 — tall portrait */}
              <div className="proof-image group relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={studioRealisations[2].src} fill alt={studioRealisations[2].label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/90 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {studioRealisations[2].label}
                </p>
              </div>
            </div>

            {/* Row 2 — landscape · portrait (offset up) · landscape */}
            <div className="grid grid-cols-3 items-start gap-5">
              {/* Col 1 — landscape */}
              <div className="proof-image group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={studioRealisations[3].src} fill alt={studioRealisations[3].label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/90 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {studioRealisations[3].label}
                </p>
              </div>

              {/* Col 2 — portrait, pulled up to interlock with row 1 */}
              <div className="proof-image group relative -mt-24 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={studioRealisations[4].src} fill alt={studioRealisations[4].label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/90 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {studioRealisations[4].label}
                </p>
              </div>

              {/* Col 3 — landscape */}
              <div className="proof-image group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={studioRealisations[5].src} fill alt={studioRealisations[5].label}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-background/90 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  {studioRealisations[5].label}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services Pills ── */}
      <section className="border-y border-border bg-bg-soft/40 px-6 py-24 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <RevealText
            as="h2"
            text="Ce que nous faisons"
            by="word"
            className="mb-12 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-foreground"
          />
          <div className="pills-wrap flex flex-wrap gap-3 md:gap-4">
            {studioServices.map((s) => (
              <span
                key={s}
                className="service-pill inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 font-mono text-sm text-foreground/80 transition-all duration-300 hover:border-accent hover:text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="relative overflow-hidden px-6 py-[10vw] md:px-12">
        {/* Background render — very subtle */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/projects/monolith.png"
            fill
            alt=""
            className="object-cover opacity-[0.04]"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]">
          <RevealText
            as="h2"
            text="Notre approche"
            by="word"
            className="mb-16 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-foreground"
          />
          <div className="method-grid grid gap-0 md:grid-cols-4 md:gap-8">
            {studioMethodology.map((m, i) => (
              <div
                key={m.phase}
                className="method-step border-b border-border py-8 last:border-b-0 md:border-b-0 md:border-l md:py-0 md:pl-8 first:md:border-l-0 first:md:pl-0"
              >
                <span className="mb-5 block font-mono text-xs text-accent" aria-hidden>0{i + 1}</span>
                <h3 className="mb-4 font-heading text-2xl tracking-tight text-foreground md:text-3xl">
                  {m.phase}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center gap-12 overflow-hidden px-6 py-24 text-center md:px-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/projects/lumen.png"
            fill
            alt=""
            className="object-cover opacity-[0.06]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>
        <RevealText
          as="h2"
          text={"Prêts à construire\nquelque chose d'exceptionnel?"}
          by="line"
          className="relative font-heading text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] tracking-tight text-foreground text-balance"
        />
        <MagneticButton href="/contact" label="Démarrer un projet">
          Démarrer un projet
          <ArrowUpRight className="h-4 w-4" />
        </MagneticButton>
      </section>
    </div>
  )
}

'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { RevealText } from '@/components/reveal-text'
import { GsapRevealText } from '@/components/gsap-reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import {
  formationsContent,
  formationPrograms,
  formationLevels,
  type FormationLevel,
  type FormationProgram,
} from '@/data/formations'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type LevelFilter = 'Tous' | FormationLevel

const levelBadge: Record<FormationLevel, string> = {
  Débutant: 'border-border/80 bg-bg-soft text-muted-foreground',
  Intermédiaire: 'border-accent/35 bg-accent/10 text-accent',
  Expert: 'border-accent bg-accent text-background',
}

function ProgramMeta({ program }: { program: FormationProgram }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      <span>{program.duration}</span>
      <span className="mx-2 text-border" aria-hidden>
        ·
      </span>
      <span>max. {program.maxParticipants} participants</span>
      <span className="mx-2 text-border" aria-hidden>
        ·
      </span>
      <span>{program.pricing}</span>
    </p>
  )
}

function ProgramTopics({ topics }: { topics: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {topics.map((topic) => (
        <li key={topic} className="flex gap-3 text-sm text-muted-foreground">
          <span className="text-accent" aria-hidden>
            —
          </span>
          <span>{topic}</span>
        </li>
      ))}
    </ul>
  )
}

function ProgramRow({
  program,
  index,
  featured = false,
}: {
  program: FormationProgram
  index: number
  featured?: boolean
}) {
  const contactHref = `/contact?service=formations-tech-ia&program=${program.slug}`
  const imageSrc = program.image ?? '/projects/elearning.png'

  return (
    <article className="program-row group relative overflow-hidden rounded-[1.75rem] border border-border bg-surface">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[16rem] lg:col-span-5 lg:min-h-full">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/5 lg:to-surface/25" />
          <span className="absolute left-6 top-6 font-mono text-xs tabular-nums text-foreground/70">
            {String(index).padStart(2, '0')}
          </span>
        </div>

        <div className="relative flex flex-col p-8 md:p-10 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest',
                levelBadge[program.level],
              )}
            >
              {program.level}
            </span>
            {featured && (
              <span className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                Le plus demandé
              </span>
            )}
          </div>

          <h3 className="mt-5 font-heading text-[clamp(1.65rem,3.5vw,2.5rem)] leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent">
            {program.title}
          </h3>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {program.description}
          </p>
          <div className="mt-5">
            <ProgramMeta program={program} />
          </div>
          <ProgramTopics topics={program.topics} />
          <MagneticButton
            href={contactHref}
            label={`S'inscrire — ${program.title}`}
            className="!mt-8 !w-fit"
          >
            S&apos;inscrire
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </article>
  )
}

export function FormationsPageContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('Tous')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const shouldReduceMotion = useReducedMotion()

  const featured = formationPrograms.find((p) => p.featured)
  const catalogPrograms = formationPrograms.filter((p) => !p.featured)

  const filteredPrograms = useMemo(() => {
    if (levelFilter === 'Tous') return catalogPrograms
    return catalogPrograms.filter((p) => p.level === levelFilter)
  }, [levelFilter, catalogPrograms])

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = heroRef.current

        if (hero) {
          gsap.fromTo(
            '.formations-hero-bg',
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' },
          )

          gsap.fromTo(
            '.formations-hero-bg-image',
            { scale: 1.1 },
            { scale: 1, duration: 1.4, ease: 'power3.out' },
          )

          gsap.to('.formations-hero-bg-image', {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        }

        gsap.fromTo(
          '.formations-visual',
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.formations-gallery', start: 'top 85%' },
          },
        )

        gsap.fromTo(
          '.why-item',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
          },
        )

        gsap.fromTo(
          '.program-row',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.programs-catalog', start: 'top 82%' },
          },
        )

        gsap.fromTo(
          '.process-step',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.process-grid', start: 'top 85%' },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [levelFilter] },
  )

  const filterOptions: LevelFilter[] = ['Tous', ...formationLevels]

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="formations-hero relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="formations-hero-bg absolute inset-0" aria-hidden>
          <div className="formations-hero-bg-image absolute inset-0 origin-center">
            <Image
              src={formationsContent.heroImage.src}
              fill
              priority
              alt=""
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-background/45" />
          <div className="page-hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-36 md:px-12 md:pb-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2/80">
            {formationsContent.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            Formations
            <br />
            IA &amp; Tech
          </h1>
          <RevealText
            as="p"
            text={formationsContent.lead}
            by="word"
            immediate
            delay={0.2}
            className="mt-8 block max-w-xl text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_12px_rgba(14,14,16,0.85)]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact?service=formations-tech-ia"
              label={formationsContent.cta}
              className="!shadow-[0_8px_36px_rgba(39,183,165,0.35)]"
            >
              {formationsContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#catalogue"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0f1f1d]/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/85 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-2"
            >
              Voir le catalogue
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/10 pt-10">
            {formationsContent.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl tracking-tight text-accent-2 md:text-3xl [text-shadow:0_1px_16px_rgba(14,14,16,0.8)]">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            {formationsContent.heroImage.caption}
          </p>
        </div>
      </section>

      {/* ── Galerie formats ── */}
      <section className="formations-gallery border-t border-border bg-bg-soft/35 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Formats
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
                Apprendre en pratiquant
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Ateliers immersifs, parcours sur mesure et supports durables — chaque format est
              calibré sur vos objectifs métier.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {formationsContent.gallery.map((item, index) => (
              <figure
                key={item.src}
                className={cn(
                  'formations-visual group relative overflow-hidden rounded-2xl border border-border',
                  index === 1 && 'sm:mt-8',
                )}
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={item.src}
                    fill
                    alt={item.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-70" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 pt-16">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                      {item.label}
                    </span>
                    <span className="font-heading text-lg text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      0{index + 1}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nos formations */}
      <section className="border-y border-border bg-bg-soft/35 px-6 py-[10vw] md:px-12">
        <div className="why-grid mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <GsapRevealText
              as="h2"
              text="Pourquoi nos formations"
              className="font-heading text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-foreground"
            />
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Des parcours pensés pour des équipes opérationnelles — pas seulement théoriques.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
            {formationsContent.whyUs.map((item, i) => (
              <div
                key={item.title}
                className="why-item bg-background px-8 py-10 transition-colors hover:bg-surface md:py-12"
              >
                <span className="font-mono text-xs text-accent/80" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl tracking-tight text-foreground md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="scroll-mt-28 px-6 py-[10vw] md:px-12">
        <div className="programs-catalog mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Catalogue</p>
              <GsapRevealText
                as="h2"
                text="Programmes disponibles"
                className="mt-3 font-heading text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-foreground"
              />
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Six parcours types — chaque syllabus est ajusté après un diagnostic gratuit avec
                votre équipe.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrer par niveau"
            >
              {filterOptions.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelFilter(level)}
                  aria-pressed={levelFilter === level}
                  className={cn(
                    'focus-ring rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors',
                    levelFilter === level
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground',
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6">
            {levelFilter === 'Tous' && featured && (
              <ProgramRow program={featured} index={1} featured />
            )}

            {filteredPrograms.length === 0 ? (
              <p className="rounded-[1.75rem] border border-border bg-surface px-8 py-12 text-center text-muted-foreground">
                Aucun programme pour ce niveau.{' '}
                <button
                  type="button"
                  onClick={() => setLevelFilter('Tous')}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Voir tout le catalogue
                </button>
              </p>
            ) : (
              filteredPrograms.map((program, i) => (
                <ProgramRow
                  key={program.slug}
                  program={program}
                  index={levelFilter === 'Tous' && featured ? i + 2 : i + 1}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="border-t border-border px-6 py-[10vw] md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <GsapRevealText
            as="h2"
            text="Pour qui ?"
            className="font-heading text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-foreground"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-12">
            {formationsContent.audiences.map((audience, i) => (
              <div key={audience.title} className="border-t border-border pt-8">
                <span className="font-mono text-xs text-accent/70">0{i + 1}</span>
                <h3 className="mt-4 font-heading text-xl tracking-tight text-foreground">
                  {audience.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-bg-soft/30 px-6 py-[10vw] md:px-12">
        <div className="process-grid mx-auto max-w-[1400px]">
          <GsapRevealText
            as="h2"
            text="De la prise de contact à l'impact"
            by="line"
            className="max-w-2xl font-heading text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-foreground"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {formationsContent.process.map((step, i) => (
              <div key={step.step} className="process-step">
                <span className="font-mono text-xs text-accent" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl tracking-tight text-foreground">
                  {step.step}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px] lg:grid lg:grid-cols-12 lg:gap-16">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] tracking-tight text-foreground lg:col-span-4">
            Questions fréquentes
          </h2>
          <div className="mt-10 divide-y divide-border lg:col-span-8 lg:mt-0">
            {formationsContent.faq.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="focus-ring flex w-full items-start justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-heading text-lg tracking-tight text-foreground md:text-xl">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        'mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                      aria-hidden
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden border-t border-border">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 origin-center">
            <Image
              src="/projects/atelier.png"
              fill
              alt=""
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-background/25" />
          <div className="page-hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-20 md:flex-row md:items-end md:justify-between md:px-12 md:py-28">
          <h2 className="max-w-2xl font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            Prêt à faire monter
            <br />
            votre équipe ?
          </h2>
          <div className="shrink-0 md:pb-1">
            <MagneticButton href="/contact?service=formations-tech-ia" label={formationsContent.cta}>
              {formationsContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <p className="mt-4 max-w-xs font-mono text-[11px] uppercase tracking-widest text-foreground/50">
              Réponse sous 48h · Diagnostic initial offert · Bamako &amp; remote
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

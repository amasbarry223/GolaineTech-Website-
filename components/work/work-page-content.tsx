'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { RevealText } from '@/components/reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { TransitionLink } from '@/components/page-transition'
import { projects, type Project } from '@/data/projects'
import { workContent } from '@/data/work'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const allCategories = ['Tous', ...Array.from(new Set(projects.map((p) => p.category)))]

function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      <span>{project.client}</span>
      <span className="mx-2 text-border" aria-hidden>
        ·
      </span>
      <span>{project.year}</span>
      <span className="mx-2 text-border" aria-hidden>
        ·
      </span>
      <span>{project.category}</span>
    </p>
  )
}

function ProjectRoles({ roles }: { roles: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {roles.map((role) => (
        <li key={role} className="flex gap-3 text-sm text-muted-foreground">
          <span className="text-accent" aria-hidden>
            —
          </span>
          <span>{role}</span>
        </li>
      ))}
    </ul>
  )
}

function ProjectRow({
  project,
  index,
  featured = false,
}: {
  project: Project
  index: number
  featured?: boolean
}) {
  return (
    <article className="work-row group relative overflow-hidden rounded-[1.75rem] border border-border bg-surface">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[16rem] lg:col-span-5 lg:min-h-full">
          <Image
            src={project.cover}
            alt=""
            fill
            className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/30 lg:to-surface" />
          <span className="absolute left-6 top-6 font-mono text-xs tabular-nums text-foreground/70">
            {String(index).padStart(2, '0')}
          </span>
        </div>

        <div className="relative flex flex-col p-8 md:p-10 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              {project.category}
            </span>
            {featured && (
              <span className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                Projet phare
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {project.year}
            </span>
          </div>

          <h3 className="mt-5 font-heading text-[clamp(1.65rem,3.5vw,2.5rem)] leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {project.excerpt}
          </p>
          <div className="mt-5">
            <ProjectMeta project={project} />
          </div>
          <ProjectRoles roles={project.role} />
          <TransitionLink
            href={`/work/${project.slug}`}
            label={`Voir le projet — ${project.title}`}
            className="focus-ring mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent-2"
          >
            Voir le projet
            <ArrowUpRight className="h-4 w-4" />
          </TransitionLink>
        </div>
      </div>
    </article>
  )
}

export function WorkPageContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered =
    activeFilter === 'Tous' ? projects : projects.filter((p) => p.category === activeFilter)

  const featured = projects[0]
  const catalogProjects =
    activeFilter === 'Tous' ? projects.slice(1) : filtered

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()
      const hero = heroRef.current

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (hero) {
          gsap.fromTo(
            '.work-hero-bg',
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' },
          )

          gsap.fromTo(
            '.work-hero-bg-image',
            { scale: 1.1 },
            { scale: 1, duration: 1.4, ease: 'power3.out' },
          )

          gsap.to('.work-hero-bg-image', {
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
          '.work-visual',
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.work-gallery', start: 'top 85%' },
          },
        )

        gsap.fromTo(
          '.work-row',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.work-catalog', start: 'top 82%' },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [activeFilter] },
  )

  const projectCount = String(projects.length).padStart(2, '0')

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="work-hero relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="work-hero-bg absolute inset-0" aria-hidden>
          <div className="work-hero-bg-image absolute inset-0 origin-center">
            <Image
              src={workContent.heroImage.src}
              fill
              priority
              alt=""
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-background/25" />
          <div className="page-hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-36 md:px-12 md:pb-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2/80">
            {workContent.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            Des produits
            <br />
            qui créent de l&apos;impact.
          </h1>
          <RevealText
            as="p"
            text={`${projects.length} ${workContent.lead}`}
            by="word"
            immediate
            delay={0.2}
            className="mt-8 block max-w-xl text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_12px_rgba(14,14,16,0.85)]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact"
              label={workContent.cta}
              className="!shadow-[0_8px_36px_rgba(39,183,165,0.35)]"
            >
              {workContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#projets"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0f1f1d]/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/85 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-2"
            >
              Voir les projets
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/10 pt-10">
            {workContent.stats.map((stat, i) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl tracking-tight text-accent-2 md:text-3xl [text-shadow:0_1px_16px_rgba(14,14,16,0.8)]">
                  {i === 0 ? projectCount : stat.value}
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            {workContent.heroImage.caption}
          </p>
        </div>
      </section>

      {/* ── Galerie expertises ── */}
      <section className="work-gallery border-t border-border bg-bg-soft/35 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Expertises
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
                Du mobile à l&apos;IA
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Applications natives, plateformes web, logiciels métiers et design systems — une
              même exigence de qualité sur chaque livrable.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {workContent.gallery.map((item, index) => (
              <figure
                key={item.src}
                className={cn(
                  'work-visual group relative overflow-hidden rounded-2xl border border-border',
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
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

      {/* ── Catalogue ── */}
      <section id="projets" className="scroll-mt-28 border-t border-border px-6 py-[10vw] md:px-12">
        <div className="work-catalog mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Portfolio</p>
              <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-foreground">
                Réalisations
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {projects.length} projets — filtres par expertise pour explorer nos cas clients.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrer par catégorie"
            >
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className="focus-ring relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-300"
                >
                  {activeFilter === cat && (
                    <motion.span
                      layoutId="work-filter-active"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10',
                      activeFilter === cat
                        ? 'text-background'
                        : 'text-muted-foreground hover:text-accent',
                    )}
                  >
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6">
            {activeFilter === 'Tous' && featured && (
              <ProjectRow project={featured} index={1} featured />
            )}

            {catalogProjects.length === 0 ? (
              <p className="rounded-[1.75rem] border border-border bg-surface px-8 py-12 text-center text-muted-foreground">
                Aucun projet pour cette catégorie.{' '}
                <button
                  type="button"
                  onClick={() => setActiveFilter('Tous')}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Voir tout le portfolio
                </button>
              </p>
            ) : (
              catalogProjects.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={activeFilter === 'Tous' ? i + 2 : i + 1}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden border-t border-border">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 origin-center">
            <Image
              src="/projects/hero-render.png"
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
            Un projet en tête ?
            <br />
            Parlons-en.
          </h2>
          <div className="shrink-0 md:pb-1">
            <MagneticButton href="/contact" label={workContent.cta}>
              {workContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <p className="mt-4 max-w-xs font-mono text-[11px] uppercase tracking-widest text-foreground/50">
              Réponse sous 48h · Bamako &amp; remote
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

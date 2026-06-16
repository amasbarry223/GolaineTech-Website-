'use client'

import { useMemo, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import type { Project } from '@/data/projects'
import { workContent } from '@/data/work'
import { RevealText } from '@/components/reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { TransitionLink } from '@/components/page-transition'
import { ArrowLeft, ArrowUpRight, Briefcase, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectDetailProps = {
  project: Project
}

type CaseBlock =
  | { type: 'split'; image: string; heading?: string; body?: string }
  | { type: 'figure'; image: string }
  | { type: 'text'; heading?: string; body?: string }
  | { type: 'quote'; quote: string; author?: string }
  | { type: 'gallery'; images: string[] }

function buildCaseBlocks(sections: Project['sections']): CaseBlock[] {
  const blocks: CaseBlock[] = []
  let i = 0

  while (i < sections.length) {
    const current = sections[i]
    const next = sections[i + 1]

    if (current.kind === 'image' && current.image && next?.kind === 'text') {
      blocks.push({
        type: 'split',
        image: current.image,
        heading: next.heading,
        body: next.body,
      })
      i += 2
      continue
    }

    if (current.kind === 'image' && current.image) {
      blocks.push({ type: 'figure', image: current.image })
    } else if (current.kind === 'text') {
      blocks.push({ type: 'text', heading: current.heading, body: current.body })
    } else if (current.kind === 'quote' && current.quote) {
      blocks.push({ type: 'quote', quote: current.quote, author: current.author })
    } else if (current.kind === 'gallery' && current.images?.length) {
      blocks.push({ type: 'gallery', images: current.images })
    }

    i += 1
  }

  return blocks
}

function getProjectPreviewImages(project: Project, limit = 3): string[] {
  const fromSections = project.sections.flatMap((section) => {
    if (section.kind === 'image' && section.image) return [section.image]
    if (section.kind === 'gallery' && section.images) return section.images
    return []
  })

  return Array.from(new Set([project.cover, ...fromSections])).slice(0, limit)
}

function CaseSplitBlock({
  image,
  heading,
  body,
  reverse = false,
}: {
  image: string
  heading?: string
  body?: string
  reverse?: boolean
}) {
  return (
    <article className="case-block group overflow-hidden rounded-[1.75rem] border border-border bg-surface">
      <div
        className={cn(
          'grid lg:grid-cols-12',
          reverse && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1',
        )}
      >
        <div className="relative min-h-[16rem] lg:col-span-5 lg:min-h-full">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/20 lg:to-surface" />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10 lg:col-span-7">
          {heading && (
            <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-foreground">
              {heading}
            </h3>
          )}
          {body && (
            <p
              className={cn(
                'max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg',
                heading && 'mt-6',
              )}
            >
              {body}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const previewImages = useMemo(() => getProjectPreviewImages(project), [project])
  const caseBlocks = useMemo(() => buildCaseBlocks(project.sections), [project.sections])

  const caseBlocksWithLayout = useMemo(() => {
    let splitIndex = 0
    return caseBlocks.map((block, i) => {
      if (block.type !== 'split') return { block, key: `${block.type}-${i}` as const, reverse: false }
      const reverse = splitIndex % 2 === 1
      splitIndex += 1
      return { block, key: `split-${i}` as const, reverse }
    })
  }, [caseBlocks])

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()
      const hero = heroRef.current

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (hero) {
          gsap.fromTo(
            '.case-hero-bg',
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' },
          )

          gsap.fromTo(
            '.case-hero-bg-image',
            { scale: 1.1 },
            { scale: 1, duration: 1.4, ease: 'power3.out' },
          )

          gsap.to('.case-hero-bg-image', {
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
          '.case-preview-item',
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.case-preview', start: 'top 85%' },
          },
        )

        gsap.fromTo(
          '.meta-item',
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.case-meta', start: 'top 82%' },
          },
        )

        gsap.fromTo(
          '.case-block',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.case-sections', start: 'top 88%' },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  const contactHref = '/contact'

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="case-hero relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="case-hero-bg absolute inset-0" aria-hidden>
          <div className="case-hero-bg-image absolute inset-0 origin-center">
            <Image
              src={project.cover || '/placeholder.svg'}
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
          <TransitionLink
            href="/work"
            label={workContent.caseStudy.backLabel}
            className="focus-ring mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0f1f1d]/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/85 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {workContent.caseStudy.backLabel}
          </TransitionLink>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2/80">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.25rem,7vw,5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            {project.title}
          </h1>
          <RevealText
            as="p"
            text={project.excerpt}
            by="word"
            immediate
            delay={0.15}
            className="mt-8 block max-w-xl text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_12px_rgba(14,14,16,0.85)]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center rounded-full border border-accent/45 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-2 backdrop-blur-sm">
              {project.client}
            </span>
            <span className="inline-flex items-center rounded-full border border-foreground/10 bg-background/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground/70 backdrop-blur-sm">
              {project.year}
            </span>
          </div>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            {project.category} · Golaine Tech
          </p>
        </div>
      </section>

      {/* ── Aperçu visuel ── */}
      {previewImages.length > 1 && (
        <section className="case-preview border-t border-border bg-bg-soft/35 px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {workContent.caseStudy.previewTitle}
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
                  Interfaces &amp; livrables
                </h2>
              </div>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                Extraits visuels du projet — écrans, parcours et composants livrés à nos clients.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {previewImages.map((src, index) => (
                <figure
                  key={src}
                  className={cn(
                    'case-preview-item group relative overflow-hidden rounded-2xl border border-border',
                    index === 1 && 'sm:mt-8',
                  )}
                >
                  <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                    <Image
                      src={src}
                      fill
                      alt=""
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                    <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16 font-mono text-[11px] uppercase tracking-widest text-foreground">
                      0{index + 1}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contexte ── */}
      <section className="case-meta border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-20 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-24">
          <div>
            <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
              {workContent.caseStudy.contextTitle}
            </h2>
            <ul className="mt-10 space-y-8">
              <li className="meta-item flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                  <User className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Client
                  </p>
                  <p className="mt-1 text-base text-foreground">{project.client}</p>
                </div>
              </li>
              <li className="meta-item flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                  <Briefcase className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {workContent.caseStudy.deliverablesLabel}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.role.map((role) => (
                      <li key={role} className="flex gap-3 text-sm text-foreground/90">
                        <span className="text-accent" aria-hidden>
                          —
                        </span>
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <div className="meta-item mt-12 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <Calendar className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Projet similaire
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Vous avez un besoin comparable ? Parlons-en — réponse sous 48 heures ouvrées.
                  </p>
                  <a
                    href={contactHref}
                    className="focus-ring mt-4 inline-flex items-center gap-2 text-sm text-accent transition-opacity hover:opacity-80"
                  >
                    Demander un devis
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="meta-item overflow-hidden rounded-[1.75rem] border border-border bg-bg-soft/40">
            <div className="relative aspect-[16/10] w-full border-b border-border">
              <Image
                src={project.cover}
                fill
                alt=""
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <div className="p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {workContent.caseStudy.summaryLabel}
              </p>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                {project.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Étude de cas ── */}
      <div className="case-sections border-t border-border bg-bg-soft/20 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:gap-10">
          {caseBlocksWithLayout.map(({ block, key, reverse }) => {
            if (block.type === 'split') {
              return (
                <CaseSplitBlock
                  key={key}
                  image={block.image}
                  heading={block.heading}
                  body={block.body}
                  reverse={reverse}
                />
              )
            }

            if (block.type === 'figure') {
              return (
                <figure
                  key={key}
                  className="case-block group overflow-hidden rounded-[1.75rem] border border-border bg-surface"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={block.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1400px) 100vw, 1400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                  </div>
                </figure>
              )
            }

            if (block.type === 'text') {
              return (
                <article
                  key={key}
                  className="case-block max-w-3xl rounded-[1.75rem] border border-border bg-surface px-8 py-10 md:px-10 md:py-12"
                >
                  {block.heading && (
                    <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-foreground">
                      {block.heading}
                    </h3>
                  )}
                  {block.body && (
                    <p
                      className={cn(
                        'text-pretty text-base leading-relaxed text-muted-foreground md:text-lg',
                        block.heading && 'mt-6',
                      )}
                    >
                      {block.body}
                    </p>
                  )}
                </article>
              )
            }

            if (block.type === 'quote') {
              return (
                <figure
                  key={key}
                  className="case-block max-w-3xl overflow-hidden rounded-[1.75rem] border border-accent/25 bg-[#0f1f1d]/60 px-8 py-10 md:px-12 md:py-14"
                >
                  <blockquote>
                    <p className="font-heading text-[clamp(1.35rem,3vw,2rem)] leading-snug tracking-tight text-foreground text-pretty">
                      « {block.quote} »
                    </p>
                  </blockquote>
                  {block.author && (
                    <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-widest text-accent-2/80">
                      {block.author}
                    </figcaption>
                  )}
                </figure>
              )
            }

            return (
              <div key={key} className="case-block grid gap-4 sm:grid-cols-2">
                {block.images.map((img, imgIndex) => (
                  <figure
                    key={img}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl border border-border',
                      imgIndex === 1 && 'sm:mt-8',
                    )}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    </div>
                  </figure>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="relative flex min-h-[65vh] flex-col justify-end overflow-hidden border-t border-border">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/projects/hero-render.png"
            fill
            alt=""
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/25" />
          <div className="page-hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-20 md:flex-row md:items-end md:justify-between md:px-12 md:py-28">
          <h2 className="max-w-2xl font-heading text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            {workContent.caseStudy.ctaTitle}
          </h2>
          <div className="shrink-0 md:pb-1">
            <MagneticButton href={contactHref} label={workContent.caseStudy.ctaButton}>
              {workContent.caseStudy.ctaButton}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <p className="mt-4 max-w-xs font-mono text-[11px] uppercase tracking-widest text-foreground/50">
              {workContent.caseStudy.ctaNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

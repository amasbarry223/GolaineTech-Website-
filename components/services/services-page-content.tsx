'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { RevealText } from '@/components/reveal-text'
import { GsapRevealText } from '@/components/gsap-reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { stickyServices } from '@/data/home-services'
import type { Service } from '@/components/sticky-services'
import { featuredServiceSlug, servicesPageContent } from '@/data/services'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

function ServiceTopics({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-muted-foreground">
          <span className="text-accent" aria-hidden>
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ServiceRow({
  service,
  featured = false,
}: {
  service: Service
  featured?: boolean
}) {
  const contactHref = `/contact?service=${service.slug}`

  return (
    <article className="service-row group relative overflow-hidden rounded-[1.75rem] border border-border bg-surface">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[16rem] lg:col-span-5 lg:min-h-full">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/30 lg:to-surface" />
          <span className="absolute left-6 top-6 font-mono text-xs tabular-nums text-foreground/70">
            {service.index}
          </span>
        </div>

        <div className="relative flex flex-col p-8 md:p-10 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            {featured && (
              <span className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                Expertise phare
              </span>
            )}
          </div>

          <h3 className="mt-5 font-heading text-[clamp(1.65rem,3.5vw,2.5rem)] leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent">
            {service.title}
          </h3>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <ServiceTopics items={service.items} />
          <MagneticButton
            href={contactHref}
            label={`Discuter — ${service.title}`}
            className="!mt-8 !w-fit"
          >
            Discuter de ce besoin
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </article>
  )
}

export function ServicesPageContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const featured = stickyServices.find((s) => s.slug === featuredServiceSlug)
  const catalogServices = stickyServices.filter((s) => s.slug !== featuredServiceSlug)

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = heroRef.current

        if (hero) {
          gsap.fromTo(
            '.services-hero-bg',
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' },
          )

          gsap.fromTo(
            '.services-hero-bg-image',
            { scale: 1.1 },
            { scale: 1, duration: 1.4, ease: 'power3.out' },
          )

          gsap.to('.services-hero-bg-image', {
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
          '.services-visual',
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.services-gallery', start: 'top 85%' },
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
          '.service-row',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.services-catalog', start: 'top 82%' },
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
    { scope: containerRef },
  )

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="services-hero relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="services-hero-bg absolute inset-0" aria-hidden>
          <div className="services-hero-bg-image absolute inset-0 origin-center">
            <Image
              src={servicesPageContent.heroImage.src}
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
            {servicesPageContent.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            Neuf expertises,
            <br />
            une seule ambition
          </h1>
          <RevealText
            as="p"
            text={servicesPageContent.lead}
            by="word"
            immediate
            delay={0.2}
            className="mt-8 block max-w-xl text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_12px_rgba(14,14,16,0.85)]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact"
              label={servicesPageContent.cta}
              className="!shadow-[0_8px_36px_rgba(39,183,165,0.35)]"
            >
              {servicesPageContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#catalogue"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0f1f1d]/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/85 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-2"
            >
              Voir les expertises
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/10 pt-10">
            {servicesPageContent.stats.map((stat) => (
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
            {servicesPageContent.heroImage.caption}
          </p>
        </div>
      </section>

      {/* ── Galerie ── */}
      <section className="services-gallery border-t border-border bg-bg-soft/35 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Expertises
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
                Du produit à l&apos;infrastructure
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Mobile, web, IA, design et opérations — une couverture complète pour votre
              transformation numérique.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {servicesPageContent.gallery.map((item, index) => (
              <figure
                key={item.src}
                className={cn(
                  'services-visual group relative overflow-hidden rounded-2xl border border-border',
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

      {/* ── Pourquoi Golaine ── */}
      <section className="border-y border-border bg-bg-soft/35 px-6 py-[10vw] md:px-12">
        <div className="why-grid mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <GsapRevealText
              as="h2"
              text="Pourquoi travailler avec nous"
              className="font-heading text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-foreground"
            />
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Une approche intégrée — pas une liste de prestataires disjoints.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
            {servicesPageContent.whyUs.map((item, i) => (
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

      {/* ── Catalogue ── */}
      <section id="catalogue" className="scroll-mt-28 px-6 py-[10vw] md:px-12">
        <div className="services-catalog mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {servicesPageContent.catalog.eyebrow}
              </p>
              <GsapRevealText
                as="h2"
                text={servicesPageContent.catalog.title}
                className="mt-3 font-heading text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-foreground"
              />
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {servicesPageContent.catalog.lead}
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/25">
              01—09
            </p>
          </div>

          {featured && (
            <div className="mt-14">
              <ServiceRow service={featured} featured />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-8">
            {catalogServices.map((service) => (
              <ServiceRow key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Processus ── */}
      <section className="border-t border-border bg-bg-soft/20 px-6 py-[10vw] md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] tracking-tight text-foreground">
            Comment nous travaillons
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Quatre étapes claires — du premier échange à la mise en production et au-delà.
          </p>
          <div className="process-grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicesPageContent.process.map((phase, i) => (
              <article
                key={phase.step}
                className="process-step rounded-2xl border border-border bg-surface p-6 md:p-8"
              >
                <span className="font-mono text-xs text-accent" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl tracking-tight text-foreground md:text-2xl">
                  {phase.step}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {phase.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            Un projet en tête ?
            <br />
            Parlons-en.
          </h2>
          <div className="shrink-0 md:pb-1">
            <MagneticButton href="/contact" label={servicesPageContent.cta}>
              {servicesPageContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <p className="mt-4 max-w-xs font-mono text-[11px] uppercase tracking-widest text-foreground/50">
              {servicesPageContent.ctaNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

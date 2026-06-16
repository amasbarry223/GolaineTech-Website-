'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import {
  aboutPage,
  aboutPageContent,
  methodologyPhases,
  teamMembers,
  type TeamMember,
  type TeamSocialPlatform,
} from '@/data/about'
import { RevealText } from '@/components/reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { ArrowUpRight, Target, Telescope } from 'lucide-react'
import { cn } from '@/lib/utils'

type SocialIconProps = { className?: string }

function LinkedinIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GithubIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function TwitterIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const socialConfig: Record<
  TeamSocialPlatform,
  { label: string; Icon: (props: SocialIconProps) => React.JSX.Element }
> = {
  linkedin: { label: 'LinkedIn', Icon: LinkedinIcon },
  github: { label: 'GitHub', Icon: GithubIcon },
  twitter: { label: 'X (Twitter)', Icon: TwitterIcon },
  instagram: { label: 'Instagram', Icon: InstagramIcon },
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const socialEntries = Object.entries(member.socials).filter(
    (entry): entry is [TeamSocialPlatform, string] => Boolean(entry[1]),
  )

  return (
    <article
      className={cn(
        'team-card group overflow-hidden rounded-[1.75rem] border border-border bg-surface transition-colors hover:border-accent/30',
        index % 3 === 1 && 'md:mt-8',
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b border-border">
        {member.image ? (
          <Image
            src={member.image}
            alt=""
            fill
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f1d] via-surface to-background" />
        )}
        {!member.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-5xl tracking-tight text-accent/80 md:text-6xl">
              {getInitials(member.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
          {member.name}
        </h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-2/90">
          {member.role}
        </p>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
          {member.bio}
        </p>

        {socialEntries.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {socialEntries.map(([platform, href]) => {
              const { label, Icon } = socialConfig[platform]
              return (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} — ${label}`}
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}

export function AboutPageContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()
      const hero = heroRef.current

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (hero) {
          gsap.fromTo(
            '.about-hero-bg',
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' },
          )

          gsap.fromTo(
            '.about-hero-bg-image',
            { scale: 1.1 },
            { scale: 1, duration: 1.4, ease: 'power3.out' },
          )

          gsap.to('.about-hero-bg-image', {
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
          '.about-visual',
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about-gallery', start: 'top 85%' },
          },
        )

        gsap.fromTo(
          '.about-block',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about-mission', start: 'top 82%' },
          },
        )

        gsap.fromTo(
          '.method-phase',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.methodology-grid', start: 'top 78%' },
          },
        )

        gsap.fromTo(
          '.team-card',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about-team', start: 'top 85%' },
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
        className="about-hero relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="about-hero-bg absolute inset-0" aria-hidden>
          <div className="about-hero-bg-image absolute inset-0 origin-center">
            <Image
              src={aboutPageContent.heroImage.src}
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
            {aboutPageContent.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            L&apos;alliance du sens
            <br />
            et de la rigueur technique
          </h1>
          <RevealText
            as="p"
            text={aboutPage.hero.lead}
            by="word"
            immediate
            delay={0.2}
            className="mt-8 block max-w-xl text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_12px_rgba(14,14,16,0.85)]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact"
              label={aboutPageContent.cta}
              className="!shadow-[0_8px_36px_rgba(39,183,165,0.35)]"
            >
              {aboutPageContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#equipe"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0f1f1d]/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/85 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-2"
            >
              Rencontrer l&apos;équipe
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/10 pt-10">
            {aboutPageContent.stats.map((stat) => (
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
            {aboutPageContent.heroImage.caption}
          </p>
        </div>
      </section>

      {/* ── Galerie culture ── */}
      <section className="about-gallery border-t border-border bg-bg-soft/35 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Culture
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
                Comment nous travaillons
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Collaboration, exigence et produits pensés pour durer — ancrés à Bamako, ouverts sur
              l&apos;Afrique et le monde.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {aboutPageContent.gallery.map((item, index) => (
              <figure
                key={item.src}
                className={cn(
                  'about-visual group relative overflow-hidden rounded-2xl border border-border',
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

      {/* ── Mission & vision ── */}
      <section className="about-mission border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2">
          <article className="about-block overflow-hidden rounded-[1.75rem] border border-border bg-surface p-8 md:p-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
              <Target className="h-4 w-4 text-accent" aria-hidden />
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">
              {aboutPage.mission.label}
            </p>
            <p className="mt-4 font-heading text-[clamp(1.35rem,2.8vw,2rem)] leading-snug tracking-tight text-foreground text-pretty">
              {aboutPage.mission.text}
            </p>
          </article>

          <article className="about-block overflow-hidden rounded-[1.75rem] border border-border bg-[#0f1f1d]/50 p-8 md:p-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
              <Telescope className="h-4 w-4 text-accent" aria-hidden />
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent-2/90">
              {aboutPage.vision.label}
            </p>
            <p className="mt-4 font-heading text-[clamp(1.35rem,2.8vw,2rem)] leading-snug tracking-tight text-foreground text-pretty">
              {aboutPage.vision.text}
            </p>
          </article>
        </div>

        <div className="about-block mx-auto mt-8 max-w-[1400px] overflow-hidden rounded-[1.75rem] border border-border bg-bg-soft/40 p-8 md:p-12">
          <h2 className="font-heading text-2xl tracking-tight text-foreground md:text-3xl">
            {aboutPage.story.title}
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {aboutPage.story.paragraphs.slice(0, 2).map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Méthodologie ── */}
      <section className="border-t border-border bg-bg-soft/20 px-6 py-[10vw] md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] tracking-tight text-foreground">
            Notre méthodologie
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Quatre phases claires — de l&apos;écoute à la livraison — pour des projets lisibles et
            mesurables.
          </p>
          <div className="methodology-grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {methodologyPhases.map((phase, i) => (
              <article
                key={phase.phase}
                className="method-phase rounded-2xl border border-border bg-surface p-6 md:p-8"
              >
                <span className="font-mono text-xs text-accent" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl tracking-tight text-foreground md:text-2xl">
                  {phase.phase}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="border-t border-border px-6 py-[10vw] md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] tracking-tight text-foreground">
            Nos valeurs
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {aboutPage.values.map((value) => (
              <li key={value.index} className="bg-background px-8 py-10 transition-colors hover:bg-surface md:py-12">
                <span className="font-mono text-xs text-accent">{value.index}</span>
                <h3 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Équipe ── */}
      <section
        id="equipe"
        className="about-team scroll-mt-28 border-t border-border bg-bg-soft/35 px-6 py-[10vw] md:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {aboutPageContent.team.eyebrow}
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-foreground">
                {aboutPageContent.team.title}
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {aboutPageContent.team.lead}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative flex min-h-[65vh] flex-col justify-end overflow-hidden border-t border-border">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/projects/studio-render.png"
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
            Prêt à construire
            <br />
            quelque chose de durable ?
          </h2>
          <div className="shrink-0 md:pb-1">
            <MagneticButton href="/contact" label={aboutPageContent.cta}>
              {aboutPageContent.cta}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <p className="mt-4 max-w-xs font-mono text-[11px] uppercase tracking-widest text-foreground/50">
              {aboutPageContent.ctaNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

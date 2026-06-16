'use client'

import { HorizontalScroll } from '@/components/horizontal-scroll'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/data/projects'
import { TransitionLink } from '@/components/page-transition'
import { ArrowUpRight } from 'lucide-react'

export function HomeWork() {
  const intro = (
    <div className="relative z-10 py-[12vw] md:py-0">
      <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-foreground">
        <span className="block">Des solutions</span>
        <span className="block">qui transforment.</span>
      </h2>
      <p className="mt-6 max-w-xs text-pretty leading-relaxed text-foreground/80">
        Chaque projet est une collaboration étroite. Voici les solutions digitales que nous avons
        conçues.
      </p>
      <TransitionLink
        href="/work"
        label="Voir tous les projets"
        className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-opacity hover:opacity-80"
      >
        Voir tous les projets
        <ArrowUpRight className="h-3.5 w-3.5" />
      </TransitionLink>
    </div>
  )

  const items = projects.map((project, i) => (
    <ProjectCard key={project.slug} project={project} index={i} />
  ))

  return <HorizontalScroll intro={intro} items={items} />
}

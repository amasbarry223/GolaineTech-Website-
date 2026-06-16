'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { Project } from '@/data/projects'
import { TransitionLink } from '@/components/page-transition'

export function ProjectCard({
  project,
  className,
  index = 0,
  disableEntrance = false,
  aspect = '4/3',
}: {
  project: Project
  className?: string
  index?: number
  disableEntrance?: boolean
  aspect?: '4/3' | '3/4' | '16/9' | '1/1'
}) {
  const aspectClass =
    aspect === '3/4'
      ? 'aspect-[3/4]'
      : aspect === '16/9'
        ? 'aspect-[16/9]'
        : aspect === '1/1'
          ? 'aspect-square'
          : 'aspect-[4/3]'
  return (
    <motion.div
      initial={disableEntrance ? undefined : { opacity: 0, y: 40 }}
      whileInView={disableEntrance ? undefined : { opacity: 1, y: 0 }}
      viewport={disableEntrance ? undefined : { once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        label={project.title}
        data-cursor="Voir"
        className="group block w-full text-left focus-ring rounded-2xl"
      >
        <div className={`relative ${aspectClass} w-full overflow-hidden rounded-2xl bg-surface`}>
          <Image
            src={project.cover || '/placeholder.svg'}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 95vw, 52vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {project.category}
                </p>
                <h3 className="font-heading text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground" aria-hidden>
                {project.year}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.excerpt}
        </p>
      </TransitionLink>
    </motion.div>
  )
}

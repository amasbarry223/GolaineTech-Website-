'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { TransitionLink, useTransition } from '@/components/page-transition'
import { mainNavLinks, isNavLinkActive } from '@/data/navigation'
import { setLenisStopped } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'

const links = mainNavLinks

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(links[0].href)
  const pathname = usePathname()
  const { navigate } = useTransition()
  const shouldReduceMotion = useReducedMotion()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const hoveredLink = links.find((l) => l.href === hovered) ?? links[0]
  const preview = hoveredLink.preview

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const active = links.find((l) => isNavLinkActive(pathname, l.href))
    if (active) setHovered(active.href)
  }, [open, pathname])

  useEffect(() => {
    setLenisStopped(open)
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      setLenisStopped(false)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !menuRef.current) return
      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'button, a[href]',
      )
      const list = Array.from(focusables).filter((el) => !el.hasAttribute('disabled'))
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-[8000] flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
      <TransitionLink
        href="/"
        label="Accueil"
        className="focus-ring relative z-[8100] font-heading text-lg font-semibold tracking-tight text-foreground"
      >
        Golaine Tech
      </TransitionLink>

      <div className="relative z-[8100] flex items-center gap-2">
        <TransitionLink
          href="/contact"
          label="Démarrer un projet"
          className="focus-ring hidden items-center rounded-full border border-border/60 bg-surface/80 px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] text-foreground/90 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent sm:inline-flex"
        >
          Démarrer un projet
        </TransitionLink>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-haspopup="dialog"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className={`focus-ring inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] transition-all duration-300 ${
            open
              ? 'bg-foreground text-background'
              : 'border border-border/60 bg-surface/80 text-foreground/90 backdrop-blur-sm hover:border-accent hover:text-accent'
          }`}
        >
          <span>{open ? 'Fermer' : 'Menu'}</span>
          <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center" aria-hidden>
            <span
              className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                open ? 'bg-background' : 'bg-accent'
              }`}
            />
            {!open && (
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
            )}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation principale"
            initial={shouldReduceMotion ? false : { clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[8050] bg-background"
          >
            {/* Ambiance — dégradés uniquement, pas de glass */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -right-[15%] top-[5%] h-[65vh] w-[55vw] rounded-full bg-accent/[0.07] blur-[100px]" />
              <div className="absolute -left-[10%] bottom-0 h-[40vh] w-[40vw] rounded-full bg-bg-soft/80 blur-[80px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bg-soft/50" />
            </div>

            <div className="relative flex h-full flex-col">
              <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-6 pt-28 md:flex-row md:items-stretch md:gap-20 md:px-12 md:pb-10 md:pt-32">
                {/* Colonne navigation */}
                <nav className="flex flex-1 flex-col justify-center md:max-w-[54%]">
                  <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:mb-10">
                    Explorer — {String(links.length).padStart(2, '0')} sections
                  </p>

                  <ul className="space-y-0">
                    {links.map((link, i) => {
                      const isActive = isNavLinkActive(pathname, link.href)
                      const isHighlighted = hovered === link.href

                      return (
                        <motion.li
                          key={link.href}
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: i * 0.05,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <TransitionLink
                            ref={i === 0 ? (firstLinkRef as React.Ref<HTMLAnchorElement>) : undefined}
                            href={isActive ? '#' : link.href}
                            label={link.label}
                            onMouseEnter={() => setHovered(link.href)}
                            onFocus={() => setHovered(link.href)}
                            aria-current={isActive ? 'page' : undefined}
                            aria-disabled={isActive}
                            className={cn(
                              'focus-ring group flex w-full items-start gap-4 border-t border-border/25 py-4 text-left transition-colors duration-300 md:gap-6 md:py-5',
                              isHighlighted && 'border-border/40',
                              isActive && 'pointer-events-none',
                            )}
                          >
                            <span
                              className={cn(
                                'mt-2 font-mono text-xs tabular-nums transition-colors duration-300',
                                isActive
                                  ? 'text-accent'
                                  : isHighlighted
                                    ? 'text-foreground/70'
                                    : 'text-muted-foreground/50',
                              )}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>

                            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                              <span
                                className={cn(
                                  'font-heading leading-[0.95] tracking-[-0.03em] transition-colors duration-300',
                                  isActive
                                    ? 'text-accent'
                                    : isHighlighted
                                      ? 'text-foreground'
                                      : 'text-foreground/45 group-hover:text-foreground/80',
                                )}
                                style={{ fontSize: 'clamp(1.85rem, 4.5vw, 3.5rem)' }}
                              >
                                {link.label}
                              </span>

                              <AnimatePresence initial={false}>
                                {(isHighlighted || isActive) && (
                                  <motion.span
                                    key="tagline"
                                    initial={
                                      shouldReduceMotion
                                        ? false
                                        : { opacity: 0, y: -4 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={
                                      shouldReduceMotion
                                        ? undefined
                                        : { opacity: 0, y: -4 }
                                    }
                                    transition={{ duration: 0.25 }}
                                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                                  >
                                    {link.tagline}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </span>

                            <span
                              className={cn(
                                'mt-3 shrink-0 transition-all duration-300',
                                isHighlighted && !isActive
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                              aria-hidden
                            >
                              <ArrowUpRight className="h-4 w-4 text-accent" />
                            </span>
                          </TransitionLink>
                        </motion.li>
                      )
                    })}
                  </ul>

                  {/* Aperçu mobile */}
                  <div className="relative mt-6 h-44 overflow-hidden rounded-2xl md:hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={preview}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={preview}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                            {hoveredLink.label}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {hoveredLink.tagline}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </nav>

                {/* Colonne aperçu — desktop */}
                <div className="relative hidden flex-1 md:flex md:items-center md:justify-end">
                  <div className="relative w-full max-w-[28rem] lg:max-w-[32rem]">
                    <div
                      className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-accent/[0.12] blur-3xl"
                      aria-hidden
                    />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={preview}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 24, scale: 0.97 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : { opacity: 0, y: -12, scale: 1.02 }
                        }
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]"
                      >
                        <Image
                          src={preview}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 35vw, 0px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/15 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                            Aperçu
                          </p>
                          <p className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
                            {hoveredLink.label}
                          </p>
                          <p className="mt-2 max-w-[20rem] text-sm leading-relaxed text-muted-foreground">
                            {hoveredLink.tagline}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <p className="mt-5 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                      Survolez une section
                    </p>
                  </div>
                </div>
              </div>

              {/* Pied du menu */}
              <div className="mt-auto border-t border-border/30 px-6 py-6 md:px-12">
                <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a
                      href="mailto:contact@golaine.tech"
                      className="focus-ring font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
                    >
                      contact@golaine.tech
                    </a>
                    <a
                      href="https://www.linkedin.com/company/golaine-tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
                    >
                      LinkedIn
                    </a>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-border/80">
                      Bamako, Mali
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      navigate('/contact', 'Contact')
                    }}
                    className="focus-ring group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                  >
                    Démarrer un projet
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

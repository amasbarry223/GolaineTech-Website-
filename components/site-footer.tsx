'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { RevealText } from '@/components/reveal-text'
import { MagneticButton } from '@/components/magnetic-button'
import { Marquee } from '@/components/marquee'
import { TransitionLink } from '@/components/page-transition'
import { serviceMarqueeItems } from '@/data/home-services'
import { mainNavLinks } from '@/data/navigation'

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-soft">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block" aria-hidden>
        <Image
          src="/projects/studio-render.png"
          fill
          alt=""
          className="object-cover opacity-30"
          sizes="48vw"
        />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-bg-soft to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 pt-[10vw] pb-8 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between lg:max-w-[62%]">
          <RevealText
            as="h2"
            text={"Parlons de\nvotre projet."}
            by="line"
            className="font-heading text-[clamp(2rem,8vw,5rem)] leading-[0.92] tracking-tight text-foreground"
          />
          <MagneticButton href="/contact" label="Contact" className="shrink-0">
            Démarrer un projet
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>

        <div className="my-14 border-y border-border py-5">
          <Marquee
            items={serviceMarqueeItems}
            duration={28}
            className="font-heading text-2xl uppercase tracking-tight text-muted-foreground md:text-4xl"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Golaine Tech
            </span>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Entreprise d&apos;innovation numérique basée à Bamako, Mali.
              Nous accompagnons les entreprises dans leur transformation digitale
              grâce à des solutions sur mesure — web, mobile, IA et design.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Excellence · Persévérance · Qualité
            </p>
          </div>
          <FooterCol
            title="Navigation"
            items={mainNavLinks.map(({ href, label }) => ({ href, label }))}
          />
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:contact@golaine.tech"
                  className="focus-ring text-sm text-foreground transition-colors hover:text-accent"
                >
                  contact@golaine.tech
                </a>
              </li>
              <li>
                <span className="text-sm text-foreground">Bamako, Mali</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  href: 'https://www.linkedin.com/company/golaine-tech',
                  label: 'LinkedIn',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://github.com/golaine-tech',
                  label: 'GitHub',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://twitter.com/golainetech',
                  label: 'X / Twitter',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
              ].map(({ href, label, svg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  {svg}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Golaine Tech. Tous droits réservés.</span>
          <span>Conçu et développé avec soin — Bamako, Mali</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <TransitionLink
              href={item.href}
              label={item.label}
              className="focus-ring text-sm text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

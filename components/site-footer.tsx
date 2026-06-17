'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
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

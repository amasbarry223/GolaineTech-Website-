import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { contactContent } from '@/data/contact'

const MAP_QUERY = 'Bamako, Mali'
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&hl=fr&z=13&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`

export function ContactMap() {
  return (
    <div className="contact-map">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
            Localisation
          </h2>
          <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
            Golaine Tech opère depuis Bamako et accompagne des clients en Afrique et à
            l&apos;international.
          </p>
        </div>
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          Ouvrir dans Maps
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
        <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border lg:aspect-auto lg:min-h-[360px]">
          <Image
            src={contactContent.locationImage.src}
            fill
            alt={contactContent.locationImage.alt}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 38vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 font-mono text-[11px] uppercase tracking-widest text-foreground/90">
            {contactContent.locationImage.caption}
          </figcaption>
        </figure>

        <div className="relative aspect-[16/7] min-h-[280px] overflow-hidden rounded-2xl border border-border bg-surface sm:min-h-[320px] md:aspect-[21/8] lg:min-h-[360px] lg:aspect-auto lg:h-full">
          <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-border/50" />
          <iframe
            title="Carte — Golaine Tech, Bamako, Mali"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="contact-map-frame absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Bamako, Mali · GMT
      </p>
    </div>
  )
}

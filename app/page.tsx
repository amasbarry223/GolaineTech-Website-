import Image from 'next/image'
import { HomeHero } from '@/components/home/home-hero'
import { HomeAbout } from '@/components/home/home-about'
import { HomeWork } from '@/components/home/home-work'
import { ServicesIntro } from '@/components/home/services-intro'
import { StickyServices } from '@/components/sticky-services'
import { stickyServices } from '@/data/home-services'
import { GsapRevealText } from '@/components/gsap-reveal-text'
import { serviceMarqueeItems } from '@/data/home-services'
import { Marquee } from '@/components/marquee'
import { MagneticButton } from '@/components/magnetic-button'
import { ArrowUpRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <HomeAbout />

      <div className="border-y border-border py-5 opacity-40">
        <Marquee
          items={serviceMarqueeItems}
          duration={48}
          className="font-heading text-lg uppercase tracking-tight text-muted-foreground md:text-xl"
        />
      </div>

      <HomeWork />

      <div className="services-stack relative isolate">
        <ServicesIntro />
        <StickyServices services={stickyServices} />
      </div>

      <section className="relative z-10 min-h-[90vh] overflow-hidden bg-background py-[10vw]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/projects/nova.png"
            fill
            alt=""
            className="object-cover opacity-[0.12]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-6 md:flex-row md:items-end md:justify-between md:px-12">
          <GsapRevealText
            as="h2"
            text={"N'ayez pas peur,\nparlons-en."}
            by="line"
            className="max-w-3xl font-heading text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.9] tracking-tight text-foreground text-balance"
          />
          <div className="shrink-0 md:pb-2">
            <MagneticButton href="/contact" label="Démarrer un projet">
              Démarrer un projet
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}

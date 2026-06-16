'use client'

import Image from 'next/image'
import type { HeroSlideMedia } from '@/data/hero-slides'

type HeroSlideMediaProps = {
  media: HeroSlideMedia
  active: boolean
  priority?: boolean
}

export function HeroSlideMediaView({ media, active, priority }: HeroSlideMediaProps) {
  if (media.type === 'image') {
    return (
      <Image
        src={media.src}
        alt={media.alt ?? ''}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />
    )
  }

  if (media.type === 'video') {
    if (media.src) {
      return (
        <video
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay={active}
          className="h-full w-full object-cover"
        />
      )
    }
    return (
      <>
        <Image
          src={media.poster}
          alt=""
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
          <span className="rounded-full border border-foreground/20 bg-background/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
            Vidéo — ajoutez src dans data/hero-slides.ts
          </span>
        </div>
      </>
    )
  }

  if (media.type === '3d') {
    return (
      <div className="relative h-full w-full" data-hero-3d-scene={media.sceneId ?? 'default'}>
        {media.fallbackImage && (
          <Image
            src={media.fallbackImage}
            alt=""
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Branchez ici votre scène 3D (R3F, Spline, iframe…) — le conteneur est position:absolute inset-0 */}
        <div className="absolute inset-0" id={`hero-3d-${media.sceneId ?? 'slot'}`} />
      </div>
    )
  }
}

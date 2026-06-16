'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { studioReel } from '@/data/studio'
import { cn } from '@/lib/utils'

export function ReelPlayer({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const toggle = () => {
    if (videoError) {
      setPlaying((v) => !v)
      return
    }
    setPlaying(true)
    requestAnimationFrame(() => {
      void videoRef.current?.play()
    })
  }

  return (
    <div className={cn('group relative aspect-video overflow-hidden rounded-3xl border border-border bg-surface', className)}>
      <AnimatePresence mode="wait">
        {playing && !videoError ? (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={studioReel.poster}
              playsInline
              muted
              loop
              controls
              autoPlay
              onEnded={() => setPlaying(false)}
              onError={() => setVideoError(true)}
            >
              <source src={studioReel.src} type="video/mp4" />
            </video>
          </motion.div>
        ) : (
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={studioReel.poster}
              fill
              alt={studioReel.title}
              className={cn(
                'object-cover transition-transform duration-700',
                playing && videoError && 'scale-105',
              )}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-background/30 transition-colors group-hover:bg-background/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {!playing || videoError ? (
        <button
          type="button"
          onClick={toggle}
          aria-label="Lire le reel studio"
          className="focus-ring absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/30 bg-background/80 backdrop-blur-sm transition-transform duration-300 hover:scale-110"
        >
          <span
            className="ml-1 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-foreground"
            aria-hidden
          />
        </button>
      ) : null}

      {playing && videoError && (
        <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 px-4 py-3 text-center text-xs text-muted-foreground backdrop-blur-sm">
          Ajoutez <code className="text-accent">/public/studio-reel.mp4</code> pour activer la lecture vidéo.
        </p>
      )}
    </div>
  )
}

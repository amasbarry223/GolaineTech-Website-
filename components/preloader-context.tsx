'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/smooth-scroll'

const PreloaderContext = createContext({ ready: true })

export function usePreloaderReady() {
  return useContext(PreloaderContext).ready
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('golaine-preloaded') || prefersReducedMotion()) {
      setReady(true)
      return
    }

    const onDone = () => setReady(true)
    window.addEventListener('golaine:preloader-done', onDone)
    return () => window.removeEventListener('golaine:preloader-done', onDone)
  }, [])

  return (
    <PreloaderContext.Provider value={{ ready }}>{children}</PreloaderContext.Provider>
  )
}

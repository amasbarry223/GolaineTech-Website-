'use client'

import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { PageTransitionProvider } from '@/components/page-transition'
import { CustomCursor } from '@/components/custom-cursor'
import { Preloader } from '@/components/preloader'
import { PreloaderProvider } from '@/components/preloader-context'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ScrollTriggerRouteCleanup } from '@/components/scroll-trigger-route-cleanup'
import { GsapDiagnostics } from '@/components/gsap-diagnostics'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageTransitionProvider>
        <PreloaderProvider>
        <a
          href="#main-content"
          className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Aller au contenu
        </a>
        <ScrollTriggerRouteCleanup />
        {process.env.NODE_ENV === 'development' ? <GsapDiagnostics /> : null}
        <Preloader />
        <CustomCursor />
        <SiteNav />
        <main id="main-content">{children}</main>
        <SiteFooter />
        </PreloaderProvider>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  )
}

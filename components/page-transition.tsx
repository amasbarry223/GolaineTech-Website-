'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useAnimationControls, useReducedMotion } from 'motion/react'
import { scrollToTop, prefersReducedMotion } from '@/lib/smooth-scroll'
import { destroyScrollTriggers } from '@/lib/gsap-cleanup'
import { cn } from '@/lib/utils'

const routeLabels: Record<string, string> = {
  '/': 'Accueil',
  '/services': 'Services',
  '/work': 'Projets',
  '/a-propos': 'À propos',
  '/formations': 'Formations',
  '/contact': 'Contact',
  '/studio': 'Studio',
}

function labelFromHref(href: string, fallback?: string) {
  const path = href.split('?')[0].split('#')[0]
  if (fallback) return fallback
  if (routeLabels[path]) return routeLabels[path]
  if (path.startsWith('/work/')) return 'Projet'
  if (path.startsWith('/careers/')) return 'Carrières'
  return 'Golaine Tech'
}

type TransitionContextValue = {
  navigate: (href: string, label?: string) => void
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
})

export function useTransition() {
  return useContext(TransitionContext)
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const controls = useAnimationControls()
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)
  const busy = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  const runTransition = useCallback(
    async (href: string, lbl = '') => {
      if (busy.current) return
      const clean = href.split('?')[0].split('#')[0]
      if (clean === pathname) return
      busy.current = true

      if (shouldReduceMotion || prefersReducedMotion()) {
        destroyScrollTriggers()
        router.push(href)
        scrollToTop(true)
        busy.current = false
        return
      }

      setLabel(labelFromHref(href, lbl))
      setActive(true)

      await controls.start('cover')
      destroyScrollTriggers()
      router.push(href)
      await new Promise((r) => setTimeout(r, 480))
      scrollToTop(true)
      await controls.start('reveal')

      setActive(false)
      busy.current = false
    },
    [controls, pathname, router, shouldReduceMotion],
  )

  useEffect(() => {
    const onPopState = async () => {
      if (busy.current || shouldReduceMotion || prefersReducedMotion()) return
      busy.current = true
      setLabel(labelFromHref(window.location.pathname))
      setActive(true)
      destroyScrollTriggers()
      await controls.start('cover')
      await new Promise((r) => setTimeout(r, 220))
      scrollToTop(true)
      await controls.start('reveal')
      setActive(false)
      busy.current = false
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [controls, shouldReduceMotion])

  const navigate = useCallback(
    (href: string, lbl = '') => {
      void runTransition(href, lbl)
    },
    [runTransition],
  )

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <motion.div
        aria-hidden
        className={cn(
          'pointer-events-none fixed inset-0 z-[9000] flex items-center justify-center bg-accent',
          !active && 'hidden',
        )}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { y: '100%' },
          cover: {
            y: '0%',
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          },
          reveal: {
            y: '-100%',
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          },
        }}
      >
        <motion.span
          className="font-heading text-3xl tracking-tight text-background md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {label || 'Golaine Tech'}
        </motion.span>
      </motion.div>
    </TransitionContext.Provider>
  )
}

type TransitionLinkProps = React.ComponentProps<typeof Link> & {
  label?: string
}

export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink({ href, label, onClick, children, ...props }, ref) {
  const { navigate } = useTransition()
  return (
    <Link
      ref={ref}
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.button !== 0
        )
          return
        e.preventDefault()
        navigate(href.toString(), label)
      }}
      {...props}
    >
      {children}
    </Link>
  )
})

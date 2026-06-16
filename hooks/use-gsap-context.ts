import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'

/** Scoped GSAP hook with automatic plugin registration and cleanup. */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  callback: () => void | (() => void),
  deps: unknown[] = [],
) {
  const scopeRef = useRef<T>(null)

  useGSAP(
    () => {
      registerGsapPlugins()
      return callback()
    },
    { scope: scopeRef, dependencies: deps },
  )

  return scopeRef
}

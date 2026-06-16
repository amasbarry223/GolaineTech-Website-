export type GsapDomScenario = 'idle' | 'scroll' | 'resize' | 'navigation' | 'pin-active'

type GsapDomReport = {
  scenario: GsapDomScenario
  pathname: string
  scrollY: number
  pinned: boolean
  triggerCount: number
  at: string
}

const state: {
  scenario: GsapDomScenario
  lastScrollAt: number
  lastResizeAt: number
  lastNavigationAt: number
} = {
  scenario: 'idle',
  lastScrollAt: 0,
  lastResizeAt: 0,
  lastNavigationAt: 0,
}

function pickScenario(): GsapDomScenario {
  const now = Date.now()
  if (now - state.lastNavigationAt < 1200) return 'navigation'
  if (now - state.lastResizeAt < 800) return 'resize'
  if (now - state.lastScrollAt < 400) return 'scroll'
  return state.scenario
}

export function markGsapScenario(scenario: GsapDomScenario) {
  state.scenario = scenario
  const now = Date.now()
  if (scenario === 'scroll') state.lastScrollAt = now
  if (scenario === 'resize') state.lastResizeAt = now
  if (scenario === 'navigation') state.lastNavigationAt = now
}

export function reportGsapDomError(error: Error, extra?: Partial<GsapDomReport>) {
  if (process.env.NODE_ENV !== 'development') return

  const report: GsapDomReport = {
    scenario: extra?.scenario ?? pickScenario(),
    pathname: extra?.pathname ?? window.location.pathname,
    scrollY: extra?.scrollY ?? window.scrollY,
    pinned: extra?.pinned ?? false,
    triggerCount: extra?.triggerCount ?? 0,
    at: new Date().toISOString(),
  }

  console.groupCollapsed(
    `%c[GSAP DOM] ${error.message}`,
    'color:#27b7a5;font-weight:700',
  )
  console.table(report)
  console.trace(error)
  console.groupEnd()
}

import { projects } from '@/data/projects'

export type NavLink = {
  href: string
  label: string
  preview: string
  tagline: string
}

export const mainNavLinks: NavLink[] = [
  {
    href: '/',
    label: 'Accueil',
    preview: '/projects/hero-render.png',
    tagline: 'Transformation digitale à Bamako',
  },
  {
    href: '/services',
    label: 'Services',
    preview: '/projects/dashboard.png',
    tagline: 'Web, mobile, IA & design UI/UX',
  },
  {
    href: '/work',
    label: 'Projets',
    preview: projects[0]?.cover ?? '/projects/superapp.png',
    tagline: 'Réalisations & études de cas',
  },
  {
    href: '/a-propos',
    label: 'À propos',
    preview: '/projects/atelier.png',
    tagline: 'L’équipe et notre méthode',
  },
  {
    href: '/formations',
    label: 'Formations',
    preview: '/projects/elearning.png',
    tagline: 'Montée en compétences sur mesure',
  },
  {
    href: '/contact',
    label: 'Contact',
    preview: '/projects/lumen.png',
    tagline: 'Démarrer un projet ensemble',
  },
]

export function isNavLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

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
    preview: '/professional-male-developer-manages-neural-network-desk.jpg',
    tagline: 'Transformation digitale à Bamako',
  },
  {
    href: '/services',
    label: 'Services',
    preview: '/desola-lanre-ologun-kwzWjTnDPLk-unsplash.jpg',
    tagline: 'Web, mobile, IA & design UI/UX',
  },
  {
    href: '/work',
    label: 'Projets',
    preview: '/it-specialist-working-data-center-facility-housing-storage-hardware-close-up.jpg',
    tagline: 'Réalisations & études de cas',
  },
  {
    href: '/a-propos',
    label: 'À propos',
    preview: '/desola-lanre-ologun-IAXBj6u54nU-unsplash.jpg',
    tagline: "L'équipe et notre méthode",
  },
  {
    href: '/formations',
    label: 'Formations',
    preview: '/from-shot-students-with-phones.jpg',
    tagline: 'Montée en compétences sur mesure',
  },
  {
    href: '/contact',
    label: 'Contact',
    preview: '/desola-lanre-ologun-uAcoCc1dKiA-unsplash.jpg',
    tagline: 'Démarrer un projet ensemble',
  },
]

export function isNavLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

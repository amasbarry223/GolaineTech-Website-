import type { Metadata } from 'next'
import { AboutPageContent } from '@/components/about/about-page-content'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Golaine Tech : transformation numérique, IA et excellence opérationnelle. Découvrez notre histoire, nos valeurs et notre méthode depuis Bamako, Mali.",
  openGraph: {
    title: 'À propos — Golaine Tech',
    description: 'Mission, valeurs et méthode de Golaine Tech à Bamako.',
    images: [{ url: '/projects/atelier.png', width: 1200, height: 630, alt: 'À propos Golaine Tech' }],
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}

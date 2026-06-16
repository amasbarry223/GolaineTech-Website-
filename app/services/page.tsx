import type { Metadata } from 'next'
import { ServicesPageContent } from '@/components/services/services-page-content'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Applications mobiles, développement web, IA, logiciels métiers, design UI/UX et plus — Golaine Tech accompagne votre transformation numérique.',
  openGraph: {
    title: 'Services — Golaine Tech',
    description: 'Une suite complète de services pour votre transformation numérique.',
    images: [{ url: '/projects/dashboard.png', width: 1200, height: 630, alt: 'Services Golaine Tech' }],
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}

import type { Metadata } from 'next'
import { FormationsPageContent } from '@/components/formations/formations-page-content'

export const metadata: Metadata = {
  title: 'Formations',
  description:
    'Formations IA & Tech par Golaine Tech : IA & ML, no-code, React/Next.js, UI/UX, cybersécurité et maintenance — du no-code à l’ingénierie avancée.',
  openGraph: {
    title: 'Formations — Golaine Tech',
    description: 'Programmes orientés résultats pour monter en compétences.',
    images: [{ url: '/projects/elearning.png', width: 1200, height: 630, alt: 'Formations Golaine Tech' }],
  },
}

export default function FormationsPage() {
  return <FormationsPageContent />
}

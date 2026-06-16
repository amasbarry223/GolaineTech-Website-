import type { Metadata } from 'next'
import { WorkPageContent } from '@/components/work/work-page-content'

export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Découvrez les réalisations de Golaine Tech : applications mobiles, plateformes web, solutions IA et design systems pour des entreprises africaines.',
  openGraph: {
    title: 'Projets — Golaine Tech',
    description:
      'Réalisations digitales : mobile, web, IA et design pour entreprises africaines.',
    images: [{ url: '/projects/superapp.png', width: 1200, height: 630, alt: 'Projets Golaine Tech' }],
  },
}

export default function WorkPage() {
  return <WorkPageContent />
}

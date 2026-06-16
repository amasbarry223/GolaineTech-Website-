import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/contact/contact-page-content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Golaine Tech pour démarrer votre projet de transformation numérique. Applications mobiles, web, IA — basés à Bamako, Mali.',
  openGraph: {
    title: 'Contact — Golaine Tech',
    description: 'Démarrez votre projet avec Golaine Tech — réponse sous 48h.',
    images: [{ url: '/projects/atelier.png', width: 1200, height: 630, alt: 'Contact Golaine Tech' }],
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Découvrez le studio Golaine Tech : culture créative, reel, distinctions et opportunités de carrière à Bamako, Mali.',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}

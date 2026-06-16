import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CareerPageContent } from '@/components/careers/career-page-content'
import { getCareerBySlug, studioCareers } from '@/data/studio'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return studioCareers.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const career = getCareerBySlug(slug)
  if (!career) return { title: 'Offre introuvable' }

  return {
    title: `${career.title} — Carrières`,
    description: career.intro,
    openGraph: {
      title: `${career.title} — Golaine Tech`,
      description: career.intro,
      type: 'website',
      images: [{ url: '/projects/studio-render.png', width: 1200, height: 630 }],
    },
  }
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params
  const career = getCareerBySlug(slug)
  if (!career) notFound()

  return <CareerPageContent career={career} />
}

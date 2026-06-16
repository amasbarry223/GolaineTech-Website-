import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { studioCareers } from '@/data/studio'
import { siteUrl } from '@/lib/site-url'

const staticRoutes = [
  '',
  '/a-propos',
  '/contact',
  '/formations',
  '/services',
  '/work',
  '/studio',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const careerPages: MetadataRoute.Sitemap = studioCareers.map((career) => ({
    url: `${siteUrl}/careers/${career.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...pages, ...projectPages, ...careerPages]
}

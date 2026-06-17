import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Syne, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/site-shell'
import { siteUrl } from '@/lib/site-url'

const display = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const body = Inter({
  variable: '--font-body',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Golaine Tech — Transformation Numérique en Afrique',
    template: '%s — Golaine Tech',
  },
  description:
    'Golaine Tech accompagne les entreprises dans leur transformation numérique. Applications mobiles, développement web, intelligence artificielle et formations tech depuis Bamako, Mali.',
  openGraph: {
    title: 'Golaine Tech — Transformation Numérique en Afrique',
    description:
      "Plateforme d'innovation dédiée à la transformation numérique. Votre ambition digitale, notre mission.",
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e0e10',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

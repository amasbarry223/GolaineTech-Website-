/** URL canonique du site — preview Vercel ou domaine custom en production */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://golaine.tech')
).replace(/\/$/, '')

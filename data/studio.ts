export type StudioAward = {
  year: string
  title: string
  org: string
}

export type StudioCareer = {
  slug: string
  title: string
  type: string
  location: string
  intro: string
  missions: string[]
  profile: string[]
}

export const studioReel = {
  poster: '/projects/aurora.png',
  /** Placeholder — ajouter /public/studio-reel.mp4 pour la lecture inline */
  src: '/studio-reel.mp4',
  title: 'Reel studio Golaine Tech',
}

export const studioAwards: StudioAward[] = [
  { year: '2025', title: 'Innovation digitale', org: 'Tech Afrique Awards' },
  { year: '2024', title: 'Excellence UX', org: 'Design Summit Bamako' },
  { year: '2024', title: 'Projet IA responsable', org: 'Golaine Tech Labs' },
]

export const studioCareers: StudioCareer[] = [
  {
    slug: 'developpeur-fullstack',
    title: 'Développeur·se Full-Stack',
    type: 'CDI',
    location: 'Bamako',
    intro:
      'Vous construisez des produits web et mobile de bout en bout, en collaboration étroite avec design et produit.',
    missions: [
      'Concevoir et livrer des features Next.js / React Native',
      'Participer aux revues de code et à la qualité technique',
      'Collaborer avec les designers sur les interfaces',
      'Contribuer à l’architecture et aux choix stack',
    ],
    profile: [
      '3+ ans d’expérience full-stack',
      'Maîtrise TypeScript, React, Node.js',
      'Sens du craft et de la documentation',
      'Anglais technique lu/écrit',
    ],
  },
  {
    slug: 'designer-ui-ux',
    title: 'Designer UI/UX',
    type: 'CDI',
    location: 'Remote friendly',
    intro:
      'Vous transformez des enjeux métier en parcours clairs, des wireframes aux interfaces haute fidélité.',
    missions: [
      'Mener des ateliers et interviews utilisateurs',
      'Produire wireframes, prototypes et design systems',
      'Travailler main dans la main avec l’équipe dev',
      'Mesurer et itérer sur la conversion',
    ],
    profile: [
      'Portfolio produits digitaux B2B ou SaaS',
      'Figma avancé, motion de base apprécié',
      'Culture accessibilité et design system',
      'Français courant, anglais un plus',
    ],
  },
  {
    slug: 'ingenieur-ia',
    title: 'Ingénieur·e IA',
    type: 'CDI',
    location: 'Bamako',
    intro:
      'Vous déployez des assistants et pipelines IA responsables, du prototype à la production.',
    missions: [
      'Intégrer LLM, RAG et outils métier',
      'Industrialiser les pipelines et le monitoring',
      'Documenter gouvernance et limites des modèles',
      'Former les équipes client à l’usage',
    ],
    profile: [
      'Expérience Python / TypeScript et APIs IA',
      'Connaissance MLOps ou équivalent',
      'Rigueur sur la sécurité des données',
      'Curiosité produit et pédagogie',
    ],
  },
]

export const studioServices = [
  'Applications Mobiles',
  'Développement Web',
  'Intelligence Artificielle',
  'Logiciels Métiers',
  'Design UI/UX',
  'Formations Tech',
  'Maintenance',
  'Sécurité Informatique',
  'Téléphonie IP',
]

export const studioMethodology = [
  {
    phase: 'Découverte',
    description:
      "Analyse approfondie de vos objectifs métier, de vos contraintes et de votre contexte. Nous ne développons pas avant de comprendre.",
  },
  {
    phase: 'Conception',
    description:
      "Wireframes, prototypes interactifs et architecture technique validés ensemble avant le premier sprint de développement.",
  },
  {
    phase: 'Développement',
    description:
      "Sprints agiles courts, livraisons régulières, code review systématique et tests automatisés à chaque étape.",
  },
  {
    phase: 'Déploiement',
    description:
      "Mise en production maîtrisée, monitoring continu, formation des équipes et accompagnement post-lancement.",
  },
]

export const studioRealisations = [
  { src: '/projects/nova.png', label: 'Nova — Interface produit' },
  { src: '/projects/elearning.png', label: 'E-Learning — Plateforme' },
  { src: '/projects/monolith.png', label: 'Monolith — Architecture' },
  { src: '/projects/superapp.png', label: 'Super-App — Mobile' },
  { src: '/projects/aurora.png', label: 'Aurora — Design system' },
  { src: '/projects/assistant-ia.png', label: 'Assistant IA' },
]

export function getCareerBySlug(slug: string) {
  return studioCareers.find((c) => c.slug === slug)
}

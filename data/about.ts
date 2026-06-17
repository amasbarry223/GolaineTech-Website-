export const aboutContent = {
  eyebrow: 'À propos',
  title: "Golaine Tech : l'alliance du sens et de la rigueur technique",
  lead: 'Transformation numérique, IA et excellence opérationnelle. Nous construisons des produits numériques fiables, beaux et alignés sur vos objectifs business.',
  paragraphs: [
    'Notre méthode associe cadrage, prototypage et livraisons itératives : vous voyez vite une première version utile, puis nous la renforçons avec la mesure et le feedback terrain. Chaque jalon est explicite — budget, délais et périmètre restent lisibles tout au long du projet.',
    'Nous intervenons auprès des équipes métiers comme des directions techniques : ateliers, documentation et transfert pour que vos collaborateurs restent autonomes après le go-live.',
  ],
  highlights: [
    'Stratégie produit, design UI/UX et développement web & mobile',
    "Intégration d'IA et d'automatisation là où le ROI est clair",
    "Accompagnement jusqu'au run : maintenance, évolutions, transfert de compétences",
  ],
  cta: 'En savoir plus sur notre histoire',
  image: {
    src: '/desola-lanre-ologun-BVr3XaBiWLU-unsplash.jpg',
    alt: 'Équipe collaborant sur un projet numérique',
    caption: 'Collaboration, exigence et produits pensés pour durer.',
  },
}

export type TeamSocialPlatform = 'linkedin' | 'github' | 'twitter' | 'instagram'

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  socials: Partial<Record<TeamSocialPlatform, string>>
}

export const aboutPageContent = {
  eyebrow: 'À propos',
  heroImage: {
    src: '/projects/atelier_ai.png',
    alt: 'Équipe Golaine Tech en session de travail',
    caption: 'Bamako, Mali · Innovation ancrée',
  },
  stats: [
    { value: '2019', label: 'Création' },
    { value: '3', label: 'Talents' },
    { value: '100%', label: 'Engagement' },
  ],
  gallery: [
    {
      src: '/projects/studio-render.png',
      alt: 'Studio Golaine Tech',
      label: 'Studio',
    },
    {
      src: '/projects/atelier_ai.png',
      alt: 'Session collaborative',
      label: 'Collaboration',
    },
    {
      src: '/projects/aurora.png',
      alt: 'Design system Golaine Tech',
      label: 'Design',
    },
  ],
  team: {
    eyebrow: 'Équipe',
    title: 'Les visages derrière Golaine Tech',
    lead: 'Des profils complémentaires — produit, design, ingénierie et IA — unis par la même exigence de livraison.',
  },
  cta: 'Démarrer un projet',
  ctaNote: 'Réponse sous 48h · Bamako & remote',
}

export const teamMembers: TeamMember[] = [
  {
    id: 'mody-barry',
    name: 'Mody Barry',
    role: 'Développeur full-stack',
    bio: 'Applications web et mobile, APIs et livraison de bout en bout.',
    image: '/barry-optimized.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/company/golaine-tech',
      github: 'https://github.com/golaine-tech',
    },
  },
  {
    id: 'sekou-cisse',
    name: 'Sekou Cissé',
    role: 'Développeur Web',
    bio: 'Interfaces performantes, intégration front-end et expérience utilisateur soignée.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/golaine-tech',
      github: 'https://github.com/golaine-tech',
    },
  },
  {
    id: 'hamadou-dicko',
    name: 'Hamadou Dicko',
    role: 'Développeur',
    bio: 'Conception et développement de solutions numériques fiables pour Golaine Tech.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/golaine-tech',
    },
  },
]

export const methodologyPhases = [
  {
    phase: 'Écoute & Analyse',
    description: 'Ateliers, audit, cadrage et définition des indicateurs de succès.',
  },
  {
    phase: 'Conception',
    description: 'UX/UI, architecture, backlog priorisé et prototypes testables.',
  },
  {
    phase: 'Développement',
    description: 'Itérations courtes, revue de code et environnements de recette.',
  },
  {
    phase: 'Livraison & Suivi',
    description: 'Mise en production, monitoring, formation et amélioration continue.',
  },
]

export const aboutPage = {
  hero: {
    title: "L'alliance du sens et de la rigueur technique",
    lead: aboutContent.lead,
  },
  story: {
    title: 'Qui sommes-nous ?',
    paragraphs: [
      "Golaine Tech est une entreprise d'innovation dédiée à la transformation numérique. Nous aidons les organisations à concevoir des solutions digitales sur mesure, à améliorer leurs performances, à automatiser leurs processus et à exploiter les technologies modernes.",
      'Ancrés en Afrique, nous établissons des partenariats durables pour concrétiser les ambitions digitales de nos clients — avec la même exigence que nous portons sur chaque livrable.',
      ...aboutContent.paragraphs,
    ],
  },
  mission: {
    label: 'Notre mission',
    text: 'Accompagner les entreprises dans leur croissance grâce à des solutions digitales performantes, intuitives et durables.',
  },
  vision: {
    label: 'Notre vision',
    text: 'Devenir le partenaire technologique de référence en transformation numérique.',
  },
  values: [
    {
      index: '01',
      title: 'Excellence',
      description:
        'Des livrables de haute qualité — code, design, communication — et une transparence totale à chaque étape.',
    },
    {
      index: '02',
      title: 'Persévérance',
      description:
        "Un engagement continu jusqu'à l'impact mesurable, au-delà de la mise en production.",
    },
    {
      index: '03',
      title: 'Qualité',
      description:
        'Des standards non négociables en matière de tests, accessibilité et sécurité à chaque jalon.',
    },
  ],
  differentiators: [
    'Expertise technique avancée',
    'Solutions personnalisées',
    'Innovation continue (IA et technologies modernes)',
    'Accompagnement client dédié',
    'Engagement qualité',
    'Approche centrée utilisateur',
  ],
  approach: aboutContent.highlights,
}

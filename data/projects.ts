export type Project = {
  slug: string
  title: string
  client: string
  category: string
  year: string
  role: string[]
  cover: string
  excerpt: string
  intro: string
  sections: {
    kind: 'image' | 'text' | 'gallery' | 'quote'
    image?: string
    images?: string[]
    heading?: string
    body?: string
    quote?: string
    author?: string
  }[]
}

export const projects: Project[] = [
  {
    slug: 'elearning',
    title: 'Plateforme E-Learning',
    client: 'Golaine Tech',
    category: 'Développement Web',
    year: '2025',
    role: ['UX/UI Design', 'Développement Next.js', 'Intégration API'],
    cover: '/projects/elearning.png',
    excerpt: "Une plateforme d'apprentissage en ligne pensée pour l'Afrique francophone.",
    intro:
      "Golaine Tech a conçu et développé une plateforme e-learning responsive, intuitive et performante, permettant aux apprenants africains d'accéder à des formations de qualité depuis n'importe quel appareil.",
    sections: [
      { kind: 'image', image: '/projects/elearning.png' },
      {
        kind: 'text',
        heading: "Expérience d'apprentissage fluide",
        body: "Nous avons repensé le parcours apprenant de A à Z : tableaux de bord personnalisés, suivi de progression en temps réel, lecteur vidéo optimisé pour les connexions bas débit et système de certification automatisé.",
      },
      {
        kind: 'quote',
        quote: "Golaine Tech a livré une plateforme qui dépasse nos attentes en termes de performance et d'accessibilité.",
        author: 'Directeur pédagogique, client Golaine Tech',
      },
      { kind: 'image', image: '/projects/dashboard.png' },
    ],
  },
  {
    slug: 'superapp',
    title: 'Super-App de Services',
    client: 'Golaine Tech',
    category: 'Applications Mobiles',
    year: '2025',
    role: ['Direction produit', 'UX/UI Mobile', 'Développement React Native'],
    cover: '/projects/superapp.png',
    excerpt: 'Une super-app qui centralise mobilité, paiement et services du quotidien.',
    intro:
      "Face à la fragmentation des services numériques en Afrique, Golaine Tech a développé une super-app unifiée intégrant transport, paiements mobiles, livraison et services de santé dans une seule expérience fluide.",
    sections: [
      { kind: 'image', image: '/projects/superapp.png' },
      {
        kind: 'text',
        heading: 'Un écosystème dans votre poche',
        body: "Architecture modulaire, onboarding en moins de 2 minutes, paiements offline-first et UX optimisée pour les appareils d'entrée de gamme : chaque décision technique sert l'accessibilité réelle.",
      },
      { kind: 'image', image: '/projects/retail.png' },
    ],
  },
  {
    slug: 'dashboard-analytics',
    title: 'Dashboard Analytics',
    client: 'Golaine Tech',
    category: 'Logiciels Métiers',
    year: '2024',
    role: ['Design produit', 'Développement', 'Visualisation de données'],
    cover: '/projects/dashboard.png',
    excerpt: 'Un tableau de bord décisionnel pour piloter la croissance en temps réel.',
    intro:
      'Pour aider nos clients à prendre des décisions basées sur la donnée, Golaine Tech a conçu un dashboard analytics centralisé, combinant indicateurs métier, alertes intelligentes et rapports automatisés.',
    sections: [
      { kind: 'image', image: '/projects/dashboard.png' },
      {
        kind: 'text',
        heading: 'La donnée au service de la décision',
        body: 'Visualisations interactives, filtres dynamiques, exports personnalisés et alertes temps réel : le tableau de bord transforme des données brutes en intelligence actionnable pour les équipes dirigeantes.',
      },
      { kind: 'image', image: '/projects/elearning.png' },
    ],
  },
  {
    slug: 'assistant-ia',
    title: 'Assistant IA Documentaire',
    client: 'Golaine Tech',
    category: 'Intelligence Artificielle',
    year: '2025',
    role: ['Architecture IA', 'RAG & LLM', 'Développement web'],
    cover: '/projects/assistant-ia.png',
    excerpt: 'Un assistant IA qui extrait, analyse et répond sur vos documents métier.',
    intro:
      "Golaine Tech a développé un assistant documentaire intelligent basé sur la technologie RAG (Retrieval-Augmented Generation), permettant aux entreprises d'interroger leurs archives, contrats et rapports en langage naturel.",
    sections: [
      { kind: 'image', image: '/projects/assistant-ia.png' },
      {
        kind: 'text',
        heading: "L'IA qui lit vos documents",
        body: "Ingestion automatique de PDF, Word et images, indexation vectorielle sécurisée, réponses sourcées et auditables, interface conversationnelle intuitive : l'information critique devient instantanément accessible.",
      },
      {
        kind: 'quote',
        quote: "L'assistant IA de Golaine Tech nous a fait gagner des heures de recherche documentaire chaque semaine.",
        author: 'Responsable conformité, entreprise cliente',
      },
      { kind: 'image', image: '/projects/design-system.png' },
    ],
  },
  {
    slug: 'design-system',
    title: 'Design System & Refonte',
    client: 'Golaine Tech',
    category: 'Design UI/UX',
    year: '2024',
    role: ['Recherche utilisateur', 'Design System', 'Prototypage'],
    cover: '/projects/design-system.png',
    excerpt: 'Un design system unifié pour accélérer la création de produits digitaux.',
    intro:
      "Golaine Tech a conçu un design system complet — tokens, composants, patterns et documentation — permettant à nos équipes de livrer des interfaces cohérentes, accessibles et évolutives sur tous les projets.",
    sections: [
      { kind: 'image', image: '/projects/design-system.png' },
      {
        kind: 'text',
        heading: 'La cohérence comme fondation',
        body: "Bibliothèque de 80+ composants Figma documentés, variables de design synchronisées avec le code, guidelines d'accessibilité WCAG AA et storybook interactif : le design system devient le langage commun des équipes.",
      },
      { kind: 'image', image: '/projects/assistant-ia.png' },
    ],
  },
  {
    slug: 'retail-mobile',
    title: 'Application Mobile Retail',
    client: 'Golaine Tech',
    category: 'Applications Mobiles',
    year: '2024',
    role: ['UX/UI Mobile First', 'Publication stores', 'Intégration API'],
    cover: '/projects/retail.png',
    excerpt: 'Une app e-commerce mobile native, rapide et pensée pour la conversion.',
    intro:
      "Golaine Tech a conçu et développé une application mobile retail pour un client du secteur grande distribution, avec un focus sur la performance, la fluidité d'achat et l'expérience de livraison.",
    sections: [
      { kind: 'image', image: '/projects/retail.png' },
      {
        kind: 'text',
        heading: "L'achat en 3 taps",
        body: "Catalogue filtrable, paiement one-tap, suivi de livraison en temps réel, programme de fidélité intégré et notifications push personnalisées : chaque fonctionnalité réduit la friction vers l'achat.",
      },
      { kind: 'image', image: '/projects/superapp.png' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

export type FormationLevel = 'Débutant' | 'Intermédiaire' | 'Expert'

export type FormationProgram = {
  slug: string
  title: string
  description: string
  duration: string
  maxParticipants: number
  pricing: string
  level: FormationLevel
  featured?: boolean
  topics: string[]
  image?: string
}

export const formationsContent = {
  eyebrow: 'Formations',
  title: 'Formations IA & Tech',
  lead: "Des parcours concrets pour monter en compétence rapidement — du no-code à l'ingénierie avancée.",
  stats: [
    { value: '50+', label: 'Sessions livrées' },
    { value: '12', label: 'Entreprises accompagnées' },
    { value: '98%', label: 'Satisfaction participants' },
  ],
  whyUs: [
    {
      title: 'Experts terrain',
      description:
        'Formateurs qui pratiquent au quotidien sur des projets réels — pas uniquement en salle de cours.',
    },
    {
      title: 'Supports à jour',
      description:
        'Syllabus revus chaque trimestre selon les évolutions React, IA et cybersécurité.',
    },
    {
      title: 'Mises en situation',
      description:
        'Exercices tirés de vos outils et cas métier, pas de slides génériques déconnectés du terrain.',
    },
    {
      title: 'Suivi post-formation',
      description:
        'Point à 30 jours, ressources complémentaires et canal de questions pour ancrer les acquis.',
    },
  ],
  audiences: [
    {
      title: 'Directions & métiers',
      description: "Comprendre l'IA, le digital et les enjeux produit sans jargon technique.",
    },
    {
      title: 'Équipes techniques',
      description: 'Monter en niveau sur React, Next.js, MLOps et bonnes pratiques de delivery.',
    },
    {
      title: 'DSI & ops',
      description: 'Cybersécurité, maintenance avancée et gouvernance des systèmes.',
    },
  ],
  formats: [
    {
      index: '01',
      title: 'Ateliers pratiques',
      description:
        'Sessions courtes et immersives sur vos cas réels. Vous repartez avec des livrables applicables dès le lendemain.',
    },
    {
      index: '02',
      title: 'Accompagnement personnalisé',
      description:
        'Parcours sur mesure selon votre niveau, vos outils et vos objectifs — en présentiel ou remote.',
    },
    {
      index: '03',
      title: 'Supports durables',
      description:
        'Documentation, replays et fiches mémo pour que la montée en compétences continue après la formation.',
    },
  ],
  process: [
    {
      step: 'Diagnostic',
      detail: 'Atelier de cadrage : niveau, objectifs, contraintes calendaires et périmètre.',
    },
    {
      step: 'Programme',
      detail: 'Syllabus validé ensemble, supports adaptés à votre contexte métier.',
    },
    {
      step: 'Livraison',
      detail: 'Sessions interactives, exercices guidés et retours en direct sur vos pratiques.',
    },
    {
      step: 'Suivi',
      detail: "Bilan à 30 jours, ressources complémentaires et points d'amélioration.",
    },
  ],
  faq: [
    {
      q: 'Les formations sont-elles sur site ou à distance ?',
      a: 'Les deux. Nous adaptons le format à votre équipe : présentiel à Bamako, hybride ou entièrement remote.',
    },
    {
      q: 'Peut-on personnaliser le contenu ?',
      a: "Oui. Chaque programme part d'un diagnostic pour coller à vos outils, votre secteur et votre niveau.",
    },
    {
      q: 'Quelle taille de groupe recommandez-vous ?',
      a: 'La taille maximale varie selon le programme (voir le catalogue). Au-delà, nous proposons des cohortes.',
    },
    {
      q: 'Comment obtenir un devis ?',
      a: "Cliquez sur « S'inscrire » ou contactez-nous avec le programme souhaité. Réponse sous 48h avec une proposition adaptée.",
    },
  ],
  cta: 'Demander un programme sur mesure',
  heroImage: {
    src: '/projects/elearning.png',
    alt: 'Plateforme e-learning — formation digitale Golaine Tech',
    caption: 'Bamako & remote · Diagnostic offert',
  },
  gallery: [
    {
      src: '/african-american-woman-working-from-home.jpg',
      alt: 'E-Learning — Golaine Tech',
      label: 'E-Learning',
    },
    {
      src: '/ai-cloud-concept-with-robot-arms.jpg',
      alt: 'Formation IA & ML — Golaine Tech',
      label: 'IA & ML',
    },
    {
      src: '/home-made-robot-desk.jpg',
      alt: 'Atelier pratique — Golaine Tech',
      label: 'Atelier',
    },
  ],
}

export const formationPrograms: FormationProgram[] = [
  {
    slug: 'ia-fondamentaux',
    title: 'IA & Machine Learning — Fondamentaux',
    description:
      "Comprendre les briques ML, évaluer des cas d'usage et démarrer un POC responsable.",
    duration: '3 jours',
    maxParticipants: 16,
    pricing: 'Sur devis',
    level: 'Intermédiaire',
    featured: true,
    image: '/ai-cloud-with-robot-head.jpg',
    topics: [
      'Données & features',
      'Modèles supervisés / non supervisés',
      'Évaluation & biais',
      'Mise en production — introduction',
    ],
  },
  {
    slug: 'no-code-low-code',
    title: 'Automatisation no-code / low-code',
    description:
      'Automatiser des workflows métiers sans sacrifier la gouvernance ni la sécurité.',
    duration: '2 jours',
    maxParticipants: 20,
    pricing: 'Sur devis',
    level: 'Débutant',
    image: '/automatisation.jpg',
    topics: [
      'Cartographie des processus',
      'Outils no-code & intégrations',
      "Gouvernance & droits d'accès",
      'Monitoring des automatisations',
    ],
  },
  {
    slug: 'react-nextjs',
    title: 'Développement Web React / Next.js',
    description:
      'Construire une application web moderne, typée et performante avec React et Next.js.',
    duration: '5 jours',
    maxParticipants: 12,
    pricing: 'Sur devis',
    level: 'Intermédiaire',
    image: '/pexels-naboth-otieno-83498565-19805876.jpg',
    topics: [
      'App Router & Server Components',
      'TypeScript en production',
      'Performance & SEO',
      'Déploiement & CI/CD',
    ],
  },
  {
    slug: 'design-thinking',
    title: 'UI/UX Design Thinking',
    description:
      'Passer du problème utilisateur au prototype testable en équipe pluridisciplinaire.',
    duration: '2 jours',
    maxParticipants: 18,
    pricing: 'Sur devis',
    level: 'Débutant',
    image: '/representations-user-experience-interface-design.jpg',
    topics: [
      'Recherche utilisateur rapide',
      "Ateliers d'idéation",
      'Prototypage haute fidélité',
      'Tests utilisateurs & itération',
    ],
  },
  {
    slug: 'cybersecurite',
    title: 'Cybersécurité — Essentiels',
    description:
      'Réduire les risques : mots de passe, phishing, sauvegardes et hygiène numérique.',
    duration: '1 jour',
    maxParticipants: 24,
    pricing: 'Sur devis',
    level: 'Débutant',
    image: '/engineer-protecting-company-critical-infrastructure-from-cyber-threats.jpg',
    topics: [
      'Hygiène numérique',
      'Phishing & ingénierie sociale',
      'Sauvegardes & continuité',
      'Bonnes pratiques par rôle',
    ],
  },
  {
    slug: 'maintenance-avancee',
    title: 'Maintenance informatique avancée',
    description:
      'Industrialiser le support : inventaire, monitoring et procédures fiables.',
    duration: '2 jours',
    maxParticipants: 14,
    pricing: 'Sur devis',
    level: 'Expert',
    image: '/close-up-man-working-computer-chips.jpg',
    topics: [
      'Inventaire & CMDB',
      'Monitoring & alerting',
      'Procédures & runbooks',
      'Gestion des incidents',
    ],
  },
]

export const formationLevels: FormationLevel[] = ['Débutant', 'Intermédiaire', 'Expert']

import type { Service } from '@/components/sticky-services'

export const servicesIntro = {
  eyebrow: 'Services',
  title: 'Une suite complète pour votre transformation numérique',
  description:
    "De la stratégie à l'exécution, nous combinons design, ingénierie et intelligence artificielle pour des produits durables et mesurables.",
}

/** Marquee accueil + footer — source unique des 9 services */
export const serviceMarqueeItems = [
  'Applications mobiles',
  'Développement web',
  'Logiciels métiers',
  'Intelligence artificielle',
  'Formations tech & IA',
  'Maintenance informatique',
  'Design UI/UX',
  'Sécurité & vidéosurveillance',
  'Téléphonie IP',
]

/** Pré-remplissage formulaire contact depuis ?service= */
export const serviceContactLabels: Record<string, string> = {
  'applications-mobiles': 'Application mobile',
  'developpement-web': 'Site web / plateforme',
  'logiciels-metiers': 'Logiciel métier',
  'intelligence-artificielle': 'Intelligence artificielle',
  'formations-tech-ia': 'Formation',
  'maintenance-informatique': 'Maintenance informatique',
  'design-ui-ux': 'Design UI/UX',
  'securite-videosurveillance': 'Sécurité & vidéosurveillance',
  'telephonie-ip': 'Téléphonie IP',
}

const ink = '#f5f5f2'
const inkMuted = '#9a9a95'
const inkDark = '#0e0e10'
const inkMutedOnLight = '#5c5c58'

export const stickyServices: Service[] = [
  {
    index: '01',
    slug: 'applications-mobiles',
    title: 'Applications mobiles',
    description: 'Apps Android & iOS natives et cross-platform.',
    items: ['UX/UI Mobile First', 'Publication sur les stores', "Intégration d'API", 'React Native'],
    bg: '#0e0e10',
    fg: ink,
    muted: inkMuted,
    accentLine: '#27b7a5',
    image: '/projects/superapp.png',
  },
  {
    index: '02',
    slug: 'developpement-web',
    title: 'Développement web',
    description: 'Sites vitrines, plateformes et web apps modernes.',
    items: ['Next.js & TypeScript', 'Sites vitrines & SaaS', 'E-commerce', 'SEO & Performance'],
    bg: '#f4f3ee',
    fg: inkDark,
    muted: inkMutedOnLight,
    accentLine: '#1a9a8a',
    lightScheme: true,
    image: '/pexels-naboth-otieno-83498565-19805876.jpg',
  },
  {
    index: '03',
    slug: 'logiciels-metiers',
    title: 'Logiciels métiers',
    description: 'Outils sur mesure pour automatiser vos processus.',
    items: ['Node.js & PostgreSQL', 'API REST', 'Tableaux de bord', 'Automatisation'],
    bg: '#16161a',
    fg: ink,
    muted: inkMuted,
    accentLine: '#3de0cc',
    image: '/vishnu-r-nair-1TFbqhRlCCc-unsplash.jpg',
  },
  {
    index: '04',
    slug: 'intelligence-artificielle',
    title: 'Intelligence artificielle',
    description: 'IA générative, automatisation et data.',
    items: ['LLM & RAG', 'Assistants intelligents', 'MLOps', 'Gouvernance IA responsable'],
    bg: '#0f1f1d',
    fg: ink,
    muted: '#8aa8a3',
    accentLine: '#3de0cc',
    image: '/ai-cloud-with-robot-head.jpg',
  },
  {
    index: '05',
    slug: 'formations-tech-ia',
    title: 'Formations tech & IA',
    description: 'Montée en compétences pour vos équipes.',
    items: ['Fondamentaux IA & ML', 'React / Next.js', 'UI/UX & Design Thinking', 'Cybersécurité', 'No-Code / Low-Code', 'Maintenance informatique'],
    bg: '#1c1c21',
    fg: ink,
    muted: inkMuted,
    accentLine: '#27b7a5',
    image: '/african-american-woman-working-from-home.jpg',
  },
  {
    index: '06',
    slug: 'maintenance-informatique',
    title: 'Maintenance informatique',
    description: 'Stabilité, supervision et support réactif.',
    items: ['Postes & serveurs', 'Sauvegardes', 'Gestion des tickets', 'SLA & astreintes'],
    bg: '#ececea',
    fg: inkDark,
    muted: inkMutedOnLight,
    accentLine: '#27b7a5',
    lightScheme: true,
    image: '/close-up-man-working-computer-chips.jpg',
  },
  {
    index: '07',
    slug: 'design-ui-ux',
    title: 'Design UI/UX',
    description: 'Interfaces premium, cohérentes et mesurables.',
    items: ['Recherche utilisateur', 'Prototypage haute fidélité', 'Design Systems', 'Optimisation conversion'],
    bg: '#141820',
    fg: ink,
    muted: '#9499a8',
    accentLine: '#6ec4f0',
    image: '/representations-user-experience-interface-design.jpg',
  },
  {
    index: '08',
    slug: 'securite-videosurveillance',
    title: 'Sécurité & vidéosurveillance',
    description: 'Protection des accès et supervision des sites.',
    items: ["Contrôle d'accès", 'Vidéosurveillance', 'Durcissement systèmes', 'Sensibilisation'],
    bg: '#1a1816',
    fg: ink,
    muted: '#a39e95',
    accentLine: '#c9a227',
    image: '/engineer-protecting-company-critical-infrastructure-from-cyber-threats.jpg',
  },
  {
    index: '09',
    slug: 'telephonie-ip',
    title: 'Téléphonie IP',
    description: 'Communications unifiées et télétravail sécurisé.',
    items: ['Déploiement VoIP', 'Qualité audio', 'Intégration collaborative', 'Supervision réseau'],
    bg: '#27b7a5',
    fg: inkDark,
    muted: '#0a3d36',
    accentLine: '#0e0e10',
    lightScheme: true,
    image: '/telephonie_02.jpg',
  },
]

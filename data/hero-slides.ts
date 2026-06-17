export type HeroSlideMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src?: string; poster: string }
  | { type: '3d'; sceneId?: string; fallbackImage?: string }

export type HeroSlideCta = {
  label: string
  href: string
}

export type HeroSlide = {
  id: string
  eyebrow: string
  title: string
  titleAccent?: string
  description: string
  supporting?: string
  primaryCta: HeroSlideCta
  secondaryCta: HeroSlideCta
  media: HeroSlideMedia
}

/**
 * Slides hero — remplacez src / poster / sceneId quand vos assets sont prêts.
 * - image : `/public/...`
 * - video : ajoutez `src: '/hero/slide-2.mp4'`
 * - 3d    : branchez votre canvas dans `HeroSlideMedia` (composant 3d)
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 'ambition',
    eyebrow: 'Transformation numérique',
    title: 'Votre ambition',
    titleAccent: 'digitale, notre mission.',
    description:
      'Golaine Tech accompagne les entreprises en Afrique dans leur transformation numérique.',
    supporting:
      'Applications web et mobiles, intelligence artificielle et design UI/UX — des produits performants, intuitifs et pensés pour durer.',
    primaryCta: { label: 'Démarrer un projet', href: '/contact' },
    secondaryCta: { label: 'Voir nos projets', href: '/work' },
    media: { type: 'image', src: '/professional-male-developer-manages-neural-network-desk.jpg', alt: 'Développeur Golaine Tech — transformation numérique' },
  },
  {
    id: 'ia',
    eyebrow: 'Intelligence artificielle',
    title: 'L’IA au service',
    titleAccent: 'de vos équipes.',
    description:
      'Assistants intelligents, automatisation et données au cœur de vos processus métier.',
    supporting:
      'Nous déployons l’IA là où le retour sur investissement est mesurable, avec une gouvernance claire et des équipes formées à l’usage.',
    primaryCta: { label: 'Nos services IA', href: '/services' },
    secondaryCta: { label: 'Nous contacter', href: '/contact?service=intelligence-artificielle' },
    media: { type: 'image', src: '/it-technician-oversees-ai-neural-network.jpg', alt: 'Technicien IA — intelligence artificielle Golaine Tech' },
  },
  {
    id: 'formation',
    eyebrow: 'Formations & studio',
    title: 'Faire monter',
    titleAccent: 'vos équipes.',
    description:
      'Ateliers pratiques, accompagnement sur mesure et transfert de compétences pour vos équipes.',
    supporting:
      'Du diagnostic à la mise en pratique : nous ancrons la montée en compétences dans votre quotidien, à Bamako et en remote.',
    primaryCta: { label: 'Nos formations', href: '/formations' },
    secondaryCta: { label: 'Découvrir le studio', href: '/studio' },
    media: { type: 'image', src: '/from-shot-students-with-phones.jpg', alt: 'Formation tech — Golaine Tech' },
  },
]

export const heroAutoplayMs = 8000

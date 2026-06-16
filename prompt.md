# 🎯 MEGA-PROMPT — Site Agence Créative Multipage Immersif
### Inspiré de la direction artistique de https://sohub.digital/
> À coller dans **v0 / Lovable / Bolt / Cursor**. Optimisé Next.js App Router. **SITE MULTIPAGES — JAMAIS one-page.**

---

## 0. RÔLE & MISSION

Tu es un **développeur front-end senior + creative developer** primé (niveau Awwwards / FWA), spécialisé dans les expériences web **immersives, animées et narratives** au scroll. Tu maîtrises GSAP, ScrollTrigger, Lenis, Framer Motion et le motion design web.

Construis un **site vitrine d'agence créative MULTIPAGES** (routing réel, une URL par page, pas de scroll géant unique). Chaque page est une expérience à part entière, reliée aux autres par des **transitions de page animées**.

**Règle non négociable : architecture multipage.** Chaque page = une route dédiée avec son propre layout, son hero, ses sections. La navigation entre pages déclenche une transition (cover/reveal), pas un simple changement instantané.

---

## 1. 🛠️ SKILLS & STACK REQUIS (ce qu'il faut maîtriser/installer)

### Stack technique
| Domaine | Techno | Rôle |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Routing multipage, SSR, `next/image`, `next/font` |
| Langage | **TypeScript** | Typage strict |
| Styling | **Tailwind CSS** + CSS variables | Design tokens, responsive |
| UI kit | **shadcn/ui** | Boutons, dialog, inputs de base |
| Smooth scroll | **Lenis** (`@studio-freight/lenis`) | Scroll fluide inertiel (clé de l'immersion) |
| Animation scroll | **GSAP + ScrollTrigger** | Pin, parallax, horizontal scroll, reveals |
| Animation UI/transitions | **Framer Motion** | Transitions de page, micro-interactions, variants |
| Split texte | **SplitType** ou GSAP SplitText | Animation lettre/mot/ligne |
| Icônes | **lucide-react** | Iconographie |
| 3D (optionnel) | **@react-three/fiber + drei** | Render hero / objet flottant |

### Compétences front à mobiliser
- **GSAP ScrollTrigger** : `pin`, `scrub`, `snap`, `containerAnimation` (scroll horizontal piloté par scroll vertical).
- **Lenis ↔ GSAP sync** : brancher Lenis sur le `ticker` GSAP pour que ScrollTrigger reste parfaitement synchro.
- **Page transitions** : overlay animé entre routes (Framer Motion `AnimatePresence` + Next router, ou GSAP timeline avant navigation).
- **Reveal typographique** : texte qui monte ligne par ligne (clip-path / translateY + stagger).
- **Horizontal card scroll** : galerie de projets qui défile latéralement au scroll (section pinnée).
- **Parallax multi-couches** sur images / renders 3D.
- **Magnetic buttons** + **curseur personnalisé** (cursor follower).
- **Preloader** avec compteur + reveal d'entrée.
- **Marquee** texte infini.
- **Sticky / pinned immersive sections** (services qui se superposent).
- **Accessibilité motion** : respect de `prefers-reduced-motion`.

---

## 2. 🎨 DESIGN SYSTEM (DA inspirée de SOHub)

### Couleurs (tokens CSS)
```css
:root {
  --bg:        #0E0E10;   /* fond sombre profond */
  --bg-soft:   #16161A;   /* sections alternées */
  --surface:   #1C1C21;   /* cards */
  --ink:       #F5F5F2;   /* texte principal (off-white) */
  --ink-muted: #9A9A95;   /* texte secondaire */
  --accent:    #27B7A5;   /* teal signature SOHub */
  --accent-2:  #3DE0CC;   /* hover/glow */
  --line:      rgba(245,245,242,0.08);
}
```
> Variante claire optionnelle (toggle dark/light) avec `--bg:#F4F3EE` / `--ink:#0E0E10`.

### Typographie
- **Display** (titres massifs) : `Clash Display`, `Satoshi`, `General Sans` ou `Neue Montreal` (sinon `Space Grotesk`). Tailles héroïques : `clamp(3rem, 9vw, 11rem)`, tracking serré, line-height 0.95.
- **Texte courant** : `Inter` ou `Satoshi`.
- Charger via `next/font` (Google Fonts) ou `localFont`.

### Principes de motion
- **Easing maison** : `[0.6, 0.01, -0.05, 0.95]` (Framer) / `power3.out` (GSAP). Durées 0.8–1.4s.
- **Stagger** systématique sur listes et lignes de texte (0.06–0.12s).
- Tout élément entrant utilise un **reveal** (jamais d'apparition brute).
- Scroll = narration : chaque section a un état d'entrée, un état pinné, un état de sortie.

### Layout
- Grille 12 colonnes, gouttière généreuse, marges larges (whitespace = luxe).
- Espacements verticaux amples entre sections (`py-[12vw]`).

---

## 3. 🗺️ ARCHITECTURE MULTIPAGE (routes obligatoires)

```
/                     → Home (hero render + showcase projets + services immersifs + CTA)
/studio               → Studio (équipe, reel vidéo, services, distinctions, carrières)
/work                 → Work (grille/liste filtrable de tous les projets)
/work/[slug]          → Page projet détaillée (case study immersive)
/contact              → Contact (formulaire + CTA "book a meeting")
/careers/[slug]       → (optionnel) Offre d'emploi détaillée
```

### Layout global partagé (`app/layout.tsx`)
- **Provider Lenis** (smooth scroll global, désactivé si `prefers-reduced-motion`).
- **Curseur personnalisé** (follower magnétique sur liens/boutons).
- **Navbar** sticky transparente → bouton **Menu** qui ouvre un **overlay plein écran** (liste de liens en gros, avec hover preview d'image projet + reveal en cascade).
- **Footer** immersif partagé (render visuel + grand titre "Don't be shy" / "Parlons de votre projet", liens sociaux, CTA).
- **Page transition** via `AnimatePresence` : un panneau coloré (--accent ou --ink) couvre l'écran → change de route → se retire. Le nom de la page apparaît brièvement pendant la transition.
- **Preloader** au premier chargement : logo + compteur 0→100, puis split reveal du hero.

---

## 4. 📄 SPÉCIFICATIONS PAR PAGE

### 🏠 PAGE HOME (`/`)
1. **Hero immersif**
   - Titre géant en 2 lignes : « **Votre histoire construit notre histoire.** » avec reveal ligne par ligne (SplitType + clip-path).
   - Render 3D / image centrale en **parallax** (bouge légèrement à la souris + au scroll).
   - Indicateur « Scroll » animé (flèche/ligne qui pulse) en bas.
2. **Section Work — Horizontal Card Scroll** (signature)
   - Intro courte à gauche, puis **galerie de 6 projets** qui **défile horizontalement** quand on scrolle verticalement (GSAP `pin` + `containerAnimation`).
   - Chaque card : image plein cadre, nom du projet, catégorie ; au hover → scale + révélation du titre + curseur « View ».
3. **Sections Services — Immersives empilées (pinned/sticky)**
   - 4 blocs qui se **superposent** au scroll : `Identité de marque`, `Développement`, `Marketing`, `Visualisation 3D`.
   - Chaque bloc : grand titre, liste de sous-services (qui s'animent en stagger), paragraphe descriptif, changement de couleur de fond progressif.
4. **CTA final** : grand titre « N'aie pas peur, parlons-en » + bouton magnétique vers `/contact`.
5. **Footer** partagé.

### 🎬 PAGE STUDIO (`/studio`)
1. Hero « Nous vivons de votre satisfaction » + image render parallax.
2. **Team** : intro + **player vidéo reel** custom (thumbnail + bouton Play animé → lecture inline / modal).
3. **Services en pills animées** (Apps, Métavers, Branding, Animations, Sites, Marketing) qui flottent / réagissent au hover.
4. **Recognition** : liste de distinctions/awards (lignes qui se révèlent au scroll, hover = ligne accent).
5. **Careers** : postes ouverts en liste, chaque ligne hover → expand + bouton `Postuler` vers `/careers/[slug]`.
6. Footer.

### 🗂️ PAGE WORK (`/work`)
- Grille **masonry / asymétrique** de tous les projets avec **filtres par catégorie** (animation de re-layout via Framer Motion `layout`).
- Hover card : image reveal + titre + année.
- Clic → transition vers `/work/[slug]`.

### 🧩 PAGE PROJET (`/work/[slug]`)
- **Hero case study** : titre projet plein écran + image cover (parallax au scroll).
- Méta-infos (client, année, services, rôle) en grille révélée.
- **Sections narratives** alternées : grandes images (parallax), texte éditorial, galeries, citations.
- **Next project** en bas : preview du projet suivant qui se charge avec transition.
- Données mockées dans un fichier `projects.ts` (tableau d'objets typés).

### ✉️ PAGE CONTACT (`/contact`)
- Grand titre éditorial + sous-texte.
- **Formulaire** stylé (nom, email, type de projet, budget, message) — validation, états focus animés, bouton submit magnétique avec feedback de succès. **Pas de balise `<form>` native si rendu en artefact React — utiliser onClick/onChange.**
- Bloc « Book a meeting » + liens email / réseaux.
- Footer.

---

## 5. 🧱 PATTERNS RÉUTILISABLES (composants à créer)

- `<SmoothScrollProvider/>` — init Lenis + sync GSAP ticker.
- `<PageTransition/>` — wrapper AnimatePresence pour les routes.
- `<RevealText/>` — split lignes/mots + reveal au scroll (ScrollTrigger).
- `<HorizontalScroll/>` — section pinnée à défilement latéral.
- `<StickyServices/>` — blocs immersifs empilés.
- `<MagneticButton/>` — bouton attiré par le curseur.
- `<CustomCursor/>` — follower global.
- `<Marquee/>` — bandeau texte infini.
- `<Preloader/>` — compteur + reveal d'entrée.
- `<ProjectCard/>` — card hover immersive.
- `<Parallax/>` — wrapper translateY au scroll (data-speed).

---

## 6. ⚙️ EXIGENCES TECHNIQUES

- **Synchroniser Lenis + ScrollTrigger** correctement (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add`).
- **Nettoyer** les ScrollTriggers/timelines au démontage (`useGSAP` ou `useLayoutEffect` + cleanup).
- **Responsive complet** : desktop / tablette / mobile. Sur mobile, simplifier les animations lourdes (désactiver scroll horizontal pinné → empilement vertical).
- **Performance** : `next/image` partout, lazy-load, `will-change` ciblé, `transform`/`opacity` only (pas d'anim sur `top/left`), 60fps.
- **Accessibilité** : `prefers-reduced-motion` désactive les grosses anims ; navigation clavier ; focus visibles ; alt sur images ; contraste suffisant.
- **SEO** : metadata par page (`generateMetadata`), titres `<h1>` uniques, Open Graph.
- **Structure propre** : `app/`, `components/`, `lib/`, `hooks/` (ex: `useGsapContext`), `data/projects.ts`.

---

## 7. ✅ CRITÈRES D'ACCEPTATION

1. ✅ **Plusieurs routes réelles** (Home, Studio, Work, Work détail, Contact) — pas une seule page scroll.
2. ✅ Transition animée visible entre chaque navigation de page.
3. ✅ Scroll fluide (Lenis) sur tout le site.
4. ✅ Au moins une section **horizontal card scroll** pinnée (Home/Work).
5. ✅ Au moins une série de **sections immersives empilées** (Services).
6. ✅ Reveals typographiques au scroll sur tous les grands titres.
7. ✅ Curseur custom + boutons magnétiques fonctionnels.
8. ✅ Responsive + `prefers-reduced-motion` respecté.
9. ✅ Build sans erreur, code TypeScript typé et organisé.

---

## 8. 🎁 DÉMARRAGE ATTENDU

Génère le projet complet : structure de fichiers, `layout.tsx` avec providers (Lenis, transitions, cursor, nav, footer), les pages des routes ci-dessus, les composants réutilisables, le design system Tailwind (tokens), et les données mockées de projets. Code prêt à `npm install && npm run dev`. Commence par l'architecture + le layout global + la Home, puis enchaîne les autres pages.

> **Ton & DA** : sombre, premium, éditorial, accent teal, typographie massive, beaucoup d'espace, motion narratif au scroll. Élégant et « award-winning », jamais surchargé.
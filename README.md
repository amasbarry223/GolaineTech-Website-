# Golaine Tech — Site web

Site vitrine Next.js (App Router) pour **Golaine Tech** — transformation numérique, IA et formations depuis Bamako, Mali.

## Prérequis

- Node.js **20+**
- npm **10+**

## Développement local

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm run start
```

## Déploiement sur Vercel

### Option A — Git (recommandé)

1. Pousser le dépôt sur GitHub, GitLab ou Bitbucket.
2. Importer le projet sur [vercel.com/new](https://vercel.com/new).
3. Framework détecté automatiquement : **Next.js**.
4. Variables d'environnement (Production) :
   - `NEXT_PUBLIC_SITE_URL` = `https://golaine.tech` (ou votre domaine)
5. Déployer. Chaque push sur `main` déclenche un déploiement production si configuré.

### Option B — CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
vercel --prod
```

### Domaine custom

Dans le dashboard Vercel : **Project → Settings → Domains** → ajouter `golaine.tech` et suivre la configuration DNS.

## Structure

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/a-propos` | À propos & équipe |
| `/services` | Catalogue services |
| `/formations` | Formations IA & tech |
| `/work` | Projets |
| `/contact` | Contact |
| `/studio` | Studio |
| `/careers/[slug]` | Offres d'emploi |

## Stack

- Next.js 16 · React 19 · Tailwind CSS 4
- GSAP · Motion · shadcn/ui
- `@vercel/analytics` (activé en production)

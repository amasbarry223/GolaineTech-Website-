'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { registerGsapPlugins } from '@/lib/gsap-register'
import { RevealText } from '@/components/reveal-text'
import { ContactMap } from '@/components/contact/contact-map'
import { contactContent } from '@/data/contact'
import { serviceContactLabels } from '@/data/home-services'
import { getCareerBySlug } from '@/data/studio'
import { formationPrograms } from '@/data/formations'
import { ArrowUpRight, Check, Mail, MapPin, Clock, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const projectTypes = [
  'Application mobile',
  'Site web / plateforme',
  'Intelligence artificielle',
  'Logiciel métier',
  'Design UI/UX',
  'Formation',
  'Autre',
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@golaine.tech',
    href: 'mailto:contact@golaine.tech',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Bamako, Mali',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lundi — Vendredi · GMT',
  },
]

const budgetRanges = [
  'Moins de 5 000 €',
  '5 000 — 15 000 €',
  '15 000 — 50 000 €',
  '50 000 € et plus',
  'À définir ensemble',
]

type FormState = {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
}

export function ContactPageContent() {
  return (
    <Suspense fallback={<ContactPageSkeleton />}>
      <ContactPageInner />
    </Suspense>
  )
}

function ContactPageSkeleton() {
  return <div className="min-h-screen bg-background" aria-hidden />
}

function ContactPageInner() {
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const heroPinRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    const service = searchParams.get('service')
    const role = searchParams.get('role')
    const program = searchParams.get('program')
    if (service && serviceContactLabels[service]) {
      setForm((prev) => ({ ...prev, projectType: serviceContactLabels[service] }))
    }
    if (program) {
      const p = formationPrograms.find((x) => x.slug === program)
      if (p) {
        setForm((prev) => ({
          ...prev,
          projectType: 'Formation',
          message: prev.message || `Demande de formation — ${p.title} (${p.duration})\n\n`,
        }))
      }
    } else if (role) {
      const career = getCareerBySlug(role)
      if (career) {
        setForm((prev) => ({
          ...prev,
          projectType: 'Autre',
          message: prev.message || `Candidature — ${career.title}\n\n`,
        }))
      }
    }
  }, [searchParams])

  useGSAP(
    () => {
      registerGsapPlugins()
      const mm = gsap.matchMedia()
      const hero = heroPinRef.current

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (hero) {
          gsap.fromTo(
            '.contact-hero-bg',
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
            },
          )

          gsap.fromTo(
            '.contact-hero-bg-image',
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
            },
          )

          gsap.to('.contact-hero-bg-image', {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        }

        gsap.fromTo(
          '.contact-info-item',
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-info', start: 'top 82%' },
          },
        )

        gsap.fromTo(
          '.form-field',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
          },
        )

        gsap.fromTo(
          '.contact-visual',
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-gallery', start: 'top 85%' },
          },
        )

        gsap.fromTo(
          '.contact-map',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-map-section', start: 'top 88%' },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Votre nom est requis.'
    if (!form.email.trim()) {
      next.email = 'Votre email est requis.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Adresse email invalide.'
    }
    if (!form.message.trim()) next.message = 'Décrivez brièvement votre projet.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(
      `Projet — ${form.projectType || 'Nouvelle demande'}${form.company ? ` · ${form.company}` : ''}`,
    )
    const body = encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\nEntreprise : ${form.company || '—'}\nType de projet : ${form.projectType || '—'}\nBudget : ${form.budget || '—'}\n\n${form.message}`,
    )
    window.location.href = `mailto:contact@golaine.tech?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section
        ref={heroPinRef}
        className="contact-hero relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="contact-hero-bg absolute inset-0" aria-hidden>
          <div className="contact-hero-bg-image absolute inset-0 origin-center">
            <Image
              src={contactContent.heroImage.src}
              fill
              priority
              alt=""
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-background/25" />
          <div className="page-hero-overlay absolute inset-0" />
        </div>

        <div className="contact-hero-line relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-36 md:px-12 md:pb-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2/80">
            {contactContent.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_20px_rgba(14,14,16,0.9),0_8px_40px_rgba(14,14,16,0.55)]">
            Construisons
            <br />
            votre prochain
            <br />
            produit.
          </h1>
          <RevealText
            as="p"
            text="Partagez votre ambition. Nous revenons vers vous sous 48 heures ouvrées avec une première réponse personnalisée."
            by="word"
            immediate
            delay={0.2}
            className="mt-8 block max-w-xl text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl [text-shadow:0_1px_12px_rgba(14,14,16,0.85)]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center rounded-full border border-accent/45 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-2 backdrop-blur-sm">
              Une réponse sous 48h
            </span>
            <a
              href="mailto:contact@golaine.tech"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#0f1f1d]/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/85 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-2"
            >
              contact@golaine.tech
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            {contactContent.heroImage.caption}
          </p>
        </div>
      </section>
      {/* ── Contact grid ── */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-20 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-24">
          <div className="contact-info">
            <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
              Coordonnées
            </h2>
            <ul className="mt-10 space-y-8">
              {contactInfo.map((item) => (
                <li key={item.label} className="contact-info-item flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                    <item.icon className="h-4 w-4 text-accent" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-base text-foreground transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base text-foreground">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-info-item mt-12 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <Calendar className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Book a meeting
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Préférez un échange direct ? Planifiez un créneau de 30 minutes avec notre équipe.
                  </p>
                  <a
                    href="mailto:contact@golaine.tech?subject=Demande%20de%20rendez-vous"
                    className="focus-ring mt-4 inline-flex items-center gap-2 text-sm text-accent transition-opacity hover:opacity-80"
                  >
                    Réserver un appel
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <p className="contact-info-item mt-8 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Golaine Tech accompagne les entreprises africaines dans leur transformation
              numérique — avec la rigueur technique et la chaleur humaine que mérite chaque
              projet.
            </p>
          </div>

          <div className="contact-form">
            {submitted ? (
              <div
                className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-border bg-bg-soft px-8 py-16 text-center"
                role="status"
              >
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                  <Check className="h-6 w-6 text-accent" aria-hidden />
                </span>
                <h2 className="font-heading text-3xl tracking-tight text-foreground">
                  Message prêt à envoyer
                </h2>
                <p className="mt-4 max-w-sm text-pretty text-muted-foreground">
                  Votre client mail s&apos;est ouvert avec votre message. Si ce n&apos;est pas le
                  cas, écrivez-nous directement à{' '}
                  <a
                    href="mailto:contact@golaine.tech"
                    className="text-accent transition-opacity hover:opacity-70"
                  >
                    contact@golaine.tech
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setForm(initialForm) }}
                  className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="form-field grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Nom complet" required value={form.name} error={errors.name} onChange={(v) => update('name', v)} />
                  <Field id="email" label="Email" type="email" required value={form.email} error={errors.email} onChange={(v) => update('email', v)} />
                </div>

                <div className="form-field grid gap-6 sm:grid-cols-2">
                  <Field id="company" label="Entreprise" value={form.company} onChange={(v) => update('company', v)} />
                  <div>
                    <label
                      htmlFor="projectType"
                      className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Type de projet
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => update('projectType', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    >
                      <option value="">Sélectionner…</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label
                    htmlFor="budget"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Budget estimé
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                    className="focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  >
                    <option value="">Sélectionner une fourchette…</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Votre projet <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Décrivez votre contexte, vos objectifs et votre calendrier…"
                    className={cn(
                      'w-full resize-y rounded-xl border bg-surface px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent',
                      errors.message ? 'border-destructive' : 'border-border',
                    )}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="form-field pt-2">
                  <button
                    type="submit"
                    className={cn(
                      'group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition-colors hover:bg-accent-2 focus-ring sm:w-auto',
                    )}
                  >
                    Envoyer le message
                    <ArrowUpRight className="h-4 w-4" />
                  </button>                  <p className="mt-4 text-xs text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez d&apos;être recontacté par
                    Golaine Tech concernant votre demande.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Galerie confiance ── */}
      <section className="contact-gallery border-t border-border bg-bg-soft/35 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Expertise
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
                Des projets concrets, des résultats mesurables
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Mobile, web, IA — chaque demande est traitée par des spécialistes qui connaissent
              les enjeux terrain en Afrique et à l&apos;international.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {contactContent.gallery.map((item, index) => (
              <figure
                key={item.src}
                className={cn(
                  'contact-visual group relative overflow-hidden rounded-2xl border border-border',
                  index === 1 && 'sm:mt-8',
                )}
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={item.src}
                    fill
                    alt={item.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 pt-16">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                      {item.label}
                    </span>
                    <span className="font-heading text-lg text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      0{index + 1}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="contact-map-section border-t border-border px-6 py-24 md:px-12">
        <div className="contact-map mx-auto w-full max-w-[1400px]">
          <ContactMap />
        </div>
      </section>
    </div>
  )
}

function Field({
  id,
  label,
  type = 'text',
  required,
  value,
  error,
  onChange,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-xl border bg-surface px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent',
          error ? 'border-destructive' : 'border-border',
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

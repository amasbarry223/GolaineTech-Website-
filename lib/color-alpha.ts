/** Opacité compatible hex ET variables CSS (évite `var(--x)05` invalide). */
export function withAlpha(color: string, alpha: number): string {
  const pct = Math.round(Math.min(1, Math.max(0, alpha)) * 100)

  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const base =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex.slice(0, 6)
    const a = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
    return `#${base}${a}`
  }

  return `color-mix(in srgb, ${color} ${pct}%, transparent)`
}

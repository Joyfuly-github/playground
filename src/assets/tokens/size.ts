export const sizeScale = {
  xs: 'var(--spacing-10)',
  sm: 'var(--spacing-16)',
  md: 'var(--spacing-24)',
  lg: 'var(--spacing-32)',
} as const

export type Size = keyof typeof sizeScale

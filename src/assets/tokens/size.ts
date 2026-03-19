// export const sizeIcon = {
//   xs: 'var(--spacing-10)',
//   sm: 'var(--spacing-16)',
//   md: 'var(--spacing-24)',
//   lg: 'var(--spacing-32)',
// } as const

// export type SizeIcon = keyof typeof sizeIcon

export const sizeDefault = {
  xs: { height: 'var(--spacing-24)', fontSize: 'var(--font-size-small)' },
  sm: { height: 'var(--spacing-32)', fontSize: 'var(--font-size-small)' },
  md: { height: 'var(--spacing-40)', fontSize: 'var(--font-size-base)' },
  lg: { height: 'var(--spacing-56)', fontSize: 'var(--font-size-h5)' },
} as const

export type SizeDefault = keyof typeof sizeDefault

const EXPORTS = {
  colors: ['tailwind', 'hex'],
  spacing: ['tailwind', 'rem'],
} as const

export function getExportTypes<TCategory extends ExportCategory>(category: TCategory): typeof EXPORTS[TCategory] {
  return EXPORTS[category]
}

export type ExportCategory = keyof typeof EXPORTS
export type ExportType<TCategory extends ExportCategory> = typeof EXPORTS[TCategory][number]

import { type Colord } from 'colord'

const EXPORTS = {
  colors: ['Tailwind', 'Hexadecimal', 'RGB colors', 'HSL colors'],
  spacing: ['Tailwind', 'rem'],
} as const

export function getExportTypes<TCategory extends ExportCategory>(category: TCategory): typeof EXPORTS[TCategory] {
  return EXPORTS[category]
}

export function getFormattedColor(format: ExportType<'colors'>, color: Colord, name: string, shade: string): string {
  switch (format) {
    case 'Hexadecimal':
      return color.toHex()
    case 'RGB colors': {
      return color.toRgbString().replaceAll(',', '')
    }
    case 'HSL colors': {
      return color.toHslString().replaceAll(',', '')
    }
    default: {
      return `${name}-${shade}`
    }
  }
}

export type ExportCategory = keyof typeof EXPORTS
export type ExportType<TCategory extends ExportCategory> = typeof EXPORTS[TCategory][number]

import { type Colord } from 'colord'

import { type SpacingSizes } from './tailwind'

const EXPORTS = {
  colors: ['Tailwind', 'Hexadecimal', 'RGB colors', 'HSL colors'],
  spacing: ['Tailwind', 'rem', 'px'],
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

export function getFormattedSize(format: ExportType<'spacing'>, sizes: SpacingSizes): string {
  switch (format) {
    case 'rem': {
      return sizes.rem
    }
    case 'px': {
      return sizes.px
    }
    default: {
      return sizes.tailwind
    }
  }
}

export type ExportCategory = keyof typeof EXPORTS
export type ExportType<TCategory extends ExportCategory> = typeof EXPORTS[TCategory][number]

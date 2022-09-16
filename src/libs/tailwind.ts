import colors from 'tailwindcss/colors'
import defaultConfig from 'tailwindcss/defaultConfig'

export function getColorNames(): ColorName[] {
  const validColors: ColorName[] = []

  for (const [name, value] of Object.entries(colors)) {
    if (isValidColorName(name, value)) {
      validColors.push(name)
    }
  }

  return validColors
}

export function getColorShades(name: ColorName) {
  return colors[name]
}

export function getSpacingNames() {
  if (!defaultConfig.theme?.spacing) {
    throw new Error('Theme spacing are not defined.')
  }

  const names = Object.keys(defaultConfig.theme.spacing)
    .filter((name) => !/[A-Za-z]/.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  // Add back 1px right after 0px.
  names.splice(1, 0, 'px')

  return names
}

export function getSpacingSizes(name: string): SpacingSizes {
  if (typeof defaultConfig.theme?.spacing === 'function') {
    throw new TypeError('Theme spacing is a function, expected an object.')
  }

  const rem = defaultConfig.theme?.spacing?.[name]

  if (!rem) {
    throw new Error(`Spacing size '${name}' is not defined.`)
  }

  let px = rem

  if (px.endsWith('rem')) {
    px = `${Number.parseFloat(px) * 16}px`
  }

  return {
    px,
    rem,
    tailwind: name,
  }
}

function isValidColorName(name: string, value: unknown): name is ColorName {
  return typeof value === 'object' && typeof Object.getOwnPropertyDescriptor(colors, name)?.get === 'undefined'
}

export type ColorName = {
  [TKey in keyof typeof colors]: TKey extends DeprecatedColorNames
    ? never
    : typeof colors[TKey] extends string
    ? never
    : TKey
}[keyof typeof colors]

export interface SpacingSizes {
  px: string
  rem: string
  tailwind: string
}

type DeprecatedColorNames = 'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'

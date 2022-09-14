import colors from 'tailwindcss/colors'

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

function isValidColorName(name: string, value: unknown): name is ColorName {
  return typeof value === 'object' && typeof Object.getOwnPropertyDescriptor(colors, name)?.get === 'undefined'
}

export type ColorName = {
  [K in keyof typeof colors]: K extends DeprecatedColorNames ? never : typeof colors[K] extends string ? never : K
}[keyof typeof colors]

type DeprecatedColorNames = 'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'

import { useStore } from '@nanostores/preact'
import clsx from 'clsx'
import { colord, extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'

import { getFormattedColor } from '../libs/export'
import { type ColorName } from '../libs/tailwind'
import { currentExportTypes } from '../store'

extend([a11yPlugin])

export function PaletteColor({ color, name, shade }: PaletteColorProps) {
  const $currentExportType = useStore(currentExportTypes)['colors']

  const cColor = colord(color)
  const textColor = cColor.isLight() ? cColor.darken(1) : cColor.lighten(1)

  const formattedColor = getFormattedColor($currentExportType, cColor, name, shade)

  function handleClick() {
    navigator.clipboard.writeText(formattedColor)
  }

  return (
    <button
      className={clsx(
        'w-full h-full motion-safe:transition-transform text-[0] outline-none font-bold active:scale-150',
        'hover:text-[0.625rem] hover:scale-125 hover:border-2 hover:border-stone-50 dark:hover:border-stone-900 hover:z-10',
        'focus-visible:text-sm focus-visible:scale-125 focus-visible:border-2 focus-visible:border-stone-900 focus-visible:z-10'
      )}
      onClick={handleClick}
      style={{ backgroundColor: color, color: textColor.alpha(0.5).toHslString() }}
    >
      {formattedColor}
    </button>
  )
}

interface PaletteColorProps {
  color: string
  name: ColorName
  shade: string
}

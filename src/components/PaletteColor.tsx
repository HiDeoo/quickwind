import { useStore } from '@nanostores/preact'
import clsx from 'clsx'
import { colord, extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import { useState } from 'preact/hooks'

import { getFormattedColor } from '../libs/export'
import { type ColorName } from '../libs/tailwind'
import { currentExportTypes } from '../store'

extend([a11yPlugin])

export function PaletteColor({ color, name, shade }: PaletteColorProps) {
  const $currentExportType = useStore(currentExportTypes)['colors']
  const [copied, setCopied] = useState(false)

  const cColor = colord(color)
  const textColor = cColor.isLight() ? cColor.darken(1) : cColor.lighten(1)

  const tailwindColor = getFormattedColor('Tailwind', cColor, name, shade)
  const formattedColor = getFormattedColor($currentExportType, cColor, name, shade)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(formattedColor)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 300)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      className={clsx(
        'w-full h-full motion-safe:transition-transform text-[0] outline-none font-bold ease-out',
        'xl:hover:text-[0.625rem] hover:scale-125 hover:border-2 hover:border-stone-50',
        'xl:focus-visible:text-[0.625rem] focus-visible:scale-125 focus-visible:border-2 focus-visible:border-stone-50',
        'dark:hover:border-stone-900 dark:focus-visible:border-stone-900',
        'hover:z-10 focus-visible:z-10',
        { 'hover:scale-150 focus-visible:scale-150': copied }
      )}
      onClick={handleClick}
      style={{ backgroundColor: color, color: textColor.alpha(0.5).toHslString() }}
    >
      <span className="sr-only">{tailwindColor}</span>
      <span aria-hidden>{formattedColor}</span>
    </button>
  )
}

interface PaletteColorProps {
  color: string
  name: ColorName
  shade: string
}

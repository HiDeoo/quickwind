import { useStore } from '@nanostores/preact'
import clsx from 'clsx'
import { useState } from 'preact/hooks'

import { getFormattedSize } from '../libs/export'
import { getSpacingSizes } from '../libs/tailwind'
import { currentExportTypes } from '../store'

export function Spacing({ name }: SpacingProps) {
  const $currentExportType = useStore(currentExportTypes)['spacing']
  const [copied, setCopied] = useState(false)

  const sizes = getSpacingSizes(name)

  const tailwindSize = sizes.tailwind
  const formattedSize = getFormattedSize($currentExportType, sizes)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(formattedSize)

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
        'w-full h-full outline-none font-bold relative group text-[0] bg-stone-300/30 dark:bg-stone-700/25',
        'hover:bg-stone-300/75 dark:hover:bg-stone-700/75',
        'focus-visible:bg-stone-300/75 dark:focus-visible:bg-stone-700/75',
        'sm:hover:text-xs sm:focus-visible:text-xs',
        'hover:z-10 focus-visible:z-10',
        copied &&
          'hover:bg-stone-300 dark:hover:bg-stone-600/75 focus-visible:bg-stone-300 dark:focus-visible:bg-stone-600/75'
      )}
      onClick={handleClick}
    >
      <span className="sr-only">{tailwindSize}</span>
      <div
        aria-hidden
        className={clsx(
          'absolute left-0 top-0 bottom-0 bg-indigo-400 dark:bg-indigo-300 box-content',
          'group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400',
          'group-focus-visible:bg-indigo-500 dark:group-focus-visible:bg-indigo-400',
          name !== '0' && [
            'motion-safe:transition-transform ease-out',
            'group-hover:scale-y-125 group-hover:border-2 group-hover:border-stone-50',
            'group-focus-visible:scale-y-125 group-focus-visible:border-2 group-focus-visible:border-stone-50',
            'dark:group-hover:border-stone-900 dark:group-focus-visible:border-stone-900',
            'group-hover:left-[-2px] group-focus-visible:left-[-2px]',
            copied && 'group-hover:scale-y-150 group-focus-visible:scale-y-150',
          ]
        )}
        style={{ width: sizes.px }}
      />
      <div
        aria-hidden
        className="absolute top-0 bottom-0 flex items-center"
        style={{ left: `calc(${sizes.px} + 0.75rem)` }}
      >
        <div className="opacity-75">{formattedSize}</div>
      </div>
    </button>
  )
}

interface SpacingProps {
  name: string
}

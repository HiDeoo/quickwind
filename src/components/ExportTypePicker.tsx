import { useStore } from '@nanostores/preact'
import clsx from 'clsx'

import { getExportTypes, type ExportCategory } from '../libs/export'
import { currentExportTypes } from '../store'

export function ExportTypePicker({ category }: ExportTypePickerProps) {
  const $currentExportTypes = useStore(currentExportTypes)

  const exportTypes = getExportTypes(category)

  function handleChange(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) {
      return
    }

    currentExportTypes.setKey(category, event.target.value as typeof exportTypes[number])
  }

  return (
    <label>
      Export:
      <select
        className={clsx(
          'ml-2 px-1.5 py-1 min-w-[7rem] rounded bg-stone-300/50 dark:bg-stone-700/75 outline-none',
          'hover:bg-stone-300 dark:hover:bg-stone-700',
          'focus-visible:ring-2 focus-visible:ring-offset-1',
          'focus-visible:ring-indigo-500 focus-visible:ring-offset-stone-50',
          'dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-stone-900'
        )}
        onChange={handleChange}
        value={$currentExportTypes[category]}
      >
        {exportTypes.map((exportType) => (
          <option key={exportType} value={exportType}>
            {exportType}
          </option>
        ))}
      </select>
    </label>
  )
}

interface ExportTypePickerProps {
  category: ExportCategory
}

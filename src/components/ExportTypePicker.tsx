import { useStore } from '@nanostores/preact'

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
      Export type:
      <select value={$currentExportTypes[category]} onChange={handleChange}>
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

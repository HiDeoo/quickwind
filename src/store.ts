import { persistentMap } from '@nanostores/persistent'

import { type ExportCategory, type ExportType } from './libs/export'

export const currentExportTypes = persistentMap<CurrentExportTypes>('export:', {
  colors: 'tailwind',
  spacing: 'tailwind',
})

type CurrentExportTypes = {
  [TKey in ExportCategory]: ExportType<TKey>
}

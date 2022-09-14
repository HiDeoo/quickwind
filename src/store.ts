import { map } from 'nanostores'

import { type ExportCategory, type ExportType } from './libs/export'

export const currentExportTypes = map<CurrentExportTypes>({ colors: 'tailwind', spacing: 'tailwind' })

type CurrentExportTypes = {
  [TKey in ExportCategory]: ExportType<TKey>
}

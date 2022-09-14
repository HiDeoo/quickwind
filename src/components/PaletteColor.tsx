import { type ColorName, getColorShades } from '../libs/tailwind'
import { currentExportTypes } from '../store'

export function PaletteColor({ name }: PaletteColorProps) {
  const shades = getColorShades(name)

  return (
    <>
      <div>{name}</div>
      {Object.entries(shades).map(([shade, color]) => (
        <button key={`${name}-${shade}`} style={{ backgroundColor: color }} onClick={handleClick}>
          {shade}
        </button>
      ))}
    </>
  )
}

function handleClick() {
  const exportType = currentExportTypes.get()['colors']

  console.error('plop', exportType)
}

interface PaletteColorProps {
  name: ColorName
}

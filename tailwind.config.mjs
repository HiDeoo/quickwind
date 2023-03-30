import defaultTheme from 'tailwindcss/defaultTheme.js'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{astro,html,ts,tsx}'],
  theme: {
    screens: {
      xs: '425px',
      ...defaultTheme.screens,
    },
  },
}

export default tailwindConfig

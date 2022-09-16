import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [preact(), tailwind()],
  site: 'https://quickwind.vercel.app',
})

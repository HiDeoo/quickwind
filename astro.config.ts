import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [tailwind()],
  // TODO
  site: 'http://localhost:3000',
})

import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [preact(), tailwind()],
  // TODO
  site: 'http://localhost:3000',
})

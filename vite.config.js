import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/drink-maicha/',
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        about: resolve(root, 'about-us/index.html'),
        experiences: resolve(root, 'experiences-promotions/index.html'),
        game: resolve(root, 'whisk-up-your-own/index.html'),
        gallery: resolve(root, 'gallery/index.html'),
        recommendation: resolve(root, 'find-your-matcha/index.html'),
      },
    },
  },
})

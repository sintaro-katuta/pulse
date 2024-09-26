import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxt/content'
  ],
  alias: {
    '@': resolve(__dirname, './components'),
  },
  ssr: false,
  watchers: {
    webpack: {
      poll: true
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})

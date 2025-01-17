// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
<<<<<<< Updated upstream
  modules: ['@nuxt/ui'],
=======
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
  ],
  alias: {
    '@': resolve(__dirname, './components'),
  },
>>>>>>> Stashed changes
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Games Play',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  devtools: { enabled: true }
})

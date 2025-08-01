import { resolve } from "node:path"

export default defineNuxtConfig({
  telemetry: false,

  alias: {
    assets: "/<rootDir>/assets",
    cookie: resolve(__dirname, "node_modules/cookie")
  },

  modules: [
    '@nuxt/image',
    '@pinia/nuxt'
  ],

  app: {
    baseURL: '/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  ssr: false,

  build: {
    transpile: ["vuetify", 'vue-countup-v3']
  },

  devtools: { enabled: true },

  plugins: [
    { src: "@/plugins/plugins.ts", mode: "client" }
  ],

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles/main.sass',
    '@/assets/css/icons.css',
    '@/assets/css/bootstrap.css',
    '@/assets/css/styles.css'
  ],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080' // backend-ul Spring
    }
  },

  vite: {
    define: {
      'import.meta.env.googleMapsApiKey': JSON.stringify('AIzaSy...')
    }
  },

  compatibilityDate: '2025-07-25'
})
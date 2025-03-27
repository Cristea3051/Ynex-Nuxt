import { resolve } from "node:path"
// https://nuxt.com/docs/api/configuration/nuxt-confi
/*
 Make sure to rename the " /nuxt/preview/ynex " to the subdirectory where you are gonana upload the project. If you are uploading it in root then chang the /nuxt/preview/ynex to '/' or remove.
*/
export default defineNuxtConfig({
 telemetry: false,

 alias:{
   assets : "/<rootDir>/assets",
   cookie: resolve(__dirname, "node_modules/cookie")
 },

 modules: [
   '@nuxt/image',
   '@pinia/nuxt', 
 ],

 // Used to add the base path of url Example : https://www.spruko.com/ynex-nuxt
 app: {
   baseURL: '', // Replace with your desired base path
  //  baseURL: '/nuxt', // Replace with your desired base path
   head: {
     link: [{ rel: 'icon', type: 'image/x-icon', href: "/nuxt/ynex/preview/favicon.ico" }]
 },
 },

 ssr : false,

 build : {
   transpile : ["vuetify", 'vue-countup-v3']
 },

 devtools: { enabled: true },

 plugins: [
   { src: "@/plugins/plugins.ts", mode: "client" },
],

 css : [
   '@mdi/font/css/materialdesignicons.css',
   'vuetify/styles/main.sass',
   '@/assets/css/icons.css',
   '@/assets/css/bootstrap.css',
   '@/assets/css/styles.css',
 ],

 buildModules: [
   'nuxt-vite'
 ],

 vite: {
   optimizeDeps: {
     include: [],
     exclude: []
   },
   define: {
     // 'import.meta.env.BASE_URL': JSON.stringify('/nuxt/ynex/preview/'),
     'import.meta.env.googleMapsApiKey': JSON.stringify('AIzaSyCW16SmpzDNLsrP-npQii6_8vBu_EJvEjA')
   },
 },

 compatibilityDate: '2024-11-07'
})
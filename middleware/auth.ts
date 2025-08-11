import { useAuthStore } from '~/stores/auth'
import { useCookie } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const token = useCookie('token')

  console.log('Middleware:', { authenticated: authStore.authenticated, token: token.value, to: to.name })

  // Dacă nu e autentificat și nu există token, redirect la login
  if (!authStore.authenticated && !token.value) {
    return navigateTo('/auth/login')
  }

  // Dacă există token și vrem să accesăm pagina login, redirect la home
  if (token.value && to.name === 'auth-login') {
    return navigateTo('/')
  }

  // Dacă nu există token și încercăm altă pagină decât login, redirect la login
  if (!token.value && to.name !== 'auth-login') {
    return navigateTo('/auth/login')
  }
})

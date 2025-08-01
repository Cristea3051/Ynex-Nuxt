import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
const { authenticated } = storeToRefs(useAuthStore())
const token = useCookie('token')

if (!authenticated.value && !token.value) {
  navigateTo('/auth/login')
}
  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'auth-login') {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'auth-login') {
    return navigateTo('/auth/login');
  }

});

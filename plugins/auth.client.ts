// plugins/auth.client.ts
// This plugin initializes authentication on client-side app startup

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()
  
  // Initialize authentication state on app mount
  await authStore.initializeAuth()
  
  // Optional: Set up periodic token validation
  if (authStore.authenticated) {
    // Validate token every 10 minutes
    setInterval(async () => {
      if (authStore.authenticated) {
        const isValid = await authStore.validateToken()
        if (!isValid) {
          await authStore.logout()
        }
      }
    }, 10 * 60 * 1000) // 10 minutes
  }
  
  // Optional: Handle visibility change (when user returns to tab)
  document.addEventListener('visibilitychange', async () => {
    if (!document.hidden && authStore.authenticated) {
      // Validate token when user returns to the tab
      const isValid = await authStore.validateToken()
      if (!isValid) {
        await authStore.logout()
      }
    }
  })
  
  return {
    provide: {
      auth: authStore
    }
  }
})
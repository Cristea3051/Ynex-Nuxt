// composables/useAuth.ts
// Convenient composable for using auth throughout your app

import { useAuthStore } from '~/stores/auth'

// Response types
interface ApiResponse {
  success: boolean
  message?: string
  data?: any
}

interface RegisterData {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  
  const login = async (credentials: { username: string; password: string; rememberMe?: boolean }) => {
    const result = await authStore.login(credentials)
    
    if (result.success) {
      // Get redirect URL from query params or default to dashboard
      const route = useRoute()
      const redirectTo = route.query.redirect as string || '/dashboard'
      
      await navigateTo(redirectTo)
    }
    
    return result
  }
  
  const logout = async () => {
    await authStore.logout()
  }
  
  const register = async (userData: RegisterData): Promise<ApiResponse> => {
    // Implement registration logic
    try {
      const response = await $fetch<ApiResponse>('/auth/register', {
        method: 'POST',
        body: userData
      })
      
      // Auto-login after successful registration
      if (response.success) {
        await login({
          username: userData.username,
          password: userData.password
        })
      }
      
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }
  
  const forgotPassword = async (email: string): Promise<ApiResponse> => {
    try {
      const response = await $fetch<ApiResponse>('/auth/forgot-password', {
        method: 'POST',
        body: { email }
      })
      
      return response
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    }
  }
  
  const resetPassword = async (token: string, newPassword: string): Promise<ApiResponse> => {
    try {
      const response = await $fetch<ApiResponse>('/auth/reset-password', {
        method: 'POST',
        body: { token, newPassword }
      })
      
      return response
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }
  
  const checkAuth = () => {
    return authStore.authenticated
  }
  
  const requireAuth = () => {
    if (!authStore.authenticated) {
      navigateTo('/auth/login')
      return false
    }
    return true
  }
  
  const requireRole = (role: string | string[]) => {
    const roles = Array.isArray(role) ? role : [role]
    
    if (!authStore.authenticated) {
      navigateTo('/auth/login')
      return false
    }
    
    if (!authStore.hasAnyRole(roles)) {
      navigateTo('/403') // Or show error
      return false
    }
    
    return true
  }
  
  return {
    // State
    user: computed(() => authStore.user),
    authenticated: computed(() => authStore.authenticated),
    loading: computed(() => authStore.loading),
    error: computed(() => authStore.error),
    
    // Getters
    isAuthenticated: computed(() => authStore.isAuthenticated),
    hasRole: authStore.hasRole,
    hasAnyRole: authStore.hasAnyRole,
    hasPermission: authStore.hasPermission,
    
    // Actions
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    checkAuth,
    requireAuth,
    requireRole,
    
    // Store actions
    fetchCurrentUser: authStore.fetchCurrentUser,
    validateToken: authStore.validateToken,
    clearError: authStore.clearError
  }
}
import { defineStore } from 'pinia'
import { authAPI } from '~/utils/api'
import type { CookieRef } from '#app'

interface User {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  roles: string[]
  permissions?: string[]
}

interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: User
}

interface AuthState {
  user: User | null
  authenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    authenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => state.authenticated,
    currentUser: (state) => state.user,
    userRoles: (state) => state.user?.roles || [],
    hasRole: (state) => (role: string) => {
      return state.user?.roles?.includes(role) || false
    },
    hasAnyRole: (state) => (roles: string[]) => {
      return roles.some(role => state.user?.roles?.includes(role))
    },
    hasPermission: (state) => (permission: string) => {
      return state.user?.permissions?.includes(permission) || false
    }
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        const response = await authAPI.login(credentials)
        const data: AuthResponse = response.data

        // Store tokens in cookies
        const tokenCookie = useCookie('token', {
          httpOnly: false, // Set to true in production with proper backend setup
          secure: true, // Use HTTPS in production
          sameSite: 'lax',
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : undefined // 30 days if remember me
        })
        
        const refreshTokenCookie = useCookie('refreshToken', {
          httpOnly: false, // Set to true in production
          secure: true,
          sameSite: 'lax',
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7 // 7-30 days
        })

        tokenCookie.value = data.accessToken
        refreshTokenCookie.value = data.refreshToken

        // Update store state
        this.user = data.user
        this.authenticated = true
        this.loading = false

        // Store user data in localStorage for persistence (optional)
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }

        return { success: true, user: data.user }
      } catch (error: any) {
        this.loading = false
        this.authenticated = false
        this.user = null
        
        if (error.response?.status === 401) {
          this.error = 'Invalid username or password'
        } else if (error.response?.status === 403) {
          this.error = 'Account is disabled or locked'
        } else {
          this.error = error.response?.data?.message || 'Login failed. Please try again.'
        }
        
        return { success: false, error: this.error }
      }
    },

    async logout() {
      try {
        // Call logout endpoint to invalidate token on backend
        await authAPI.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        // Clear local state regardless of API call result
        this.clearAuth()
        
        // Redirect to login
        await navigateTo('/auth/login')
      }
    },

    async fetchCurrentUser() {
      try {
        const token = useCookie('token').value
        
        if (!token) {
          this.authenticated = false
          return null
        }

        const response = await authAPI.getCurrentUser()
        this.user = response.data
        this.authenticated = true
        
        // Update localStorage
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        
        return this.user
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        this.clearAuth()
        return null
      }
    },

    async validateToken() {
      try {
        const token = useCookie('token').value
        
        if (!token) {
          return false
        }

        const response = await authAPI.validateToken()
        return response.data.valid === true
      } catch (error) {
        return false
      }
    },

    async initializeAuth() {
      const token = useCookie('token').value
      
      if (token) {
        // Try to restore user from localStorage first (faster)
        if (process.client) {
          const storedUser = localStorage.getItem('user')
          if (storedUser) {
            try {
              this.user = JSON.parse(storedUser)
              this.authenticated = true
            } catch (e) {
              console.error('Failed to parse stored user:', e)
            }
          }
        }
        
        // Then validate and fetch fresh user data from server
        const isValid = await this.validateToken()
        
        if (isValid) {
          await this.fetchCurrentUser()
        } else {
          this.clearAuth()
        }
      } else {
        this.authenticated = false
      }
    },

    clearAuth() {
      // Clear cookies
      const tokenCookie = useCookie('token')
      const refreshTokenCookie = useCookie('refreshToken')
      
      tokenCookie.value = null
      refreshTokenCookie.value = null
      
      // Clear store state
      this.user = null
      this.authenticated = false
      this.error = null
      
      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('user')
      }
    },

    setError(error: string | null) {
      this.error = error
    },

    clearError() {
      this.error = null
    }
  }
})
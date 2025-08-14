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
        console.log('Backend response:', response)
        
        let accessToken, refreshToken, userData
        
        if (typeof response.data === 'string') {
          // Backend returns just the token
          accessToken = response.data
          
          // Decode the token to get user info
          const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]))
          console.log('Token payload:', tokenPayload)
          
          // Create basic user object from token
          userData = {
            id: null, // We don't have ID yet
            username: tokenPayload.sub?.split('@')[0] || 'User',
            email: tokenPayload.sub,
            roles: ['USER'], // Default role, will be updated
            permissions: []
          }
          
          refreshToken = accessToken
        } else {
          accessToken = response.data.accessToken
          refreshToken = response.data.refreshToken
          userData = response.data.user
        }
        
        // Set cookies with proper settings for development
        const tokenCookie = useCookie('token', {
          httpOnly: false,
          secure: false, // Must be false for localhost
          sameSite: 'lax', // Use 'lax' instead of 'strict'
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24, // At least 1 day
          encode: value => value, // Don't encode
          decode: value => value  // Don't decode
        })
        
        const refreshTokenCookie = useCookie('refreshToken', {
          httpOnly: false,
          secure: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          encode: value => value,
          decode: value => value
        })
        
        tokenCookie.value = accessToken
        refreshTokenCookie.value = refreshToken
        
        console.log('Token set:', tokenCookie.value)
        
        this.user = userData
        this.authenticated = true
        this.loading = false
        
        // Get full user details
        try {
          const email = userData.email
          console.log('Looking for user with email:', email)
          
          // Get all users and find yours
          const usersResponse = await userAPI.getAll()
          console.log('All users response:', usersResponse)
          
          // Find user with exact email match
          const currentUser = usersResponse.data.find(u => u.email === email)
          
          if (currentUser) {
            console.log('Found current user:', currentUser)
            
            // Handle role conversion
            let roles = ['USER']
            if (typeof currentUser.role === 'string') {
              // Convert "ROLE_ADMIN" to ["ADMIN"]
              const roleName = currentUser.role.replace('ROLE_', '')
              roles = [roleName]
            } else if (Array.isArray(currentUser.roles)) {
              roles = currentUser.roles.map(r => r.replace('ROLE_', ''))
            }
            
            // Update user with full details
            this.user = {
              id: currentUser.id,
              username: currentUser.username || currentUser.email?.split('@')[0],
              email: currentUser.email,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              roles: roles,
              permissions: currentUser.permissions || []
            }
            
            console.log('Updated user with roles:', this.user)
            
            // Store user ID for future use
            if (process.client) {
              localStorage.setItem('user', JSON.stringify(this.user))
              localStorage.setItem('userId', String(currentUser.id))
            }
          } else {
            console.log('User not found in users list, continuing with token data')
          }
        } catch (err) {
          console.log('Could not fetch user details:', err)
          // Continue with basic user info from token
        }
        
        return { success: true, user: this.user }
      } catch (error: any) {
        this.loading = false
        this.authenticated = false
        
        let errorMessage = 'Login failed'
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.response?.status === 401) {
          errorMessage = 'Invalid username or password'
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later'
        } else if (error.message) {
          errorMessage = error.message
        }
        
        this.error = errorMessage
        
        return { 
          success: false, 
          error: errorMessage,
          statusCode: error.response?.status 
        }
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

        // Get stored user ID from localStorage
        const userId = localStorage.getItem('userId')
        
        if (userId) {
          // Use the /api/users/{id} endpoint
          try {
            const response = await userAPI.getById(userId)
            const userDetails = response.data
            
            // Handle role conversion
            let roles = ['USER']
            if (typeof userDetails.role === 'string') {
              const roleName = userDetails.role.replace('ROLE_', '')
              roles = [roleName]
            } else if (Array.isArray(userDetails.roles)) {
              roles = userDetails.roles.map(r => r.replace('ROLE_', ''))
            }
            
            this.user = {
              id: userDetails.id,
              username: userDetails.username || userDetails.email?.split('@')[0],
              email: userDetails.email,
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              roles: roles,
              permissions: userDetails.permissions || []
            }
            
            this.authenticated = true
            
            // Update localStorage
            if (process.client) {
              localStorage.setItem('user', JSON.stringify(this.user))
            }
            
            return this.user
          } catch (err) {
            console.log('Could not fetch user by ID, trying by email...')
          }
        }
        
        // If no user ID or fetching by ID failed, try to get from token and find user
        const tokenPayload = JSON.parse(atob(token.split('.')[1]))
        const email = tokenPayload.sub
        
        // Get all users and find current one with exact email match
        const usersResponse = await userAPI.getAll()
        const currentUser = usersResponse.data.find(u => u.email === email)
        
        if (currentUser) {
          // Handle role conversion
          let roles = ['USER']
          if (typeof currentUser.role === 'string') {
            const roleName = currentUser.role.replace('ROLE_', '')
            roles = [roleName]
          } else if (Array.isArray(currentUser.roles)) {
            roles = currentUser.roles.map(r => r.replace('ROLE_', ''))
          }
          
          this.user = {
            id: currentUser.id,
            username: currentUser.username || currentUser.email?.split('@')[0],
            email: currentUser.email,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            roles: roles,
            permissions: currentUser.permissions || []
          }
          
          this.authenticated = true
          
          // Store for future use
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('userId', String(currentUser.id))
          }
        } else {
          console.log('User not found with email:', email)
        }
        
        return this.user
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        // Don't clear auth here, token might still be valid
        return null
      }
    },

    async validateToken() {
      try {
        const token = useCookie('token').value
        
        if (!token) {
          return false
        }

        // Since you don't have /auth/validate endpoint,
        // validate token locally by checking expiration
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          const exp = payload.exp
          const now = Math.floor(Date.now() / 1000)
          
          // Token is valid if not expired
          const isValid = exp > now
          console.log('Token validation:', { exp, now, isValid })
          return isValid
        } catch (e) {
          console.error('Failed to parse token:', e)
          return false
        }
      } catch (error) {
        console.error('Token validation error:', error)
        return false
      }
    },

    async refreshAccessToken() {
      try {
        const refreshToken = useCookie('refreshToken').value
        
        if (!refreshToken) {
          this.clearAuth()
          return false
        }

        const response = await authAPI.refresh(refreshToken)
        const data = response.data
        
        // Update tokens
        const tokenCookie = useCookie('token')
        const refreshTokenCookie = useCookie('refreshToken')
        
        tokenCookie.value = data.accessToken || data
        
        if (data.refreshToken) {
          refreshTokenCookie.value = data.refreshToken
        }
        
        return true
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.clearAuth()
        return false
      }
    },

    async initializeAuth() {
      console.log('Initializing auth...')
      
      const token = useCookie('token').value
      console.log('Token found:', !!token)
      
      if (!token) {
        this.authenticated = false
        return
      }
      
      // First, try to restore user from localStorage (fast)
      if (process.client) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          try {
            this.user = JSON.parse(storedUser)
            this.authenticated = true
            console.log('User restored from localStorage:', this.user)
          } catch (e) {
            console.error('Failed to parse stored user:', e)
          }
        }
      }
      
      // Check if token is expired
      const isValid = await this.validateToken()
      console.log('Token is valid:', isValid)
      
      if (isValid) {
        // Token is valid, try to fetch fresh user data
        try {
          await this.fetchCurrentUser()
          console.log('User data refreshed')
        } catch (error) {
          console.error('Could not refresh user data:', error)
          // Keep using cached data if available
        }
      } else {
        // Token expired, try to refresh
        console.log('Token expired, attempting refresh...')
        const refreshed = await this.refreshAccessToken()
        
        if (refreshed) {
          console.log('Token refreshed successfully')
          await this.fetchCurrentUser()
        } else {
          console.log('Token refresh failed, clearing auth')
          this.clearAuth()
        }
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
        localStorage.removeItem('userId')
      }
    },

    setError(error: string | null) {
      this.error = error
    },

    clearError() {
      this.error = null
    },

    logUserOut() {
      return this.logout()
    }
  }
})
// utils/api.js
import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8080',  // Removed /api
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = useCookie('token').value
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration and errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Try to refresh token
      const refreshToken = useCookie('refreshToken').value
      
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8080'}/auth/refresh`,
            { refreshToken }
          )
          
          const { accessToken, refreshToken: newRefreshToken } = response.data
          
          // Update tokens in cookies
          const tokenCookie = useCookie('token')
          const refreshTokenCookie = useCookie('refreshToken')
          
          tokenCookie.value = accessToken
          refreshTokenCookie.value = newRefreshToken
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          // Refresh failed, redirect to login
          const authStore = useAuthStore()
          authStore.logUserOut()
          
          await navigateTo('/auth/login')
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, redirect to login
        const authStore = useAuthStore()
        authStore.logUserOut()
        
        await navigateTo('/auth/login')
      }
    }
    
    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data)
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),  // Fixed: was 'post' instead of 'api.post'
  logout: () => api.post('/auth/logout'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  validateToken: () => api.get('/auth/validate')
}

// User API endpoints - assuming these might be under /api prefix
export const userAPI = {
  getAll: (params) => api.get('/api/users', { params }),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (userData) => api.post('/api/users', userData),
  update: (id, userData) => api.put(`/api/users/${id}`, userData),
  delete: (id) => api.delete(`/api/users/${id}`),
  updateProfile: (userData) => api.put('/api/users/profile', userData),
  changePassword: (passwords) => api.post('/api/users/change-password', passwords),
  getProfile: () => api.get('/api/users/me')
}

// Customer API endpoints (example for CRM)
export const customerAPI = {
  getAll: (params) => api.get('/api/customers', { params }),
  getById: (id) => api.get(`/api/customers/${id}`),
  create: (customerData) => api.post('/api/customers', customerData),
  update: (id, customerData) => api.put(`/api/customers/${id}`, customerData),
  delete: (id) => api.delete(`/api/customers/${id}`),
  search: (query) => api.get('/api/customers/search', { params: { q: query } })
}

// Export the configured axios instance for custom requests
export default api
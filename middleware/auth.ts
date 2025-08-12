// middleware/auth.ts
import { useAuthStore } from '~/stores/auth'

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email'
]

// Define role-based route access
const ROLE_ROUTES: Record<string, string[]> = {
  '/admin': ['ADMIN', 'SUPER_ADMIN'],
  '/admin/users': ['ADMIN', 'SUPER_ADMIN'],
  '/admin/settings': ['SUPER_ADMIN'],
  '/dashboard/crm': ['USER', 'ADMIN', 'SUPER_ADMIN'],
  '/customers': ['USER', 'ADMIN', 'SUPER_ADMIN'],
  '/reports': ['ADMIN', 'SUPER_ADMIN'],
  '/pages/team': ['USER', 'ADMIN', 'SUPER_ADMIN']
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const token = useCookie('token')
  
  // Get the full path
  const fullPath = to.path
  
  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => fullPath.startsWith(route))
  
  // Initialize auth state if not already done
  if (!authStore.authenticated && token.value && !isPublicRoute) {
    await authStore.initializeAuth()
  }
  
  // Log for debugging (remove in production)
  if (process.dev) {
    console.log('Auth Middleware:', {
      path: fullPath,
      authenticated: authStore.authenticated,
      hasToken: !!token.value,
      isPublicRoute,
      user: authStore.user?.username
    })
  }
  
  // Public routes - accessible without authentication
  if (isPublicRoute) {
    // If user is already authenticated and tries to access login/register, redirect to dashboard
    if (authStore.authenticated && (fullPath === '/auth/login' || fullPath === '/auth/register')) {
      return navigateTo('/dashboard')
    }
    return // Allow access to public routes
  }
  
  // Check authentication
  if (!authStore.authenticated || !token.value) {
    // Store the intended destination
    const redirectTo = fullPath !== '/' ? fullPath : '/dashboard/crm'
    
    // Redirect to login with return URL
    return navigateTo({
      path: '/auth/login',
      query: { redirect: redirectTo }
    })
  }
  
  // Check role-based access
  const routeRequiredRoles = Object.entries(ROLE_ROUTES).find(([route]) => 
    fullPath.startsWith(route)
  )?.[1]
  
  if (routeRequiredRoles && !authStore.hasAnyRole(routeRequiredRoles)) {
    // User doesn't have required role
    console.warn(`Access denied. Required roles: ${routeRequiredRoles.join(', ')}`)
    
    // Show error and redirect to dashboard or 403 page
    if (process.client) {
      // You can show a toast notification here if you have a notification system
      alert('Access denied. You do not have permission to view this page.')
    }
    
    return navigateTo('/dashboard')
  }
  
  // Optional: Validate token periodically
  if (process.client) {
    // Check if we should validate the token (e.g., every 5 minutes)
    const lastValidation = sessionStorage.getItem('lastTokenValidation')
    const now = Date.now()
    
    if (!lastValidation || now - parseInt(lastValidation) > 5 * 60 * 1000) {
      const isValid = await authStore.validateToken()
      
      if (!isValid) {
        authStore.clearAuth()
        return navigateTo({
          path: '/auth/login',
          query: { redirect: fullPath, expired: 'true' }
        })
      }
      
      sessionStorage.setItem('lastTokenValidation', now.toString())
    }
  }
  
  // Allow navigation
  return
})
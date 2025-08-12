<script setup lang="ts">
import { ref } from 'vue'
import passwordInput from '~/components/UI/passwordInput.vue'
const { login, loading, error, clearError } = useAuth()

// Form data
const email = ref('')
const password = ref('')
const errorMsg = ref('')

// Handle login
const handleLogin = async () => {
  // Clear previous errors
  errorMsg.value = ''
  clearError()
  
  // Validate input
  if (!email.value || !password.value) {
    errorMsg.value = 'Please enter both email and password.'
    return
  }
  
  try {
    // Use the auth composable login method
    const result = await login({
      username: email.value,
      password: password.value,
      rememberMe: false // You can add a checkbox for this
    })
    
    if (!result.success) {
      errorMsg.value = result.error || 'Email sau parolă incorecte.'
    }
    // If successful, the login method will handle navigation automatically
    
  } catch (err: any) {
    console.error('[AUTH] Login error:', err)
    errorMsg.value = err.response?.data?.message || 'Eroare de rețea sau server. Încearcă mai târziu.'
  }
}

// Handle Enter key press
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleLogin()
  }
}

// Set page meta
definePageMeta({ 
  layout: 'custom',
  middleware: [] // No auth middleware for login page
})

// Check if user is already logged in
onMounted(() => {
  const route = useRoute()
  const { authenticated } = useAuth()
  
  // If already authenticated, redirect to intended page or dashboard
  if (authenticated.value) {
    const redirectTo = route.query.redirect as string || '/dashboard/crm'
    navigateTo(redirectTo)
  }
  
  // Show message if redirected due to expired session
  if (route.query.expired === 'true') {
    errorMsg.value = 'Your session has expired. Please login again.'
  }
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-items-center authentication authentication-basic h-100">
      <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
        <div class="my-5 d-flex justify-content-center">
          <NuxtLink to='/'>
            <img src="/images/brand-logos/desktop-logo.png" alt="logo" class="desktop-logo">
            <img src="/images/brand-logos/desktop-dark.png" alt="logo" class="desktop-dark">
          </NuxtLink>
        </div>

        <div class="card custom-card">
          <div class="card-body p-5">
            <p class="h5 fw-semibold mb-2 text-center">Sign In</p>

            <div v-if="errorMsg || error" class="alert alert-danger">
              {{ errorMsg || error }}
            </div>

            <div class="row gy-3">
              <div class="col-xl-12">
                <label class="form-label text-default">User Name</label>
                <input 
                  v-model="email" 
                  type="email" 
                  class="form-control" 
                  placeholder="Enter email"
                  @keypress="handleKeyPress"
                  :disabled="loading" 
                />
              </div>

              <div class="col-xl-12 mb-2">
                <label class="form-label text-default d-block">Password</label>
                <div class="input-group">
                  <passwordInput 
                    v-model="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password"
                    @keypress="handleKeyPress"
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="col-xl-12 d-grid mt-2">
                <button 
                  @click="handleLogin" 
                  :disabled="loading || !email || !password" 
                  class="btn btn-lg btn-primary"
                >
                  <span v-if="loading">
                    <i class="spinner-border spinner-border-sm me-2"></i>
                    Logging in...
                  </span>
                  <span v-else>Sign In</span>
                </button>
              </div>
            </div>

            <div class="text-center mt-3">
              <p class="fs-12 text-muted">
                Dont have an account? 
                <NuxtLink to="/auth/register/basic" class="text-primary">Sign Up</NuxtLink>
              </p>
            </div>

            <div class="text-center my-3 authentication-barrier">
              <span>OR</span>
            </div>

            <div class="btn-list text-center">
              <button class="btn btn-icon btn-light" :disabled="loading">
                <i class="ri-facebook-line fw-bold text-dark op-7"></i>
              </button>
              <button class="btn btn-icon btn-light" :disabled="loading">
                <i class="ri-google-line fw-bold text-dark op-7"></i>
              </button>
              <button class="btn btn-icon btn-light" :disabled="loading">
                <i class="ri-twitter-x-line fw-bold text-dark op-7"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
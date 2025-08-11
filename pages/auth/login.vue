<script setup lang="ts">
import { ref } from 'vue'
import passwordInput from '~/components/UI/passwordInput.vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCookie } from '#app'

const errorMsg = ref('')
const loading = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const tokenCookie = useCookie('token')

const login = async () => {
  errorMsg.value = ''
  loading.value = true

  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      errorMsg.value = 'Email sau parolă incorecte.'
      loading.value = false
      return
    }

    const token = await response.text()

  const tokenCookie = useCookie('token', {
  path: '/',
  maxAge: 60 * 60 * 24, // 1 zi
  sameSite: 'lax',
  secure: false, // în producție true, dacă ai HTTPS
  })

// După aia setezi doar valoarea:
tokenCookie.value = token

    // Actualizează store-ul
    authStore.authenticated = true

    loading.value = false
    router.push('/dashboard/crm') // redirecționare după login

  } catch (error) {
    console.error('[AUTH] Eroare de rețea sau server:', error)
    errorMsg.value = 'Eroare de rețea sau server. Încearcă mai târziu.'
    loading.value = false
  }
}
definePageMeta({ layout: 'custom' })

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

            <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

            <div class="row gy-3">
              <div class="col-xl-12">
                <label class="form-label text-default">User Name</label>
                <input v-model="email" type="email" class="form-control" placeholder="Enter email" />
              </div>

              <div class="col-xl-12 mb-2">
                <label class="form-label text-default d-block">Password</label>
                <div class="input-group">
                  <passwordInput v-model="password" name="password" id="password" placeholder="Password" />
                </div>
              </div>

              <div class="col-xl-12 d-grid mt-2">
                <button @click="login" :disabled="loading" class="btn btn-lg btn-primary">
                  {{ loading ? 'Logging in...' : 'Sign In' }}
                </button>
              </div>
            </div>

            <div class="text-center mt-3">
              <p class="fs-12 text-muted">Dont have an account? <NuxtLink to="/auth/register/basic" class="text-primary">Sign Up</NuxtLink></p>
            </div>

            <div class="text-center my-3 authentication-barrier">
              <span>OR</span>
            </div>

            <div class="btn-list text-center">
              <button class="btn btn-icon btn-light"><i class="ri-facebook-line fw-bold text-dark op-7"></i></button>
              <button class="btn btn-icon btn-light"><i class="ri-google-line fw-bold text-dark op-7"></i></button>
              <button class="btn btn-icon btn-light"><i class="ri-twitter-x-line fw-bold text-dark op-7"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

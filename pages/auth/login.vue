<script lang="ts" setup>
import passwordInput from '@/components/UI/passwordInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const login = async () => {
  errorMsg.value = ''
  loading.value = true

  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.token) {
      errorMsg.value = data.message || 'Login failed.'
      loading.value = false
      return
    }

    useCookie('token').value = data.token
    loading.value = false
    router.push('/')
  } catch (error) {
    errorMsg.value = 'Server error or network issue.'
    loading.value = false
  }
}
</script>



<script lang="ts">
export default {
  components: {
    passwordInput
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-items-center authentication h-100">
      <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        <div class="card p-4">
          <h3 class="mb-3 text-center">Sign In</h3>

          <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

          <div class="mb-3">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control" placeholder="Enter email" />
          </div>

          <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Enter password" />
          </div>

          <button :disabled="loading" @click="login" class="btn btn-primary w-100">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>

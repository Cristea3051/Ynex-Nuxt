<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import passwordInput from '@/components/UI/passwordInput.vue';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const phone = ref('');
const address = ref('');
const agreedToTerms = ref(false);

const errorMsg = ref('');
const loading = ref(false);

const submitForm = async () => {
  errorMsg.value = '';

  if (!agreedToTerms.value) {
    errorMsg.value = 'You must agree to the Terms & Conditions.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;

  try {
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        address: address.value,
      }),
    });

    if (!response.ok) {
      const data = await response.text();
      errorMsg.value = data || 'Registration failed.';
      loading.value = false;
      return;
    }

    loading.value = false;
    router.push('/authentication/sign-in/basic');

  } catch (e) {
    errorMsg.value = 'Network or server error.';
    loading.value = false;
  }
};
</script>

<template>
  <div class="container-lg">
    <div class="row justify-content-center align-items-center authentication authentication-basic h-100">
      <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
        <div class="my-5 d-flex justify-content-center">
          <NuxtLink to="/">
            <img src="/images/brand-logos/desktop-logo.png" alt="logo" class="desktop-logo" />
            <img src="/images/brand-logos/desktop-dark.png" alt="logo" class="desktop-dark" />
          </NuxtLink>
        </div>
        <div class="card custom-card">
          <div class="card-body p-5">
            <p class="h5 fw-semibold mb-2 text-center">Sign Up</p>
            <p class="mb-4 text-muted op-7 fw-normal text-center">
              Welcome & Join us by creating a free account!
            </p>
            <div class="row gy-3">
              <div class="col-xl-12">
                <label for="signup-name" class="form-label text-default">Name</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="signup-name"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="col-xl-12">
                <label for="signup-email" class="form-label text-default">Email</label>
                <input
                  type="email"
                  class="form-control form-control-lg"
                  id="signup-email"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div class="col-xl-12">
                <label for="signup-phone" class="form-label text-default">Phone</label>
                <input
                  type="tel"
                  class="form-control form-control-lg"
                  id="signup-phone"
                  placeholder="Phone"
                  v-model="phone"
                />
              </div>
              <div class="col-xl-12">
                <label for="signup-address" class="form-label text-default">Address</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="signup-address"
                  placeholder="Address"
                  v-model="address"
                />
              </div>
              <div class="col-xl-12">
                <label for="signup-password" class="form-label text-default">Password</label>
                <div class="input-group">
                  <passwordInput
                    v-model="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="col-xl-12 mb-2">
                <label for="signup-confirmpassword" class="form-label text-default"
                  >Confirm Password</label
                >
                <div class="input-group">
                  <passwordInput
                    v-model="confirmPassword"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                  v-model="agreedToTerms"
                />
                <label class="form-check-label text-muted fw-normal" for="defaultCheck1">
                  By creating an account you agree to our
                  <NuxtLink to="/pages/terms-conditions" class="text-success"
                    ><u>Terms & Conditions</u></NuxtLink
                  >
                  and <a class="text-success"><u>Privacy Policy</u></a>
                </label>
              </div>
              <div class="col-xl-12 d-grid mt-2">
                <button
                  class="btn btn-lg btn-primary"
                  @click.prevent="submitForm"
                  :disabled="loading"
                >
                  Create Account
                </button>
              </div>
            </div>
            <p v-if="errorMsg" class="text-danger mt-2 text-center">{{ errorMsg }}</p>
            <div class="text-center">
              <p class="fs-12 text-muted mt-3">
                Already have an account?
                <NuxtLink to="/authentication/sign-in/basic" class="text-primary"
                  >Sign In</NuxtLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

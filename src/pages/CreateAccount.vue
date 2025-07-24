<template>
  <q-page class="q-pa-md flex flex-center bg-grey-2">
    <q-card class="q-pa-lg shadow-2" style="width: 400px; max-width: 90vw;">
      <q-btn flat dense icon="arrow_back" label="Back to Home" class="q-mb-md" @click="goHome" color="primary" />

      <div class="text-center q-mb-md">
        <q-avatar size="56px" class="q-mb-sm text-white" style="background-color: #1565c0">
          <q-icon name="work" size="30px" />
        </q-avatar>
        <div class="text-h6">Create Account</div>
        <div class="text-caption text-grey-7">Join JobHub and start your career journey</div>
      </div>

      <q-form @submit.prevent="createAccount">
        <div class="row q-col-gutter-sm q-mb-sm">
          <div class="col">
            <q-input v-model="firstName" label="First name" outlined dense />
          </div>
          <div class="col">
            <q-input v-model="lastName" label="Last name" outlined dense />
          </div>
        </div>

        <q-input v-model="email" label="Enter your email" type="email" outlined dense class="q-mb-sm" />
        <q-input v-model="password" label="Create a password" type="password" outlined dense class="q-mb-sm" />
        <q-input v-model="confirmPassword" label="Confirm your password" type="password" outlined dense class="q-mb-md" />

        <q-checkbox v-model="agree" label="I agree to the" class="q-mb-sm" />
        <div class="text-subtitle2 q-mb-sm" style="color: #1565c0">
          <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
        </div>

        <q-checkbox v-model="subscribe" label="Subscribe to our newsletter for job updates" class="q-mb-md" />

        <q-btn type="submit" label="Create Account" unelevated class="full-width q-mb-md" style="background-color: #1565c0; color: white" />

        <div class="text-center text-grey-6 q-mb-sm">or</div>

        <q-btn label="Sign up with Google" icon="img:https://img.icons8.com/color/16/000000/google-logo.png" outline class="full-width q-mb-sm" />
        <q-btn label="Sign up with LinkedIn" icon="img:https://img.icons8.com/ios-filled/20/0077B5/linkedin.png" outline class="full-width" />

        <div class="text-center q-mt-md text-caption text-grey-7">
          Already have an account?
          <router-link to="/login" class="text-bold" style="color: #1565c0">Sign In</router-link>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)
const subscribe = ref(false)

const router = useRouter()

function goHome() {
  router.push('/')
}

function createAccount() {
  if (!agree.value) {
    alert('You must agree to the terms to proceed.')
    return
  }

  console.log({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    subscribe: subscribe.value
  })
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

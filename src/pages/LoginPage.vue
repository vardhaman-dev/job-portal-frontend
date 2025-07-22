<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card class="q-pa-lg q-mx-sm" style="width: 100%; max-width: 420px; border-radius: 12px;">

      <!-- Back to Home -->
      <div class="q-mb-md row items-center text-grey-7 cursor-pointer" @click="$router.push('/')">
        <q-icon name="arrow_back" size="20px" class="q-mr-sm" />
        <span class="text-weight-medium">Back to Home</span>
      </div>

      <!-- Logo -->
      <div class="q-mb-lg text-center">
        <q-avatar size="64px" class="bg-blue-1 q-mb-sm">
          <q-icon name="work" size="32px" color="#1565c0" />
        </q-avatar>
        <div class="text-h6 text-weight-bold text-grey-10">Welcome Back</div>
        <div class="text-subtitle2 text-grey-6">Sign in to your JobHub account</div>
      </div>

      <!-- Form -->
      <q-form @submit="handleLogin" class="q-gutter-md">
        <q-input
          filled
          dense
          label="Email"
          v-model="email"
          type="email"
          class="bg-grey-2"
          borderless
        />

        <q-input
          filled
          dense
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="bg-grey-2"
          borderless
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
              color="grey-6"
            />
          </template>
        </q-input>

        <!-- Options Row -->
        <div class="row items-center justify-between">
          <q-checkbox v-model="rememberMe" label="Remember me" size="sm" />
          <q-btn
            flat
            label="Forgot Password?"
            style="color: #1565c0;"
            size="sm"
            class="q-pa-none"
            @click="$router.push('/forgot-password')"
          />
        </div>

        <!-- Sign In Button -->
        <q-btn
          label="Sign In"
          class="full-width q-mt-sm bg-custom-blue"
          unelevated
          type="submit"
        />

        <!-- Divider -->
        <div class="row items-center q-my-md">
          <q-separator />
          <div class="q-px-sm text-grey-6">or</div>
          <q-separator />
        </div>

        <!-- Social Buttons -->
        <q-btn
          outline
          class="full-width q-mb-sm"
          color="grey-7"
          no-caps
        >
          <q-icon left name="g_translate" />
          Continue with Google
        </q-btn>

        <q-btn
          outline
          class="full-width"
          color="grey-8"
          no-caps
        >
          <q-icon left name="linkedin" />
          Continue with LinkedIn
        </q-btn>
      </q-form>

      <!-- Signup Link -->
      <div class="q-mt-md text-center text-grey-8">
        Don’t have an account?
        <span class="custom-blue cursor-pointer text-weight-medium" @click="$router.push('/signup')">
          Sign Up
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const handleLogin = () => {
  console.log('Login:', email.value, password.value)
}
</script>

<style scoped>
.q-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.custom-blue {
  color: #1565c0 !important;
}

.bg-custom-blue {
  background-color: #1565c0 !important;
  color: white !important;
}
</style>

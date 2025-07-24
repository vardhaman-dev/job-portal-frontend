<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card
      class="q-pa-xl q-mx-sm"
      style="width: 100%; max-width: 450px; border-radius: 16px;"
    >
      <!-- Back to Home -->
      <div
        class="q-mb-lg row items-center text-grey-6 cursor-pointer"
        @click="$router.push('/')"
        style="font-size: 14px;"
      >
        <q-icon name="arrow_back" size="20px" class="q-mr-sm" />
        <span class="text-weight-medium">Back to Home</span>
      </div>

      <!-- Logo -->
      <div class="q-mb-lg text-center">
        <q-avatar size="72px" class="bg-blue-1 q-mb-sm">
          <q-icon name="work" size="38px" color="#1565c0" />
        </q-avatar>
        <div class="text-h5 text-weight-bold text-grey-9">Welcome Back</div>
        <div class="text-subtitle2 text-grey-6">Sign in to your JobHub account</div>
      </div>

      <!-- Form -->
      <q-form @submit="handleLogin" class="q-gutter-md">
        <q-input
          filled
          dense
          label="Email address"
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

        <!-- Options -->
        <div class="row items-center justify-between q-mt-sm">
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
          class="full-width bg-custom-blue"
          unelevated
          rounded
          type="submit"
          size="lg"
        />

        <!-- Divider -->
        <div class="row items-center q-my-md no-wrap">
          <q-separator class="col" />
          <div class="q-px-sm text-grey-6 text-caption">or continue with</div>
          <q-separator class="col" />
        </div>

        <!-- Social Buttons -->
        <q-btn
          outline
          class="full-width q-mb-sm"
          color="grey-8"
          no-caps
          size="md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style="width: 20px; margin-right: 8px;"
          />
          Continue with Google
        </q-btn>

        <q-btn
          outline
          class="full-width"
          color="grey-9"
          no-caps
          size="md"
        >
        <img
          src="https://www.svgrepo.com/show/452234/linkedin.svg"
          alt="LinkedIn"
          style="width: 20px; margin-right: 8px;"
        />
        Continue with LinkedIn
      </q-btn>
    </q-form>

      <!-- Sign Up -->
      <div class="q-mt-lg text-center text-grey-8">
        Don’t have an account?
        <span
          class="custom-blue cursor-pointer text-weight-medium"
          @click="$router.push('/create-account')"
        >
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.q-card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.custom-blue {
  color: #1565c0 !important;
}

.bg-custom-blue {
  background-color: #1565c0 !important;
  color: white !important;
}
</style>
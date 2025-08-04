<template>
  <q-page class="flex flex-center q-pa-md bg-grey-1 dark:bg-dark">
    <q-card
      class="q-pa-xl q-mx-sm shadow-10"
      style="width: 100%; max-width: 450px; border-radius: 16px;"
    >
      <!-- Back -->
      <div
        class="q-mb-lg row items-center text-grey-6 dark:text-grey-4 cursor-pointer"
        @click="goBack"
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
        <div class="text-h5 text-weight-bold text-dark dark:text-white">Welcome Back</div>
        <div class="text-subtitle2 text-grey-6 dark:text-grey-5">Sign in to your JobHub account</div>
      </div>

      <!-- Error Message -->
      <q-banner
        v-if="authStore.error"
        class="bg-red-1 text-red q-mb-md"
        rounded
      >
        {{ authStore.error }}
        <template v-slot:action>
          <q-btn flat color="red" icon="close" @click="authStore.clearError()" />
        </template>
      </q-banner>

      <!-- Success Message (for redirects after registration) -->
      <q-banner
        v-if="$route.query.registered"
        class="bg-green-1 text-green q-mb-md"
        rounded
      >
        Registration successful! Please log in with your credentials.
      </q-banner>

      <!-- Form -->
      <q-form @submit.prevent="handleLogin" class="q-gutter-md" ref="loginForm">
        <!-- Email Input -->
        <q-input
          filled
          dense
          label="Email address"
          v-model="formData.email"
          type="email"
          class="bg-grey-2 dark:bg-grey-9"
          borderless
          :rules="[
            val => !!val || 'Email is required',
            val => /.+@.+\..+/.test(val) || 'Please enter a valid email'
          ]"
          lazy-rules
          :disable="authStore.loading"
        />

        <!-- Password Input -->
        <q-input
          filled
          dense
          label="Password"
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          class="bg-grey-2 dark:bg-grey-9"
          borderless
          :rules="[val => !!val || 'Password is required']"
          lazy-rules
          :disable="authStore.loading"
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

        <!-- Remember Me & Forgot Password -->
        <div class="row items-center justify-between q-mt-sm">
          <q-checkbox
            v-model="formData.rememberMe"
            label="Remember me"
            size="sm"
            :disable="authStore.loading"
          />
          <q-btn
            flat
            label="Forgot Password?"
            style="color: #1565c0;"
            size="sm"
            class="q-pa-none"
            @click="$router.push('/forgot-password')"
            :disable="authStore.loading"
          />
        </div>

        <!-- Submit Button -->
        <q-btn
          label="Sign In"
          class="full-width bg-custom-blue"
          unelevated
          rounded
          type="submit"
          size="lg"
          :loading="authStore.loading"
        >
          <template v-slot:loading>
            <q-spinner-oval class="on-left" />
            Signing in...
          </template>
        </q-btn>

        <!-- Divider -->
        <div class="row items-center q-my-md no-wrap">
          <q-separator class="col" />
          <div class="q-px-sm text-grey-6 text-caption">or continue with</div>
          <q-separator class="col" />
        </div>

        <!-- Social Login (optional) -->
        <q-btn
          outline
          class="full-width q-mb-sm"
          color="grey-8"
          no-caps
          size="md"
          :disable="authStore.loading"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style="width: 20px; margin-right: 8px;"
          />
          Continue with Google
        </q-btn>
      </q-form>

      <!-- Sign Up Link -->
      <div class="text-center q-mt-lg">
        <span class="text-grey-7">Don't have an account? </span>
        <q-btn
          flat
          label="Sign Up"
          class="q-pa-none text-weight-medium"
          style="color: #1565c0;"
          @click="goToSignup"
          :disable="authStore.loading"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth.store';
import { Loading } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Form data
const formData = ref({
  email: '',
  password: '',
  rememberMe: false
});

const showPassword = ref(false);

const loginForm = ref(null);

// Check for registration success message on component mount
onMounted(() => {
  // If redirected from registration with success
  if (route.query.registered === 'true' && route.query.email) {
    formData.value.email = route.query.email;
    $q.notify({
      type: 'positive',
      message: 'Registration successful! Please log in with your credentials.',
      position: 'top',
      timeout: 5000
    });

    // Clean up the URL
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  // Auto-focus email field if empty
  if (!formData.value.email) {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) emailInput.focus();
  }
});

// Redirect user based on their role
const redirectBasedOnRole = () => {
  if (authStore.isJobSeeker) {
    router.push(authStore.returnUrl || '/dashboard');
  } else if (authStore.isEmployer) {
    router.push(authStore.returnUrl || '/employer-portal');
  }
  authStore.setReturnUrl(null);
};

// Handle form submission
const handleLogin = async () => {
  try {
    // Reset any previous errors
    authStore.clearError();

    // Validate form
    const valid = await loginForm.value.validate();
    if (!valid) return;

    // Show loading state
    Loading.show({
      message: 'Signing in...'
    });

    try {
      // Call the login action
      const { success, error } = await authStore.login({
        email: formData.value.email.trim(),
        password: formData.value.password
      });

      if (success) {
        // Show success message
        $q.notify({
          type: 'positive',
          message: 'Login successful!',
          position: 'top',
          timeout: 1500
        });

        // Redirect based on role
        redirectBasedOnRole();
      } else {
        // Show error message
        $q.notify({
          type: 'negative',
          message: error || 'Login failed. Please try again.',
          position: 'top'
        });
      }
    } finally {
      Loading.hide();
    }
  } catch (error) {
    console.error('Login error:', error);
    $q.notify({
      type: 'negative',
      message: 'An error occurred during login. Please try again.'
    });
  } finally {
    Loading.hide();
  }
};

// Navigation methods
const goBack = () => {
  router.push('/');
};

const goToSignup = () => {
  router.push('/create-account');
};
</script>

<style scoped>
.custom-blue {
  color: #1565c0 !important;
}

.bg-custom-blue {
  background: #1565c0 !important;
  color: white !important;
}

:deep(.q-field--filled .q-field__control) {
  border-radius: 8px !important;
}

:deep(.q-field--disabled) {
  opacity: 0.7;
}
</style>

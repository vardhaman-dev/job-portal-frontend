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
          <q-icon name="admin_panel_settings" size="38px" color="#1565c0" />
        </q-avatar>
        <div class="text-h5 text-weight-bold text-dark dark:text-white">Admin Portal</div>
        <div class="text-subtitle2 text-grey-6 dark:text-grey-5">Sign in to access the admin dashboard</div>
      </div>

      <!-- Error Message -->
      <q-banner
        v-if="errorMessage"
        class="bg-red-1 text-red q-mb-md"
        rounded
      >
        {{ errorMessage }}
        <template v-slot:action>
          <q-btn flat color="red" icon="close" @click="errorMessage = ''" />
        </template>
      </q-banner>

      <!-- Form -->
      <q-form @submit.prevent="handleLogin" class="q-gutter-md">
        <!-- Email Input -->
        <q-input
          v-model="email"
          label="Email"
          type="email"
          outlined
          dense
          :rules="[val => !!val || 'Email is required']"
          lazy-rules
          :disable="loading"
          class="q-mb-sm"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <!-- Password Input -->
        <q-input
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          :rules="[val => !!val || 'Password is required']"
          lazy-rules
          :disable="loading"
          class="q-mb-sm"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <!-- Remember Me & Forgot Password -->
        <div class="row justify-between items-center q-mb-md">
          <q-checkbox v-model="rememberMe" label="Remember me" dense />
          <q-btn
            flat
            label="Forgot Password?"
            class="q-pa-none text-caption text-weight-medium"
            style="color: #1565c0;"
            :disable="loading"
            @click="onForgotPassword"
          />
        </div>

        <!-- Submit Button -->
        <q-btn
          type="submit"
          color="primary"
          label="Sign In"
          class="full-width q-mt-md"
          :loading="loading"
          :disable="!email || !password"
          unelevated
          no-caps
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import adminService from 'src/services/admin.service';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const rememberMe = ref(false);

// Check for session expiration or other query parameters
onMounted(() => {
  if (route.query.sessionExpired === 'true') {
    errorMessage.value = 'Your session has expired. Please log in again.';
  } else if (route.query.error === 'session_verification_failed') {
    errorMessage.value = 'Session verification failed. Please log in again.';
  }
});

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const result = await adminService.login({
      email: email.value,
      password: password.value
    });

    if (result.success) {
      // Store the token and redirect to admin dashboard
      localStorage.setItem('adminToken', result.data.token);
      if (rememberMe.value) {
        // Set token to expire in 7 days if remember me is checked
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        localStorage.setItem('adminTokenExpiry', expiryDate.getTime().toString());
      }

      // Redirect to the originally requested URL or dashboard
      const redirectPath = route.query.redirect || '/admin/dashboard';
      router.push(redirectPath);
    } else {
      errorMessage.value = result.error || 'Login failed. Please check your credentials and try again.';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = 'An error occurred during login. Please try again.';
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push('/');
};

const onForgotPassword = () => {
  // TODO: Implement forgot password functionality
  $q.notify({
    type: 'info',
    message: 'Please contact the system administrator to reset your password.',
    position: 'top'
  });
};
// Expose the necessary variables and methods to the template
defineExpose({
  email,
  password,
  showPassword,
  loading,
  errorMessage,
  rememberMe,
  handleLogin,
  goBack,
  onForgotPassword
});
</script>

<style scoped>
/* Custom styles for the admin login page */
:deep(.q-field--outlined .q-field__control:before) {
  border-color: #e0e0e0;
  transition: border-color 0.3s ease;
}

:deep(.q-field--outlined.q-field--highlighted .q-field__control:before) {
  border-color: #1565c0;
  border-width: 1px;
}

:deep(.q-field--outlined.q-field--highlighted .q-field__control:after) {
  border-color: #1565c0;
  border-width: 1px;
}

:deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: #1565c0;
}

:deep(.q-field--outlined.q-field--error .q-field__control:before) {
  border-color: #f44336;
}

:deep(.q-field--outlined.q-field--error .q-field__control:after) {
  border-color: #f44336;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}

:deep(.q-field--outlined .q-field__control) {
  padding: 0 8px;
}

:deep(.q-field__label) {
  color: #757575;
  font-size: 14px;
}

:deep(.q-field--dense .q-field__control) {
  height: 44px;
}

:deep(.q-field--dense .q-field__marginal) {
  height: 44px;
}

:deep(.q-btn--unelevated) {
  border-radius: 8px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
  height: 44px;
}

:deep(.q-btn--actionable) {
  transition: all 0.3s ease;
}

:deep(.q-btn--actionable:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.2);
}

:deep(.q-btn--actionable:active) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.2);
}

:deep(.q-banner) {
  border-radius: 8px;
  padding: 12px 16px;
}

:deep(.q-banner--top-padding) {
  padding-top: 12px;
  padding-bottom: 12px;
}

:deep(.q-banner__avatar) {
  min-width: 24px;
}

:deep(.q-banner__avatar > .q-icon) {
  font-size: 20px;
}

:deep(.q-banner__message) {
  font-size: 13px;
  line-height: 1.4;
}

:deep(.q-banner__actions) {
  margin-top: 4px;
}

:deep(.q-banner--dense) {
  min-height: 40px;
}

:deep(.q-banner--dense .q-banner__avatar) {
  font-size: 20px;
  min-width: 20px;
}

:deep(.q-banner--dense .q-banner__message) {
  padding: 0;
}

:deep(.q-banner--dense .q-banner__actions) {
  margin-top: 0;
  margin-left: 12px;
}

:deep(.q-banner--dense .q-banner__actions .q-btn) {
  min-height: 24px;
  padding: 0 8px;
}

:deep(.q-banner--dense .q-banner__actions .q-btn .q-icon) {
  font-size: 20px;
}

:deep(.q-banner--dense .q-banner__actions .q-btn .q-btn__content) {
  padding: 0;
}

:deep(.q-banner--dense .q-banner__actions .q-btn .q-btn__content .block) {
  font-size: 12px;
  line-height: 1.2;
}

:deep(.q-banner--dense .q-banner__actions .q-btn .q-btn__content .block.text-weight-bold) {
  font-weight: 500;
}
</style>

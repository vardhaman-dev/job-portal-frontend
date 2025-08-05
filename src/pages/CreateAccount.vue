<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card
      class="q-pa-xl q-mx-sm"
      style="width: 100%; max-width: 500px; border-radius: 16px;"
    >
      <!-- Back to Home -->
      <div
        class="q-mb-lg row items-center text-grey-6 cursor-pointer"
        @click="goBack"
        style="font-size: 14px;"
      >
        <q-icon name="arrow_back" size="20px" class="q-mr-sm" />
        <span class="text-weight-medium">Back to Home</span>
      </div>

      <!-- Avatar and Title -->
      <div class="q-mb-lg text-center">
        <q-avatar size="72px" class="bg-blue-1 q-mb-sm">
          <q-icon name="work" size="38px" color="#1565c0" />
        </q-avatar>
        <div class="text-h5 text-weight-bold text-grey-9">Create Your Account</div>
        <div class="text-subtitle2 text-grey-6">Join our community of job seekers</div>
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

      <!-- Form -->
      <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
        <!-- Name Fields -->
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-input
              filled
              dense
              label="First name"
              v-model="formData.firstName"
              class="bg-grey-2"
              borderless
              :rules="[val => !!val || 'First name is required']"
              :disable="authStore.loading"
            />
          </div>
          <div class="col">
            <q-input
              filled
              dense
              label="Last name"
              v-model="formData.lastName"
              class="bg-grey-2"
              borderless
              :rules="[val => !!val || 'Last name is required']"
              :disable="authStore.loading"
            />
          </div>
        </div>

        <!-- Email -->
        <q-input
          filled
          dense
          label="Email address"
          v-model="formData.email"
          type="email"
          class="bg-grey-2"
          borderless
          :rules="[
            val => !!val || 'Email is required',
            val => /.+@.+\..+/.test(val) || 'Please enter a valid email'
          ]"
          lazy-rules
          :disable="authStore.loading"
        />

        <!-- Phone -->
        <q-input
          filled
          dense
          label="Phone number"
          v-model="formData.phone"
          class="bg-grey-2"
          borderless
          mask="(###) ### - ####"
          :rules="[val => !!val || 'Phone number is required']"
          :disable="authStore.loading"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>

        <!-- Password -->
        <q-input
          filled
          dense
          label="Password"
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          class="bg-grey-2"
          borderless
          :rules="[
            val => !!val || 'Password is required',
            val => val.length >= 8 || 'Password must be at least 8 characters'
          ]"
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

        <!-- Confirm Password -->
        <q-input
          filled
          dense
          label="Confirm Password"
          v-model="formData.confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="bg-grey-2 q-mb-sm"
          borderless
          :rules="[
            val => !!val || 'Please confirm your password',
            val => val === formData.password || 'Passwords do not match'
          ]"
          lazy-rules
          :disable="authStore.loading"
        >
          <template #append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword"
              color="grey-6"
            />
          </template>
        </q-input>

        <!-- Terms and Conditions -->
        <q-checkbox
          v-model="formData.termsAccepted"
          label="I agree to the Terms of Service and Privacy Policy"
          class="q-mt-md"
          :rules="[val => !!val || 'You must accept the terms and conditions']"
          :disable="authStore.loading"
        />

        <!-- Submit Button -->
        <q-btn
          label="Create Account"
          type="submit"
          class="full-width bg-custom-blue text-white"
          size="lg"
          :loading="authStore.loading"
          unelevated
        >
          <template v-slot:loading>
            <q-spinner-oval class="on-left" />
            Creating Account...
          </template>
        </q-btn>
      </q-form>

      <!-- Login Link -->
      <div class="text-center q-mt-lg">
        <span class="text-grey-7">Already have an account? </span>
        <q-btn
          flat
          label="Sign In"
          class="q-pa-none text-weight-medium"
          style="color: #1565c0;"
          @click="goToLogin"
          :disable="authStore.loading"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth.store';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Handle form submission
const handleSubmit = async () => {
  try {
    const result = await authStore.register({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      phone: formData.value.phone.replace(/\D/g, ''),
      password: formData.value.password,
    });

    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Account created successfully! Logging in...',
        position: 'top',
        timeout: 2000,
      });

      // Auto-login after registration
      const loginResult = await authStore.login({
        email: formData.value.email,
        password: formData.value.password,
      });

      if (loginResult.success) {
        setTimeout(() => {
          if (authStore.isJobSeeker) {
            router.push('/');
          } else if (authStore.isEmployer) {
            router.push('/employer-portal');
          }
        }, 2000);
      } else {
        router.push({
          path: '/login',
          query: { registered: 'true', email: formData.value.email },
        });
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};

// Navigation methods
const goBack = () => {
  router.push('/');
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
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

:deep(.q-field--filled .q-field__control:before) {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

:deep(.q-field--filled .q-field__control:hover:before) {
  border-color: #1565c0;
}

:deep(.q-checkbox__inner) {
  font-size: 14px;
}
</style>

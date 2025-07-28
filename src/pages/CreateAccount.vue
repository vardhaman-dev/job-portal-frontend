<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card
      class="q-pa-xl q-mx-sm"
      style="width: 100%; max-width: 450px; border-radius: 16px;"
    >
      <!-- Back to Home -->
      <div
        class="q-mb-lg row items-center text-grey-6 cursor-pointer"
        @click="goHome"
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
        <div class="text-h5 text-weight-bold text-grey-9">Create Account</div>
        <div class="text-subtitle2 text-grey-6">Join JobHub and start your journey</div>
      </div>

      <!-- Form -->
      <q-form @submit.prevent="createAccount" class="q-gutter-md">
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-input
              filled
              dense
              label="First name"
              v-model="firstName"
              class="bg-grey-2"
              borderless
              :rules="[val => !!val || 'First name is required']"
            />
          </div>
          <div class="col">
            <q-input
              filled
              dense
              label="Last name"
              v-model="lastName"
              class="bg-grey-2"
              borderless
              :rules="[val => !!val || 'Last name is required']"
            />
          </div>
        </div>

        <q-input
          filled
          dense
          label="Email address"
          v-model="email"
          type="email"
          class="bg-grey-2"
          borderless
          :rules="[val => /.+@.+\..+/.test(val) || 'Valid email is required']"
        />

        <q-input
          filled
          dense
          label="Create password"
          v-model="password"
          type="password"
          class="bg-grey-2"
          borderless
          :rules="[val => val.length >= 8 || 'Password must be at least 8 characters']"
        />

        <q-input
          filled
          dense
          label="Confirm password"
          v-model="confirmPassword"
          type="password"
          class="bg-grey-2"
          borderless
          :rules="[val => val === password || 'Passwords do not match']"
        />

        <q-checkbox
          v-model="agree"
          label="I agree to the Terms and Conditions & Privacy Policy"
          :rules="[val => val === true || 'You must agree to the terms']"
        />
        <q-checkbox v-model="subscribe" label="Subscribe to our newsletter for job updates" />

        <q-btn
          label="Create Account"
          type="submit"
          unelevated
          rounded
          class="full-width bg-custom-blue"
          size="lg"
          :loading="creatingAccount"
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
      <q-form v-if="otpSent" @submit.prevent="verifyOtp" class="q-gutter-md q-mt-md">
        <q-input
          filled
          dense
          label="Enter OTP"
          v-model="otp"
          type="text"
          maxlength="6"
          class="bg-grey-2"
          ref="otpInput"
          borderless
          :rules="[val => val.length === 6 || 'OTP must be 6 digits']"
        />
        <q-btn
          label="Verify OTP"
          type="submit"
          color="primary"
          unelevated
          class="full-width"
          :loading="verifying"
        />
      </q-form>

      <!-- Sign In Link -->
      <div class="q-mt-lg text-center text-grey-8">
        Already have an account?
        <span
          class="custom-blue cursor-pointer text-weight-medium"
          @click="$router.push('/login')"
        >
          Sign In
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agree = ref(false);
const subscribe = ref(false);
const otpSent = ref(false);
const otp = ref('');
const verifying = ref(false);
const creatingAccount = ref(false);
const otpInput = ref(null);

function goHome() {
  router.push('/');
}

async function createAccount() {
  if (!agree.value) {
    $q.notify({ type: 'negative', message: 'You must agree to the terms to proceed.' });
    return;
  }
  if (password.value !== confirmPassword.value) {
    $q.notify({ type: 'negative', message: 'Passwords do not match.' });
    return;
  }
  creatingAccount.value = true;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      otpSent.value = true;
      $q.notify({ type: 'positive', message: 'OTP sent to your email. Please check your inbox.' });
      await nextTick();
      otpInput.value?.focus();
    } else {
      $q.notify({ type: 'negative', message: data.message || 'Failed to send OTP.' });
    }
  } catch (error) {
    console.error('Error in createAccount:', error);
    let message = 'An error occurred while sending OTP. Please try again later.';
    if (error.message.includes('NetworkError')) {
      message = 'Network error: Please check your internet connection.';
    } else if (error.message.includes('404')) {
      message = 'API endpoint not found. Please contact support.';
    } else if (error.message.includes('500')) {
      message = 'Server error: Unable to send OTP. Try again later.';
    }
    $q.notify({ type: 'negative', message });
  } finally {
    creatingAccount.value = false;
  }
}

async function verifyOtp() {
  if (!otp.value || otp.value.length !== 6) {
    $q.notify({ type: 'negative', message: 'Please enter a valid 6-digit OTP.' });
    return;
  }
  verifying.value = true;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value.trim(), otp: otp.value }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      $q.notify({ type: 'positive', message: 'Account created successfully! Redirecting to login...' });
      router.push('/login');
    } else {
      $q.notify({ type: 'negative', message: data.message || 'OTP verification failed.' });
    }
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    let message = 'An error occurred while verifying OTP. Please try again later.';
    if (error.message.includes('NetworkError')) {
      message = 'Network error: Please check your internet connection.';
    } else if (error.message.includes('404')) {
      message = 'API endpoint not found. Please contact support.';
    } else if (error.message.includes('500')) {
      message = 'Server error: Unable to verify OTP. Try again later.';
    }
    $q.notify({ type: 'negative', message });
  } finally {
    verifying.value = false;
  }
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
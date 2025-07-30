<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card class="q-pa-xl q-mx-sm" style="width: 100%; max-width: 450px; border-radius: 16px;">
      <!-- Back to Home -->
      <div class="q-mb-lg row items-center text-grey-6 cursor-pointer" @click="goHome" style="font-size: 14px;">
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

      <!-- Signup Form -->
      <q-form @submit.prevent="createAccount" class="q-gutter-md">
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-input filled dense label="First name" v-model="firstName" class="bg-grey-2" borderless
              :rules="[val => !!val || 'First name is required']" />
          </div>
          <div class="col">
            <q-input filled dense label="Last name" v-model="lastName" class="bg-grey-2" borderless
              :rules="[val => !!val || 'Last name is required']" />
          </div>
        </div>

        <q-input filled dense label="Email address" v-model="email" type="email" class="bg-grey-2" borderless
          :rules="[val => /.+@.+\..+/.test(val) || 'Valid email is required']" />

        <q-input filled dense label="Create password" v-model="password" type="password" class="bg-grey-2" borderless
          :rules="[val => val.length >= 8 || 'Password must be at least 8 characters']" />

        <q-input filled dense label="Confirm password" v-model="confirmPassword" type="password" class="bg-grey-2"
          borderless :rules="[val => val === password || 'Passwords do not match']" />

        <q-checkbox v-model="agree" label="I agree to the Terms and Conditions & Privacy Policy"
          :rules="[val => val === true || 'You must agree to the terms']" />
        <q-checkbox v-model="subscribe" label="Subscribe to our newsletter for job updates" />

        <q-btn label="Create Account" type="submit" unelevated rounded class="full-width bg-custom-blue" size="lg"
          :loading="creatingAccount" />

        <!-- Social Buttons (optional) -->
        <div class="row items-center q-my-md no-wrap">
          <q-separator class="col" />
          <div class="q-px-sm text-grey-6 text-caption">or continue with</div>
          <q-separator class="col" />
        </div>

        <q-btn outline class="full-width q-mb-sm" color="grey-8" no-caps size="md">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
            style="width: 20px; margin-right: 8px;" />
          Continue with Google
        </q-btn>

        <q-btn outline class="full-width" color="grey-9" no-caps size="md">
          <img src="https://www.svgrepo.com/show/452234/linkedin.svg" alt="LinkedIn"
            style="width: 20px; margin-right: 8px;" />
          Continue with LinkedIn
        </q-btn>
      </q-form>

      <!-- Sign In Link -->
      <div class="q-mt-lg text-center text-grey-8">
        Already have an account?
        <span class="custom-blue cursor-pointer text-weight-medium" @click="$router.push('/login')">
          Sign In
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
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
const creatingAccount = ref(false);

function goHome() {
  router.push('/');
}

function createAccount() {
  if (!agree.value) {
    $q.notify({ type: 'negative', message: 'You must agree to the terms to proceed.' });
    return;
  }

  if (password.value !== confirmPassword.value) {
    $q.notify({ type: 'negative', message: 'Passwords do not match.' });
    return;
  }

  creatingAccount.value = true;

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find(u => u.email.toLowerCase() === email.value.trim().toLowerCase());
    if (existingUser) {
      $q.notify({ type: 'negative', message: 'Email already registered.' });
      creatingAccount.value = false;
      return;
    }

    const newUser = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      subscribed: subscribe.value,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const loggedInUser = {
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
    };

    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    $q.notify({ type: 'positive', message: 'Account created successfully!' });
    router.push('/');
    creatingAccount.value = false;
  }, 800); // simulate delay
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
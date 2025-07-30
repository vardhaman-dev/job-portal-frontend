<template>
  <q-page class="flex flex-center q-pa-md bg-grey-1 dark:bg-dark">
    <q-card
      class="q-pa-xl q-mx-sm shadow-10"
      style="width: 100%; max-width: 450px; border-radius: 16px;"
    >
      <!-- Back -->
      <div
        class="q-mb-lg row items-center text-grey-6 dark:text-grey-4 cursor-pointer"
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
        <div class="text-h5 text-weight-bold text-dark dark:text-white">Welcome Back</div>
        <div class="text-subtitle2 text-grey-6 dark:text-grey-5">Sign in to your JobHub account</div>
      </div>

      <!-- Form -->
      <q-form @submit="handleLogin" class="q-gutter-md">
        <q-input
          filled
          dense
          label="Email address"
          v-model="email"
          type="email"
          class="bg-grey-2 dark:bg-grey-9"
          borderless
        />

        <q-input
          filled
          dense
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="bg-grey-2 dark:bg-grey-9"
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

        <!-- Submit Button -->
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

        <!-- Social Login -->
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
      <div class="q-mt-lg text-center text-grey-8 dark:text-grey-5">
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
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const router = useRouter()

const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const matchedUser = users.find(
    u => u.email === email.value.trim() && u.password === password.value
  );

  if (matchedUser) {
    const user = {
      name: `${matchedUser.firstName} ${matchedUser.lastName}`,
      email: matchedUser.email
    };
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    router.push('/');
  } else {
    console.warn('Invalid credentials');
    alert('Invalid email or password');
  }
};

</script>

<style scoped>
.custom-blue {
  color: #1565c0 !important;
}
.bg-custom-blue {
  background-color: #1565c0 !important;
  color: white !important;
}
.q-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.q-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
</style>

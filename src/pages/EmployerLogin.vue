<template>
  <div class="login-bg flex flex-center">
    <q-card class="login-card q-pa-md">
      <!-- Back to Employers -->
      <div class="row items-center q-mb-sm no-gap">
        <q-btn
          flat
          icon="arrow_back"
          label="Back to Employers"
          @click="goToEmployers"
          class="text-grey-7"
          size="sm"
          dense
        />
      </div>

      <!-- Center Icon and Title -->
      <div class="text-center q-mb-md">
        <q-avatar size="64px" class="q-mb-sm" color="blue-4" text-color="white">
          <q-icon name="business" size="38px" />
        </q-avatar>
        <div class="text-h5 text-weight-bold text-primary">Employer Login</div>
        <div class="text-caption text-grey-7">
          Access your employer dashboard to post jobs
        </div>
      </div>

      <!-- Form Section -->
      <q-form @submit.prevent="loginEmployer" class="q-gutter-sm">
        <div>
          <label class="field-label">Company Name</label>
          <q-input
            v-model="employer.name"
            outlined
            dense
            placeholder="Enter your company name"
            :rules="[val => !!val || 'Company name is required']"
          />
        </div>

        <div>
          <label class="field-label">Business Email</label>
          <q-input
            v-model="employer.email"
            outlined
            dense
            type="email"
            placeholder="company@example.com"
            :rules="[
              val => !!val || 'Email is required',
              val => /.+@.+\..+/.test(val) || 'Enter a valid email'
            ]"
          />
        </div>

        <div>
          <label class="field-label">Contact Number</label>
          <q-input
            v-model="employer.phone"
            outlined
            dense
            type="tel"
            placeholder="9999999999"
            :rules="[
              val => !!val || 'Phone number is required',
              val => /^\d{10}$/.test(val) || 'Enter a valid 10-digit number'
            ]"
          />
        </div>

        <div>
          <label class="field-label">Password</label>
          <q-input
            v-model="employer.password"
            outlined
            dense
            type="password"
            placeholder="Enter your password"
            :rules="[val => !!val || 'Password is required']"
          />
        </div>

        <div class="row justify-center q-mt-sm">
          <q-btn
            label="Sign In"
            type="submit"
            color="blue-8"
            class="q-mt-sm"
            unelevated
            size="md"
            dense
            style="min-width: 120px; width: 80%;"
          />
        </div>
      </q-form>

      <!-- Back to Home -->
      <div class="text-center q-mt-md">
        <q-btn
          flat
          label="Back to Home"
          class="text-grey-7"
          @click="goToHome"
          size="sm"
          dense
        />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'EmployerLogin',
  data() {
    return {
      employer: {
        name: '',
        email: '',
        phone: '',
        password: ''
      }
    };
  },
  methods: {
    loginEmployer() {
      const employerData = {
        name: this.employer.name,
        email: this.employer.email
      };
      localStorage.setItem('employerData', JSON.stringify(employerData));
      this.$router.push('/employer-portal');
    },
    goToEmployers() {
      this.$router.push('/employers');
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  padding: 16px;
  background: linear-gradient(120deg, #eaf3ff 0%, #d2e6fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(45, 108, 255, 0.10);
  background: #fff;
  padding: 24px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  display: inline-block;
  color: #333;
}

.text-primary {
  color: #2d6cff;
}

.no-gap {
  margin: 0;
  padding: 0;
}
</style>

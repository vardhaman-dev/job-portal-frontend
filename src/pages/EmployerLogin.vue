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
        <div class="text-h5 text-weight-bold text-primary">Company Registration</div>
        <div class="text-caption text-grey-7">
          Create your company account to start posting jobs
        </div>
      </div>

      <!-- Error Message -->
      <q-banner v-if="error" class="bg-red-1 text-red q-mb-md" rounded>
        {{ error }}
        <template v-slot:action>
          <q-btn flat color="red" icon="close" @click="error = ''" />
        </template>
      </q-banner>

      <!-- Form Section -->
      <q-form @submit.prevent="registerCompany" class="q-gutter-sm">
        <!-- Company Information -->
        <div class="text-subtitle2 text-grey-8 q-mb-sm">Company Information</div>

        <div>
          <label class="field-label">Company Name *</label>
          <q-input
            v-model="formData.companyName"
            outlined
            dense
            lazy-rules
            placeholder="Enter your company name"
            :rules="[
              val => !!val || 'Company name is required',
              val => (val && val.length >= 2 && val.length <= 255) || 'Company name must be between 2 and 255 characters'
            ]"
            :disable="loading"
          />
        </div>

        <div>
          <label class="field-label">Business Email *</label>
          <q-input
            v-model="formData.email"
            outlined
            dense
            type="email"
            placeholder="company@example.com"
            :rules="[
              val => !!val || 'Email is required',
              val => /.+@.+\..+/.test(val) || 'Enter a valid email'
            ]"
            :disable="loading"
          />
        </div>

        <div>
          <label class="field-label">Contact Number *</label>
          <q-input
            v-model="formData.contactNumber"
            outlined
            dense
            type="tel"
            lazy-rules
            placeholder="(123) 456-7890"
            mask="(###) ### - ####"
            :rules="[
              val => !!val || 'Contact number is required',
              val => (val && /^[\d\s\-+()]+$/.test(val)) || 'Please provide a valid phone number',
              val => (val && val.replace(/\D/g, '').length >= 5) || 'Phone number too short',
              val => (val && val.replace(/\D/g, '').length <= 20) || 'Phone number too long'
            ]"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>

        <div>
          <label class="field-label">Create Password *</label>
          <q-input
            v-model="formData.password"
            outlined
            dense
            lazy-rules
            :type="showPassword ? 'text' : 'password'"
            placeholder="Create a strong password"
            :rules="[
              val => !!val || 'Password is required',
              val => (val && val.length >= 8) || 'Password must be at least 8 characters',
              val => (val && /[A-Z]/.test(val)) || 'Must contain at least one uppercase letter',
              val => (val && /[a-z]/.test(val)) || 'Must contain at least one lowercase letter',
              val => (val && /[0-9]/.test(val)) || 'Must contain at least one number'
            ]"
            :disable="loading"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>

        <div>
          <label class="field-label">Website</label>
          <q-input
            v-model="formData.website"
            outlined
            dense
            placeholder="https://yourcompany.com"
            :disable="loading"
          />
        </div>

        <div>
          <label class="field-label">Industry</label>
          <q-input
            v-model="formData.industry"
            outlined
            dense
            placeholder="e.g., Technology, Healthcare, Finance"
            :disable="loading"
          />
        </div>

        <div>
          <label class="field-label">Location</label>
          <q-input
            v-model="formData.location"
            outlined
            dense
            placeholder="e.g., New York, USA"
            :disable="loading"
          />
        </div>

        <div>
          <label class="field-label">Company Description</label>
          <q-input
            v-model="formData.description"
            outlined
            dense
            type="textarea"
            placeholder="Tell us about your company"
            :disable="loading"
            rows="3"
          />
        </div>

        <div class="row justify-center q-mt-lg">
          <q-btn
            label="Create Account"
            type="submit"
            color="primary"
            class="q-mt-sm full-width"
            unelevated
            size="md"
            :loading="loading"
            :disable="loading"
          >
            <template v-slot:loading>
              <q-spinner-oval class="on-left" />
              Creating Account...
            </template>
          </q-btn>
        </div>

        <div class="text-center q-mt-md">
          <span class="text-grey-7">Already have an account? </span>
          <router-link to="/employer-login" class="text-primary text-weight-medium">Sign In</router-link>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { companyAuth } from '../services/auth.service';

export default {
  name: 'EmployerSignup',
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref('');
    const showPassword = ref(false);

    const formData = ref({
      companyName: '',
      email: '',
      contactNumber: '',
      password: ''
    });

    const registerCompany = async () => {
      try {
        loading.value = true;
        error.value = '';

        // Prepare the registration data exactly as backend expects
        const registrationData = {
          companyName: formData.value.companyName.trim(),
          email: formData.value.email.trim().toLowerCase(),
          password: formData.value.password,
          contactNumber: formData.value.contactNumber // Keep the formatted number as it includes valid characters
        };

        console.log('Registration data being sent:', registrationData);

        console.log('Sending registration data:', registrationData);

        const response = await companyAuth.register(registrationData);

        if (response.success) {
          // Store employer data in local storage
          const employerData = {
            id:formData.value.id, // Use company name as ID for simplicity
            name: formData.value.companyName,
            email: formData.value.email,
            // Add any other employer data you want to store
          };
          localStorage.setItem('employerData', JSON.stringify(employerData));

          // Redirect to employer portal dashboard
          router.push('/employer-portal');
        } else {
          // Handle error response from auth service
          error.value = response.error || 'Registration failed. Please check your information and try again.';

          // Log detailed error information for debugging
          if (response.response) {
            console.error('Registration error details:', response.response);
          }
        }
      } catch (err) {
        console.error('Registration error:', err);
        error.value = 'An error occurred during registration. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    const goToEmployers = () => {
      router.push('/employers');
    };

    const goToHome = () => {
      router.push('/');
    };

    return {
      formData,
      loading,
      error,
      showPassword,
      registerCompany,
      goToEmployers,
      goToHome
    };
  }
};
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  padding: 24px 16px;
  background: linear-gradient(120deg, #eaf3ff 0%, #d2e6fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(45, 108, 255, 0.10);
  background: #fff;
  padding: 32px;
  margin: 16px 0;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  display: inline-block;
  color: #333;
}

.field-label:after {
  content: ' *';
  color: #f44336;
  display: none;
}

.field-label.required:after {
  display: inline;
}

.text-primary {
  color: #2d6cff;
}

.no-gap {
  margin: 0;
  padding: 0;
}

.q-field--outlined .q-field__control:before {
  border: 1px solid #e0e0e0;
}

.q-field--outlined.q-field--highlighted .q-field__control:before {
  border: 2px solid #2d6cff;
}

.q-field--outlined.q-field--highlighted .q-field__control:after {
  border: none;
}

.q-field--outlined.q-field--error .q-field__control:before {
  border: 2px solid #f44336;
}

.q-field--outlined.q-field--error .q-field__control:after {
  border: none;
}
</style>

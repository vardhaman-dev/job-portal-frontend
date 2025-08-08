<template>
  <div class="registration-pending flex flex-center" style="min-height: 100vh; background-color: #f5f5f5;">
    <q-card class="q-pa-xl text-center" style="width: 100%; max-width: 500px;">
      <q-icon 
        name="pending_actions" 
        color="primary" 
        size="4rem" 
        class="q-mb-md"
      />
      
      <h2 class="text-h4 text-weight-bold q-mb-sm">Registration Under Review</h2>
      
      <p class="text-body1 q-mb-lg">
        Thank you for registering your company! Your account is currently under review by our admin team.
        You'll receive an email notification once your account has been approved.
      </p>
      
      <div class="q-mt-lg">
        <q-btn
          color="primary"
          label="Back to Home"
          @click="goToHome"
          no-caps
          class="q-px-lg"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'RegistrationPending',
  
  setup() {
    const router = useRouter();
    
    const goToHome = () => {
      router.push('/');
    };
    
    return {
      goToHome
    };
  }
};
</script>

<style scoped>
.registration-pending {
  padding: 20px;
}
</style>

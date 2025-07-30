<template>
  <q-card class="q-pa-lg q-mt-md bg-grey-1 apply-card shadow-2">
    <div class="text-h6 text-weight-bold text-primary q-mb-xs">Ready to Apply?</div>
    <p class="text-body1 text-grey-9 q-mb-md">
      Sign in to apply with your saved profile or upload a new resume.
    </p>

    <q-btn 
      label="Sign In to Apply" 
      class="full-width q-my-sm apply-btn"
      unelevated
      no-caps
    />

    <div class="text-caption text-grey-7 q-mt-sm">
      Don’t have an account? Signing in will create one.<br />
      By applying, you agree to our 
      <span class="text-primary cursor-pointer">Terms</span> & 
      <span class="text-primary cursor-pointer">Privacy</span>.
    </div>
  </q-card>
</template>


<style scoped>
.apply-card {
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.apply-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.apply-btn {
  background-color: #1565c0;
  color: white;
  transition: background-color 0.3s ease;
}

.apply-btn:hover {
  background-color: #0d47a1;
}
</style>


<template>
  <div class="dashboard-header row items-center justify-between q-pa-lg">
    <div>
      <h5 class="welcome-text handwritten">Welcome back, {{ userName }}!</h5>
      <p class="subtext">Ready to find your next opportunity? Let’s explore what’s available for you.</p>
    </div>
    <div class="action-buttons">
      <q-btn
        icon="person"
        label="Complete Profile"
        unelevated
        class="q-px-md primary-btn"
        @click="$emit('open-profile')"
      />
      <q-btn
        icon="upload_file"
        label="Build your Resume"
        class="q-px-md primary-btn"
        @click="$emit('go-resume')"
      />
    </div>
  </div>
</template>

<script setup>
defineProps(['userName']);
defineEmits(['open-profile', 'go-resume']);
</script>

<style scoped>
.dashboard-header {
  background: white; /* Changed from gradient to plain white */
  border-radius: 12px; /* Optional: slightly reduced rounding */
  box-shadow: none; /* Removed glassy shadow */
  border: 1px solid #e0e0e0; /* Light gray border for card-like look */
  padding: 30px;
  margin-bottom: 24px;
}

.handwritten {
  font-family: 'Satisfy', cursive;
  font-size: 40px;
  color: #2d6cff;
  display: inline-block;
  margin-top: 10px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.welcome-text {
  font-size: 2rem;
  color: #0d47a1;
  font-weight: 700;
  margin-bottom: 6px;
}

.subtext {
  color: #455a64;
  font-size: 15px;
  margin-top: 4px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.primary-btn {
  background-color: #1565c0;
  border-radius: 25px;
  color: white;
  padding: 8px 20px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.primary-text-btn {
  color: #1565c0;
}

.primary-btn:hover {
  background-color: #0d47a1;
}

</style>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <!-- Close button -->
      <button class="close-btn" @click="close">×</button>

      <!-- Icon -->
      <div class="icon-container">
        <div class="icon-circle">
          <span class="icon-warning">⚠</span>
        </div>
      </div>

      <!-- Title -->
      <h2 class="modal-title">Submit Your Test?</h2>
      <p class="modal-subtitle">
        Are you sure you want to submit your screening test?
      </p>

      <!-- Important Notice -->
      <div class="notice-box">
        <div class="notice-header">
          <span class="notice-icon">⚠</span>
          <span class="notice-title">Important Notice</span>
        </div>
        <p class="notice-text">
          Once submitted, you won't be able to change your answers or retake this test.
        </p>
      </div>

      <!-- Buttons -->
      <div class="modal-actions">
        <button class="cancel-btn" @click="close">Cancel</button>
        <button class="submit-btn" @click="submitTest">✈ Yes, Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'submit']);
const router = useRouter();

const close = () => {
  emit('close');
};

const submitTest = () => {
  emit('submit');
  router.push({ name: 'TestUnderReview' });
};
</script>

<style scoped>
/* (same styles as your original code) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: #fff;
  border-radius: 8px;
  width: 420px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  font-family: Arial, sans-serif;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.icon-circle {
  background: #fff4e5;
  border-radius: 50%;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-warning {
  color: #f59e0b;
  font-size: 26px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 6px;
}

.modal-subtitle {
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 16px;
}

.notice-box {
  background: #fff8f2;
  border: 1px solid #fdd9c2;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 20px;
}

.notice-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.notice-icon {
  color: #f59e0b;
  font-size: 16px;
  margin-right: 6px;
}

.notice-title {
  font-weight: bold;
  font-size: 14px;
}

.notice-text {
  font-size: 13px;
  color: #7a6f6f;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  background: none;
  border: none;
  color: #333;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.submit-btn:hover {
  background: #1e4fbb;
}
</style>
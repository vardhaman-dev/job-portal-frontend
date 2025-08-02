<template>
  <div class="dashboard-header row items-center justify-between q-pa-lg">
    <div class="row items-center">
      <!-- Empty Avatar Placeholder -->
      <q-avatar size="100px" class="q-mr-md bg-grey-3 text-grey-6">
        <!-- optional: add icon -->
        <q-icon name="person" size="32px" />
      </q-avatar>

      <div>
        <h5 class="welcome-text handwritten">
          {{ welcomeMessage }}
        </h5>
        <p class="subtext">
          Ready to find your next opportunity? Let’s explore what’s available for you.
        </p>
      </div>
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
import { ref, onMounted } from 'vue';

const welcomeMessage = ref('Welcome!');

onMounted(() => {
  let userName = 'User';
  const loginType = localStorage.getItem('loginType');

  const userData = localStorage.getItem('loggedInUser');
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      userName = parsedUser.name || 'User';
    } catch (e) {
      console.error('Error parsing loggedInUser', e);
    }
  }

  if (loginType === 'signup') {
    welcomeMessage.value = `Welcome ${userName}!`;
  } else if (loginType === 'login') {
    welcomeMessage.value = `Welcome back, ${userName}!`;
  } else {
    welcomeMessage.value = `Welcome ${userName}!`;
  }
});
</script>

<style scoped>
.dashboard-header {
  background: white;
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
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

.profile-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #1565c0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

</style>

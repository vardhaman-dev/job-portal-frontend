<template>
  <header class="navbar">
    <div class="logo">💼 JobHub</div>
    <nav class="nav-links">
      <router-link to="/" exact-active-class="active-link">Home</router-link>
      <JobsDropDown />
      <router-link to="/employers" exact-active-class="active-link">Employers</router-link>
    </nav>

    <div class="auth-buttons">
      <template v-if="!user && !isEmployerPage">
        <router-link to="/login" class="sign-in">Sign In</router-link>
        <router-link to="/create-account" class="sign-up">Sign Up</router-link>
      </template>

      <template v-if="user">
        <div class="user-dropdown" @click="toggleDropdown">
          <div class="user-profile">
            <q-icon name="account_circle" class="q-mr-sm" size="2rem" />
            {{ user.name || user.email }}
            <q-icon name="arrow_drop_down" size="1.5rem" />
          </div>

          <div v-if="showDropdown" class="dropdown-menu">
            <div v-if="user.role === 'job_seeker'" class="dropdown-item" @click="$router.push('/dashboard')">
              Job Seeker Dashboard
            </div>
            <div v-if="user.role === 'company'" class="dropdown-item" @click="$router.push('/employer-portal')">
              Employer Dashboard
            </div>
            <q-separator class="q-my-xs" />
            <div class="dropdown-item logout-item" @click="logout">Logout</div>
          </div>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from 'src/stores/auth.store';
import JobsDropDown from './JobsDropDown.vue';

export default {
  name: 'AppNavbar',
  components: { JobsDropDown },
  data() {
    return {
      showDropdown: false,
      initialized: false,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  async mounted() {
    await this.authStore.checkAuth();
    this.initialized = true;
    console.log('AppNavbar mounted, user:', this.user);
  },
  computed: {
    user() {
      return this.authStore.userData;
    },
    isEmployerPage() {
      const employerPaths = [
        '/employer-portal',
        '/posted-jobs',
        '/post-job',
        '/candidates',
        '/employer-messages',
        '/company-profile',
        '/employer-settings',
      ];
      return employerPaths.includes(this.$route.path);
    },
  },
  watch: {
    $route: {
      handler() {
        this.authStore.checkAuth();
        console.log('Route changed, user:', this.user);
      },
      immediate: true,
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      this.authStore.logout();
      this.showDropdown = false;
      this.$router.push('/');
      console.log('Logout triggered, user:', this.user);
    },
  },
};
</script>

<style scoped>
/* Updated styles to adjust for larger icon */
.navbar { display: flex; justify-content: space-between; padding: 20px 60px; align-items: center; background-color: #fff; border-bottom: 1px solid #eaecef; }
.logo { font-weight: 700; color: #1565c0; font-size: 24px; }
.nav-links a { margin: 0 20px; color: #333; font-weight: 500; text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: #1565c0; }
.auth-buttons .sign-in { margin-right: 15px; font-weight: 600; color: #333; text-decoration: none; }
.auth-buttons .sign-in:hover { color: #1565c0; }
.auth-buttons .sign-up { background-color: #1565c0; color: white; padding: 8px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; transition: background 0.3s; }
.auth-buttons .sign-up:hover { background-color: #1c4fcf; }
.nav-links .active-link { position: relative; color: #1565c0; font-weight: 700; transition: color 0.3s ease; }
.nav-links .active-link::after { content: ''; position: absolute; bottom: -6px; left: 0; width: 100%; height: 2px; background-color: #1565c0; animation: slideIn 0.3s ease-out forwards; }
@keyframes slideIn { 0% { width: 0; opacity: 0; } 100% { width: 100%; opacity: 1; } }

.user-profile {
  cursor: pointer;
  font-weight: 600;
  color: #1565c0;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  gap: 8px; /* Added to improve spacing with larger icon */
}
.user-profile:hover {
  color: #1c4fcf;
}

.user-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #eaecef;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  overflow: hidden;
  z-index: 10;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  padding: 12px 18px;
  cursor: pointer;
  font-size: 15px;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
  color: #1565c0;
}

.logout-item {
  color: #d32f2f !important;
}

.logout-item:hover {
  background-color: #fdecea;
  color: #b71c1c !important;
}
</style>
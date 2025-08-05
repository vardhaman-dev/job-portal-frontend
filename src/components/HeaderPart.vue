<template>
  <header class="navbar">
    <div class="logo">
      <div class="logo-icon">💼</div>
      <span class="logo-text">JobHub</span>
    </div>
    <nav class="nav-links">
      <router-link to="/" exact-active-class="active-link">Home</router-link>
      <JobsDropDown />
      <router-link to="/employers" exact-active-class="active-link">Employers</router-link>
    </nav>

    <div class="auth-buttons">
      <!-- UPDATED: This template block now checks if it's an employer page -->
      <template v-if="!user && !isEmployerPage">
        <router-link to="/login" class="sign-in">Sign In</router-link>
        <router-link to="/create-account" class="sign-up">Sign Up</router-link>
      </template>
      
      <!-- This logic now handles both user types -->
      <template v-if="user">
        <div class="user-dropdown" @click="toggleDropdown">
          <div class="user-profile">
            <q-icon name="account_circle" class="q-mr-sm" />
            {{ user.name }}
            <q-icon name="arrow_drop_down" />
          </div>

          <div v-if="showDropdown" class="dropdown-menu">
            <div v-if="user.type === 'seeker'" class="dropdown-item" @click="$router.push('/dashboard')">
              Job Seeker Dashboard
            </div>
            <div v-if="user.type === 'employer'" class="dropdown-item" @click="$router.push('/employer-portal')">
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
import JobsDropDown from './JobsDropDown.vue';

export default {
  components: { JobsDropDown },
  data() {
    return {
      user: null,
      showDropdown: false
    };
  },
  computed: {
    isEmployerPage() {
      const employerPaths = [
        '/employer-portal',
        '/posted-jobs',
        '/post-job',
        '/candidates',
        '/employer-messages',
        '/company-profile',
        '/employer-settings'
      ];
      return employerPaths.includes(this.$route.path);
    }
  },
  mounted() {
    this.fetchUser();
  },
  watch: {
    $route() {
      this.fetchUser(); // Refresh user state on any route change
    }
  },
  methods: {
    fetchUser() {
      const seekerData = localStorage.getItem('loggedInUser');
      const employerData = localStorage.getItem('employerData');

      if (seekerData) {
        this.user = { ...JSON.parse(seekerData), type: 'seeker' };
      } else if (employerData) {
        this.user = { ...JSON.parse(employerData), type: 'employer' };
      } else {
        this.user = null;
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      if (this.user && this.user.type === 'employer') {
        localStorage.removeItem('employerData');
      } else {
        localStorage.removeItem('loggedInUser');
      }
      
      this.user = null;
      this.showDropdown = false;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Modern Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-16);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-gray-200);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all var(--transition-base);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
  color: var(--color-primary-600);
  font-size: var(--font-size-xl);
  text-decoration: none;
}

.logo-icon {
  font-size: var(--font-size-2xl);
  filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.1));
}

.logo-text {
  letter-spacing: -0.025em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.nav-links a {
  color: var(--color-gray-600);
  font-weight: 500;
  font-size: var(--font-size-sm);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
  position: relative;
}

.nav-links a:hover {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.auth-buttons .sign-in {
  color: var(--color-gray-700);
  font-weight: 500;
  font-size: var(--font-size-sm);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
}

.auth-buttons .sign-in:hover {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
}

.auth-buttons .sign-up {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  color: white;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--border-radius-lg);
  font-weight: 500;
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.auth-buttons .sign-up:hover {
  background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-800));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.nav-links .active-link {
  color: var(--color-primary-600);
  font-weight: 600;
  background-color: var(--color-primary-50);
}

.nav-links .active-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background-color: var(--color-primary-600);
  border-radius: 50%;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateX(-50%) scale(0); }
  100% { opacity: 1; transform: translateX(-50%) scale(1); }
}

.user-profile {
  cursor: pointer;
  font-weight: 500;
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
}

.user-profile:hover {
  background-color: var(--color-primary-50);
}

.user-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  min-width: 180px;
  overflow: hidden;
  z-index: 10;
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dropdown-item {
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-base);
}

.dropdown-item:hover {
  background-color: var(--color-gray-50);
  color: var(--color-primary-600);
}

.logout-item {
  color: var(--color-error) !important;
}

.logout-item:hover {
  background-color: #fef2f2;
  color: #dc2626 !important;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .navbar {
    padding: var(--space-3) var(--space-4);
  }
  
  .nav-links {
    gap: var(--space-4);
  }
  
  .auth-buttons {
    gap: var(--space-2);
  }
  
  .auth-buttons .sign-up {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-xs);
  }
}
</style>
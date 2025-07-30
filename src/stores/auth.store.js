import { defineStore } from 'pinia';
import { jobSeekerAuth, authHelpers } from 'src/services/auth.service';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    returnUrl: null
  }),

  getters: {
    isJobSeeker: (state) => state.user?.userType === 'jobseeker',
    isEmployer: (state) => state.user?.userType === 'employer',
    userType: (state) => state.user?.userType,
    userData: (state) => state.user?.data || {}
  },

  actions: {
    // Initialize auth state from localStorage
    initialize() {
      if (authHelpers.isAuthenticated()) {
        this.user = {
          userType: 'jobseeker',
          data: authHelpers.getCurrentUser()
        };
        this.isAuthenticated = true;
      }
    },

    // Job Seeker Registration
    async register(userData) {
      this.loading = true;
      this.error = null;

      try {
        const result = await jobSeekerAuth.register(userData);

        if (result.success) {
          // Save auth data
          authHelpers.setAuthData(
            result.data.token,
            result.data.user
          );

          // Update store state
          this.user = {
            userType: 'jobseeker',
            data: result.data.user
          };
          this.isAuthenticated = true;

          return { success: true };
        } else {
          this.error = result.error;
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = 'An error occurred during registration. Please try again.';
        console.error('Registration error:', error);
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Job Seeker Login
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const result = await jobSeekerAuth.login(credentials);

        if (result.success) {
          // Save auth data
          authHelpers.setAuthData(
            result.data.token,
            result.data.user
          );

          // Update store state
          this.user = {
            userType: 'jobseeker',
            data: result.data.user
          };
          this.isAuthenticated = true;

          return { success: true };
        } else {
          this.error = result.error;
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = 'An error occurred during login. Please try again.';
        console.error('Login error:', error);
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Logout
    logout() {
      authHelpers.clearAuthData();
      this.user = null;
      this.isAuthenticated = false;

      // Redirect to home or login page
      const router = useRouter();
      router.push('/login');
    },

    // Check if user is authenticated
    checkAuth() {
      const isAuthenticated = authHelpers.isAuthenticated();
      if (isAuthenticated && !this.isAuthenticated) {
        this.initialize();
      }
      return isAuthenticated;
    },

    // Set return URL for redirect after login
    setReturnUrl(url) {
      this.returnUrl = url;
    },

    // Clear error
    clearError() {
      this.error = null;
    }
  }
});

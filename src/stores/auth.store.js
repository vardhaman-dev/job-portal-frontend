import { defineStore } from 'pinia';
import { auth, jobSeekerAuth, authHelpers } from 'src/services/auth.service';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: null, // 'job_seeker' or 'company'
    isAuthenticated: false,
    loading: false,
    error: null,
    returnUrl: null
  }),

  getters: {
    isJobSeeker: (state) => state.role === 'job_seeker',
    isEmployer: (state) => state.role === 'company',
    userType: (state) => state.role,
    userData: (state) => state.user || {}
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

    // Unified login for both job seekers and companies
    async login(credentials) {
  this.loading = true;
  this.error = null;

  try {
    const result = await auth.login(credentials);

    if (result.success) {
      const user = result.data.user;

      // Save auth data
      authHelpers.setAuthData(result.data.token, user);

      // Update store state
      this.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        companyProfile: result.data.company_profile || null
      };

      this.role = user.role;  // ✅ use from `user`, not `result`
      this.isAuthenticated = true;

      return {
        success: true,
        role: this.role
      };
    } else {
      this.error = result.error;
      return {
        success: false,
        error: result.error
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred during login. Please try again.';
    this.error = errorMessage;
    console.error('Login error:', error);
    return {
      success: false,
      error: errorMessage
    };
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

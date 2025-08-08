import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/admin/login', credentials);
        this.admin = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('adminToken', response.data.token);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.admin = null;
      this.isAuthenticated = false;
      localStorage.removeItem('adminToken');
    },

    async checkAuth() {
      const token = localStorage.getItem('adminToken');
      if (!token) return false;

      try {
        const response = await api.get('/admin/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.admin = response.data;
        this.isAuthenticated = true;
        return true;
      } catch {
        this.logout();
        return false;
      }
    },

    // Add other admin-related actions here
  },

  getters: {
    isAdmin: (state) => state.isAuthenticated && state.admin,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
});

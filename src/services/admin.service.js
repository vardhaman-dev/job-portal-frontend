import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Remove any existing Bearer prefix and trim whitespace
      const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

      // Only add Bearer if it's not already present in the token
      const authHeader = cleanToken.startsWith('Bearer ')
        ? cleanToken
        : `Bearer ${cleanToken}`;

      config.headers.Authorization = authHeader;

      // Debug logging
      console.log('Adding Authorization header:', {
        hasToken: !!token,
        cleanTokenLength: cleanToken.length,
        authHeaderValue: authHeader.substring(0, 30) + '...'
      });
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

const adminService = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await api.post('/admin/login', {
        email: credentials.email,
        password: credentials.password
      });

      // Ensure the token has the Bearer prefix when storing
      if (response.data && response.data.token) {
        // Remove any existing Bearer prefix and add a new one
        const token = response.data.token.replace(/^Bearer\s+/i, '');
        response.data.token = `Bearer ${token}`;
      }

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Admin login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Admin login failed'
      };
    }
  },

  // Get admin dashboard data
  getDashboardStats: () => ({
    success: true,
    data: {
      totalUsers: 0,  // These will be populated when the backend implements them
      activeJobs: 0,
      totalCompanies: 0
    }
  }),

  // Check if admin is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },

  // Logout admin
  logout: () => {
    localStorage.removeItem('adminToken');
  }
};

export default adminService;

import api from './auth.service'; // reusing the same axios instance

const suggestService = {
  getSuggestions: async (userId) => {
    try {
      const response = await api.get(`/suggest/${userId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Suggestion API error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch job suggestions',
      };
    }
  }
};

export default suggestService;

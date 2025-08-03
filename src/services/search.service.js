import api from './auth.service';

const searchService = {
  searchJobs: async (query) => {
    try {
      const response = await api.get(`/jobs/search?q=${query}`);
      return {
        success: true,
        data: response.data, // assuming it's { success: true, jobs: [...] }
      };
    } catch (error) {
      console.error('Search API error:', error);
      return {
        success: false,
        data: { jobs: [] },
        error: error.response?.data?.message || 'Failed to search jobs',
      };
    }
  }
};

export default searchService;

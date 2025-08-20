import api from './auth.service'; 

export default {
  async getAllJobs(params = {}) {
    const response = await api.get('jobs/jobs', { params });
    return response.data;
  },

  async getJobById(id) {
    const response = await api.get(`jobs/jobs/${id}`);
    return response.data.job;
  },

  async searchJobs(query) {
    const response = await api.get(`jobs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
}

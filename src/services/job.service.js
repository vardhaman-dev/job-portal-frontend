import api from './auth.service'; 

export default {
  async getJobById(id) {
    const response = await api.get(`jobs/jobs/${id}`)
    return response.data.job
  }
}

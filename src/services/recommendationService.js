import axios from 'axios'

class RecommendationService {
  constructor() {
    this.baseURL = '/api/recommendations'
  }

  /**
   * Get personalized job recommendations for the authenticated user
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of recommendations to fetch
   * @param {number} params.page - Page number for pagination
   * @returns {Promise<Object>} API response with recommendations
   */
  async getJobRecommendations({ limit = 10, page = 1 } = {}) {
    try {
      const response = await axios.get(this.baseURL, {
        params: { limit, page }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching job recommendations:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get trending jobs (most applied to recently)
   * @param {number} limit - Number of trending jobs to fetch
   * @returns {Promise<Object>} API response with trending jobs
   */
  async getTrendingJobs(limit = 10) {
    try {
      const response = await axios.get(`${this.baseURL}/trending`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching trending jobs:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get jobs similar to a specific job
   * @param {number} jobId - ID of the job to find similar jobs for
   * @param {number} limit - Number of similar jobs to fetch
   * @returns {Promise<Object>} API response with similar jobs
   */
  async getSimilarJobs(jobId, limit = 5) {
    try {
      const response = await axios.get(`${this.baseURL}/similar/${jobId}`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching similar jobs:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Handle API errors consistently
   * @param {Error} error - The error object from axios
   * @returns {Object} Formatted error object
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      }
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        status: 0
      }
    } else {
      // Something else happened
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        status: 0
      }
    }
  }
}

export const recommendationService = new RecommendationService()
export default recommendationService

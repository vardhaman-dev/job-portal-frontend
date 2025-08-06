import api from './auth.service' // your configured axios instance

export const jobSeekerProfileService = {
  async getProfile(userId) {
    try {
      const res = await api.get(`/profile/${userId}`)
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Error fetching profile:', err)
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to fetch profile',
      }
    }
  },

  async updateProfile(userId, profileData) {
    try {
      const res = await api.put(`/profile/${userId}`, profileData)
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Error updating profile:', err)
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to update profile',
      }
    }
  }
}

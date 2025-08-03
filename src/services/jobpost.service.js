import api from './auth.service'; 

const postJob = async (jobData) => {
  try {
    const response = await api.post('/jobs/jobs', jobData);
    return {
      success: true,
      jobId: response.data.jobId,
    };
  } catch (error) {
    console.error('Job posting error:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Job submission failed',
    };
  }
};

export default {
  postJob
};

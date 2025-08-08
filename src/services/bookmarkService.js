import api from './auth.service';

export const bookmarkService = {
  getBookmarkedJobs(userId) {
    return api.get(`/bookmarks/${userId}`).then(res => res.data);
  },
  addBookmark(userId, jobId) {
    return api.post('/bookmarks', { user_id: userId, job_id: jobId });
  },
  removeBookmark(userId, jobId) {
    return api.delete('/bookmarks', {
      data: { user_id: userId, job_id: jobId }
    });
  },
  checkBookmark(userId, jobId) {
    return api.get(`/bookmarks/${userId}/${jobId}`).then(res => res.data);
  }
};

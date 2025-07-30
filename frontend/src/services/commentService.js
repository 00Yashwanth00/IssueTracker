import api from "./api";

export const getComments = async (issueId) => {
    try {
      const response = await api.get(`/issues/${issueId}/comments`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Failed to fetch comments';
    }
  };
  

export const addComment = async (issueId, text) => {
    try {
        const response = await api.post(`/issues/${issueId}/comments`, { text });
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to add comments.';
    }
};

export const updateComment = async (issueId, commentId, text) => {
    try {
        const response = await api.put(`/issues/${issueId}/comments/${commentId}`, { text });
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to update comment.';
    }
};

export const deleteComment = async (issueId, commentId) => {
    try {
        await api.delete(`/issues/${issueId}/comments/${commentId}`);
    } catch (err) {
        throw err.response?.data?.error || 'Failed to delete comment.';
    }
};
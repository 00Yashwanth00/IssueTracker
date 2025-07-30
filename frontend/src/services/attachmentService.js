import api from "./api";

export const getAttachments = async (issueId) => {
    try {
      const response = await api.get(`/issues/${issueId}/attachments`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Failed to fetch attachments';
    }
};

export const uploadAttachment = async (issueId, file) => {
    try {
        const formData = new FormData();
        formData.append('attachment', file);

        const response = await api.post(`/issues/${issueId}/attachments`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to upload file.';
    }
};

export const deleteAttachment = async (issueId, attachmentId) => {
    try {
        await api.delete(`/issues/${issueId}/attachments/${attachmentId}`);
    } catch (err) {
        throw err.response?.data?.error || 'Failed to delete file.';
    }
};

export const getAttachmentUrl = (filename) => {
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000' }/uploads/${filename}`;
};
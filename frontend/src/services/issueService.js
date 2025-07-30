import api from './api';

export const createIssue = async (issueData) => {
    try {
        const response = await api.post("/issues", issueData);
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to create issue.';
    }
};

export const getIssues = async (filters = {}) => {
    try {
        const reponse = await api.get("/issues", { params: filters });
        return reponse.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to fetch issues';
    }
};

export const getIssueById = async (id) => {
    try {
        const response = await api.get(`/issues/${id}`);
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to fetch issue.';
    }
};

export const updateIssue = async (id, updates) => {
    try {
        const response = await api.put(`/issues/${id}`, updates);
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to update issue.';
    }
};

export const deleteIssue = async (id) => {
    try {
        await api.delete(`/issues/${id}`);
    } catch (err) {
        throw err.response?.data?.error || 'Failed to delete issue.';
    }
};
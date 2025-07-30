import api from './api';

export const register = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Registration failed.';
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Login failed.';
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.post("/auth/me");
        return response.data;
    } catch (err) {
        throw err.response?.data?.error || 'Failed to fetch user.';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
};
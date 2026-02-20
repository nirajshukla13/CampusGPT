import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userName');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    register: (userData) => apiClient.post('/auth/register', userData),
    getProfile: () => apiClient.get('/auth/me'),
};

// Query APIs
export const queryAPI = {
    /**
     * Send a query to the backend
     * @param {string} question - The question to ask
     * @returns {Promise}
     */
    askQuestion: async (question, session_id) => {
        return apiClient.post("/query", {
            question,
            session_id: session_id
        });
    },
};

// Student APIs
export const studentAPI = {
    getDashboard: () => apiClient.get('/student/dashboard'),
    getHistory: () => apiClient.get('/student/history'),
    createSession: () => apiClient.post('/student/chat/session'),
};

// Faculty APIs
export const facultyAPI = {
    getDashboard: () => apiClient.get('/faculty/dashboard'),
    getInsights: () => apiClient.get('/faculty/insights'),
    uploadResource: (formData) => apiClient.post('/faculty/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
};

// Admin APIs
export const adminAPI = {
    getDashboard: () => apiClient.get('/admin/dashboard'),
    getUsers: () => apiClient.get('/admin/users'),
    createUser: (userData) => apiClient.post('/admin/users', userData),
    updateUser: (userId, userData) => apiClient.put(`/admin/users/${userId}`, userData),
    deleteUser: (userId) => apiClient.delete(`/admin/users/${userId}`),
};

export default apiClient;

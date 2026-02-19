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
   * @param {boolean} stream - Whether to stream the response
   * @returns {Promise} - Response or EventSource for streaming
   */
  askQuestion: async (question, stream = false) => {
    if (stream) {
      // Return EventSource for SSE
      const token = localStorage.getItem('token');
      const url = `${API_URL}/api/query`;
      
      return new Promise((resolve, reject) => {
        // Use fetch with streaming for SSE
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ question, stream: true }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            resolve(response.body.getReader());
          })
          .catch(reject);
      });
    } else {
      // Regular POST request
      return apiClient.post('/query', { question, stream: false });
    }
  },
};

// Student APIs
export const studentAPI = {
  getDashboard: () => apiClient.get('/student/dashboard'),
  getHistory: () => apiClient.get('/student/history'),
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

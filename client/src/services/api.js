import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  getAllDonors: () => api.get('/auth/donors'),
};

export const bloodRequestAPI = {
  getRequests: (params) => api.get('/blood-requests', { params }),
  getEmergencyRequests: () => api.get('/blood-requests/emergency'),
  createRequest: (requestData) => api.post('/blood-requests', requestData),
  getMyRequests: () => api.get('/blood-requests/my-requests'),
  respondToRequest: (requestId, status) => 
    api.post(`/blood-requests/${requestId}/respond`, { status }),
  manageDonorResponse: (requestId, donorId, action) =>
    api.post(`/blood-requests/${requestId}/donor/${donorId}/manage`, { action }),
  updateRequestStatus: (requestId, status) =>
    api.patch(`/blood-requests/${requestId}/status`, { status }),
};

export default api;
import api from '../../../services/axios';

export const authService = {
  register: (data) => api.post('/register', data),
  login: (credentials) => api.post('/login', credentials),
  me: () => api.get('/me'),
  refresh: () => api.post('/refresh'),
  logout: () => api.post('/logout'),
};

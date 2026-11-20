import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const isLoginRequest = error.config?.url?.includes('/v1/auth/login');

    if (error.response?.status === 401 && !isLoginRequest) {
      const isConfirm = window.confirm('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      if (isConfirm) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('current_id');

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;

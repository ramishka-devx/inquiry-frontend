// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },
    users: '/users',
    complaints: '/complains',
    categories: '/categories',
  },
};

// Axios request interceptor configuration
export const setupAxiosInterceptors = (axios: any) => {
  axios.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

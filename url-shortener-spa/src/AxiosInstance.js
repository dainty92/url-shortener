import axios from 'axios';

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: 'https://url-shortener-vuxr.onrender.com/api',
});

// Add an interceptor to include the token in requests
axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers['x-auth-token'] = authToken;
  }
  return config;
});

export default axiosInstance;

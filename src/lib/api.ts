import axios from 'axios';

// This is a placeholder for your actual API base URL.
// In a real application, you would get this from an environment variable.
const API_BASE_URL = 'https://api.tansanmediai.com/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here for handling auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Example: Get token from local storage and add to headers
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

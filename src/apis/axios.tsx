import axios from 'axios';
import { showError } from '../util/ErrorToastifyRender';
import { getAccessToken, updateAfterLogout } from '../util/authUtils';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error.response?.status);
    if (error.response?.status === 401) {
      showError('Unauthorized! Token may be invalid or expired.');
      if (window.location.pathname !== '/login') {
         window.location.href = '/tmdb-frontend/login';
      }
      updateAfterLogout();
    } else if (error.response?.status === 404) {
      window.location.href = '/tmdb-frontend/not-found';
    } else if (error.response?.status === 500) {
      window.location.href = '/tmdb-frontend/server-error';
    } else {
      showError(error.response?.data.errors);
    }
    return Promise.reject(error);
  },
);

export default instance;

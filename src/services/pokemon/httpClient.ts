import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from './constants';
import { handleError } from './errorHandler';

const createHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const logRequest = (method: string, url: string) => {
  if (!__DEV__) return;
  
  const upperMethod = method.toUpperCase();
  console.log(`[PokeAPI] Request: ${upperMethod} ${url}`);
};

const logResponse = (status: number, url: string) => {
  if (!__DEV__) return;
  
  console.log(`[PokeAPI] Response: ${status} ${url}`);
};

const logError = (error: unknown) => {
  if (!__DEV__) return;
  
  console.error('[PokeAPI] Error:', handleError(error));
};

const setupRequestInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    config => {
      const method = config.method || 'get';
      const url = config.url || '';
      logRequest(method, url);
      return config;
    },
    error => {
      logError(error);
      return Promise.reject(error);
    }
  );
};

const setupResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    response => {
      const status = response.status;
      const url = response.config.url || '';
      logResponse(status, url);
      return response;
    },
    error => {
      logError(error);
      return Promise.reject(error);
    }
  );
};

export const createHttpClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: createHeaders(),
  });
  
  setupRequestInterceptor(api);
  setupResponseInterceptor(api);
  
  return api;
};

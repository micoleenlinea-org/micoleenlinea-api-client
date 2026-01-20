// src/config/axios.ts
import axios from "axios";
var defaultStorageAdapter = {
  getItem: (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  }
};
var storageAdapter = defaultStorageAdapter;
var onUnauthorizedCallback = null;
var configureStorage = (adapter) => {
  storageAdapter = adapter;
};
var configureOnUnauthorized = (callback) => {
  onUnauthorizedCallback = callback;
};
var getBaseURL = () => {
  if (typeof window !== "undefined") {
    return import.meta.env?.VITE_API_URL || "http://localhost:8000/api";
  }
  return process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";
};
var apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 1e4
});
var configureApiBaseURL = (url) => {
  apiClient.defaults.baseURL = url;
};
var cachedToken = null;
var setAuthToken = async (token) => {
  cachedToken = token;
  await storageAdapter.setItem("authToken", token);
};
var getAuthToken = async () => {
  if (cachedToken) return cachedToken;
  const token = await storageAdapter.getItem("authToken");
  if (token) cachedToken = token;
  return token;
};
var clearAuthToken = async () => {
  cachedToken = null;
  await storageAdapter.removeItem("authToken");
};
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearAuthToken();
      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }
    const apiError = error.response?.data || { message: error.message || "Error de conexi\xF3n" };
    return Promise.reject(apiError);
  }
);

// src/config/mock.ts
var MOCK_MODE = false;
export {
  MOCK_MODE,
  apiClient,
  clearAuthToken,
  configureApiBaseURL,
  configureOnUnauthorized,
  configureStorage,
  getAuthToken,
  setAuthToken
};
//# sourceMappingURL=index.mjs.map
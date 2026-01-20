"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/config/index.ts
var config_exports = {};
__export(config_exports, {
  MOCK_MODE: () => MOCK_MODE,
  apiClient: () => apiClient,
  clearAuthToken: () => clearAuthToken,
  configureApiBaseURL: () => configureApiBaseURL,
  configureOnUnauthorized: () => configureOnUnauthorized,
  configureStorage: () => configureStorage,
  getAuthToken: () => getAuthToken,
  setAuthToken: () => setAuthToken
});
module.exports = __toCommonJS(config_exports);

// src/config/axios.ts
var import_axios = __toESM(require("axios"));
var import_meta = {};
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
    return import_meta.env?.VITE_API_URL || "http://localhost:8000/api";
  }
  return process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";
};
var apiClient = import_axios.default.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MOCK_MODE,
  apiClient,
  clearAuthToken,
  configureApiBaseURL,
  configureOnUnauthorized,
  configureStorage,
  getAuthToken,
  setAuthToken
});
//# sourceMappingURL=index.js.map
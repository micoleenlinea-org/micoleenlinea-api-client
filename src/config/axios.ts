import axios, { InternalAxiosRequestConfig } from 'axios';

/**
 * StorageAdapter: Interfaz que abstrae el almacenamiento de tokens.
 * - Web usa localStorage (síncrono)
 * - Mobile usa AsyncStorage (asíncrono)
 */
export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
  removeItem: (key: string) => Promise<void> | void;
}

/**
 * Adapter por defecto que usa localStorage (solo funciona en web)
 */
const defaultStorageAdapter: StorageAdapter = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
};

// Storage adapter configurable (se puede cambiar en runtime)
let storageAdapter: StorageAdapter = defaultStorageAdapter;

// Callback opcional para manejar logout (401)
let onUnauthorizedCallback: (() => void) | null = null;

/**
 * Configura el adaptador de almacenamiento.
 * - Web: no necesita llamar esto (usa localStorage por defecto)
 * - Mobile: debe llamar esto con AsyncStorage
 *
 * @example
 * // En mobile (App.tsx o similar):
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * import { configureStorage } from '@micoleenlinea/api-client';
 *
 * configureStorage({
 *   getItem: (key) => AsyncStorage.getItem(key),
 *   setItem: (key, value) => AsyncStorage.setItem(key, value),
 *   removeItem: (key) => AsyncStorage.removeItem(key),
 * });
 */
export const configureStorage = (adapter: StorageAdapter) => {
  storageAdapter = adapter;
};

/**
 * Configura un callback que se ejecuta cuando se recibe un 401 (token inválido/expirado)
 * Útil para redirigir al login o limpiar estado de la app.
 *
 * @example
 * configureOnUnauthorized(() => {
 *   navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
 * });
 */
export const configureOnUnauthorized = (callback: () => void) => {
  onUnauthorizedCallback = callback;
};

// Función para obtener la URL base dependiendo del entorno
const getBaseURL = () => {
  // Para web (Vite) - usar import.meta.env
  if (typeof window !== 'undefined') {
    // @ts-ignore - import.meta.env solo está disponible en tiempo de build de Vite
    return import.meta.env?.VITE_API_URL || 'http://localhost:8000/api';
  }
  // Para mobile (Expo) o Node
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

// Función para configurar la base URL desde la app
export const configureApiBaseURL = (url: string) => {
  apiClient.defaults.baseURL = url;
};

// Token en memoria para acceso rápido (se sincroniza con storage)
let cachedToken: string | null = null;

/**
 * Guarda el token de autenticación tanto en memoria como en storage.
 * Usar esta función después del login.
 */
export const setAuthToken = async (token: string): Promise<void> => {
  cachedToken = token;
  await storageAdapter.setItem('authToken', token);
};

/**
 * Obtiene el token de autenticación.
 * Primero intenta desde memoria (rápido), luego desde storage.
 */
export const getAuthToken = async (): Promise<string | null> => {
  if (cachedToken) return cachedToken;
  const token = await storageAdapter.getItem('authToken');
  if (token) cachedToken = token;
  return token;
};

/**
 * Elimina el token de autenticación.
 * Usar esta función durante el logout.
 */
export const clearAuthToken = async (): Promise<void> => {
  cachedToken = null;
  await storageAdapter.removeItem('authToken');
};

// Interceptor para agregar el token de autenticación automáticamente
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Obtener token (primero de cache, luego de storage)
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

// Interceptor para manejar respuestas de error (ej: token expirado)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si el token es inválido o expirado (401), limpiar token y notificar
    if (error.response?.status === 401) {
      await clearAuthToken();
      // Ejecutar callback de logout si está configurado
      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }
    // Transformar el error para que coincida con ApiError
    // Extraemos response.data para que los hooks reciban el tipo correcto
    const apiError = error.response?.data || { message: error.message || 'Error de conexión' };
    return Promise.reject(apiError);
  }
);

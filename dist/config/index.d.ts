import * as axios from 'axios';

/**
 * StorageAdapter: Interfaz que abstrae el almacenamiento de tokens.
 * - Web usa localStorage (síncrono)
 * - Mobile usa AsyncStorage (asíncrono)
 */
interface StorageAdapter {
    getItem: (key: string) => Promise<string | null> | string | null;
    setItem: (key: string, value: string) => Promise<void> | void;
    removeItem: (key: string) => Promise<void> | void;
}
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
declare const configureStorage: (adapter: StorageAdapter) => void;
/**
 * Configura un callback que se ejecuta cuando se recibe un 401 (token inválido/expirado)
 * Útil para redirigir al login o limpiar estado de la app.
 *
 * @example
 * configureOnUnauthorized(() => {
 *   navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
 * });
 */
declare const configureOnUnauthorized: (callback: () => void) => void;
declare const apiClient: axios.AxiosInstance;
declare const configureApiBaseURL: (url: string) => void;
/**
 * Guarda el token de autenticación tanto en memoria como en storage.
 * Usar esta función después del login.
 */
declare const setAuthToken: (token: string) => Promise<void>;
/**
 * Obtiene el token de autenticación.
 * Primero intenta desde memoria (rápido), luego desde storage.
 */
declare const getAuthToken: () => Promise<string | null>;
/**
 * Elimina el token de autenticación.
 * Usar esta función durante el logout.
 */
declare const clearAuthToken: () => Promise<void>;

/**
 * Configuración centralizada para el modo mock
 *
 * MOCK_MODE = false: usa el API real (QA, producción)
 * MOCK_MODE = true: usa datos simulados (solo para desarrollo local si es necesario)
 */
declare const MOCK_MODE = false;

export { MOCK_MODE, type StorageAdapter, apiClient, clearAuthToken, configureApiBaseURL, configureOnUnauthorized, configureStorage, getAuthToken, setAuthToken };

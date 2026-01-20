/**
 * @micoleenlinea/api-client
 *
 * Cliente API compartido para MiColeEnLinea (web y mobile)
 *
 * Uso básico:
 * - Web: funciona sin configuración adicional (usa localStorage)
 * - Mobile: llamar configureStorage() con AsyncStorage en App.tsx
 *
 * @example
 * // Web - sin configuración extra
 * import { useLogin, setAuthToken } from '@micoleenlinea/api-client';
 *
 * @example
 * // Mobile - configurar AsyncStorage al inicio
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * import { configureStorage } from '@micoleenlinea/api-client';
 *
 * configureStorage({
 *   getItem: (key) => AsyncStorage.getItem(key),
 *   setItem: (key, value) => AsyncStorage.setItem(key, value),
 *   removeItem: (key) => AsyncStorage.removeItem(key),
 * });
 */

// Config (axios client, storage, etc.)
export * from './config';

// Types
export * from './types';

// Mutations (React Query hooks para crear/actualizar/eliminar)
export * from './mutations';

// Queries (React Query hooks para leer)
export * from './queries';

// Utils
export * from './utils';

/**
 * Error logging utility
 * This utility can be used across mobile and web applications
 */

export interface LogErrorOptions {
  message: string;
  error: Error;
  context?: Record<string, any>;
}

// Check if we're in development mode (works in Node, Vite, and React Native)
const isDevelopment = (): boolean => {
  // React Native global
  if (typeof __DEV__ !== 'undefined') return __DEV__;
  // Node/Vite environment
  if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
    return process.env.NODE_ENV !== 'production';
  }
  // Default to true if can't determine
  return true;
};

// Declare __DEV__ for TypeScript (React Native global)
declare const __DEV__: boolean | undefined;

/**
 * Logs an error with a descriptive message and optional context
 * @param options - The error logging options
 */
export const logError = ({ message, error, context }: LogErrorOptions): void => {
  if (isDevelopment()) {
    console.error('Error:', message);
    console.error('Details:', error);
    if (context) {
      console.error('Context:', context);
    }
  }

  // TODO: En el futuro, aquí se puede integrar con un servicio de logging como Sentry
  // Example: Sentry.captureException(error, { extra: { message, context } });
};

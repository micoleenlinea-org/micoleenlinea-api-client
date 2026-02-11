import { U as UINotificationType } from '../notifications-DK5cn8JU.js';

/**
 * Error logging utility
 * This utility can be used across mobile and web applications
 */
interface LogErrorOptions {
    message: string;
    error: Error;
    context?: Record<string, any>;
}
/**
 * Logs an error with a descriptive message and optional context
 * @param options - The error logging options
 */
declare const logError: ({ message, error, context }: LogErrorOptions) => void;

/**
 * Función para mapear tipos de notificación de la API al tipo esperado en la UI
 * @param apiType - El tipo de notificación devuelto por la API
 * @returns El tipo de notificación para la UI (info, warning, error, success)
 */
declare const mapNotificationType: (apiType: string) => UINotificationType;

declare const transformDniToNumber: (dni: string) => number;
declare const transformDniToString: (dni: number) => string;

export { type LogErrorOptions, logError, mapNotificationType, transformDniToNumber, transformDniToString };

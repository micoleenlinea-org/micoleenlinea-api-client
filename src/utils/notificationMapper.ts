import { UINotificationType } from '../types';

/**
 * Función para mapear tipos de notificación de la API al tipo esperado en la UI
 * @param apiType - El tipo de notificación devuelto por la API
 * @returns El tipo de notificación para la UI (info, warning, error, success)
 */
export const mapNotificationType = (apiType: string): UINotificationType => {
  switch (apiType.toLowerCase()) {
    case 'info':
    case 'information':
      return 'info';
    case 'warning':
    case 'warn':
      return 'warning';
    case 'error':
    case 'danger':
      return 'error';
    case 'success':
      return 'success';
    default:
      return 'info';
  }
};

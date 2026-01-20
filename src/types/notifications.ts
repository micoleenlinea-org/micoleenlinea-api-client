/**
 * Tipos para las notificaciones y noticias institucionales
 */

// Tipo para los datos de notificación que vienen de la API
export interface ApiNotificationData {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
  status: string;
  priority?: number;
  category?: string;
  [key: string]: any;
}

// Tipo para los datos de noticia institucional que vienen de la API
export interface ApiInstitutionalNewsData {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  type: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  status: string;
  author?: string;
  featured_image?: string;
  [key: string]: any;
}

// Opciones para cargar datos
export interface LoadDataOptions {
  offset?: number;
  append?: boolean;
  limit?: number;
}

// Tipo de notificación para feedback visual en la UI
export type UINotificationType = 'info' | 'warning' | 'error' | 'success';

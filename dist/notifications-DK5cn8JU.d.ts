/**
 * Tipos para las notificaciones y noticias institucionales
 */
interface ApiNotificationData {
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
interface ApiInstitutionalNewsData {
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
interface LoadDataOptions {
    offset?: number;
    append?: boolean;
    limit?: number;
}
type UINotificationType = 'info' | 'warning' | 'error' | 'success';

export type { ApiInstitutionalNewsData as A, LoadDataOptions as L, UINotificationType as U, ApiNotificationData as a };

import { Y as UserAPIResponse } from './student-Bh8eaRQe.mjs';

interface School {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    postal_code: string;
    city: string;
    province_id: number;
    created_at: string;
    updated_at: string;
    admin: Pick<UserAPIResponse, 'id' | 'name' | 'dni' | 'email' | 'phone' | 'invite_status' | 'invite_sent_at' | 'invite_last_error' | 'invite_attempts' | 'invite_last_attempt_at' | 'invite_expires_at'>;
    logo_path: string | null;
    is_active: boolean;
}
interface Link {
    url: string | null;
    label: string;
    active: boolean;
}
interface GetSchoolsResponse {
    current_page: number;
    data: School[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<Link>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
interface SuperAdminAlert {
    type: 'warning' | 'error' | 'info';
    message: string;
    school_id: number;
}
interface SuperAdminActivityEvent {
    type: 'school_created' | 'admin_invited' | 'admin_confirmed';
    message: string;
    date: string;
}
interface SuperAdminMetricsResponse {
    total_schools: number;
    active_schools: number;
    new_schools_this_month: number;
    total_students: number;
    total_notifications_this_month: number;
    alerts: SuperAdminAlert[];
    recent_activity: SuperAdminActivityEvent[];
}
interface DashboardSchool extends Omit<School, 'admin'> {
    admin: School['admin'] | null;
    students_count: number;
    notifications_this_month_count: number;
}
interface GetDashboardSchoolsResponse {
    current_page: number;
    data: DashboardSchool[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<Link>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type { DashboardSchool as D, GetDashboardSchoolsResponse as G, School as S, GetSchoolsResponse as a, SuperAdminActivityEvent as b, SuperAdminAlert as c, SuperAdminMetricsResponse as d };

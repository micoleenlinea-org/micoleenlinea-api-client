import { U as UserAPIResponse } from './student-BlylHHl6.js';

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

export type { GetSchoolsResponse as G, School as S };

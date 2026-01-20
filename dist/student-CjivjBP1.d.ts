interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}

interface LoginRequest {
    email: string;
    password: string;
}
type InviteStatus = 'pending' | 'sent' | 'failed' | 'expired';
interface UserAPIResponse {
    id: number;
    dni: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: 'superadmin' | 'admin' | 'staff' | 'contact';
    school_id: number | null;
    is_active: boolean;
    phone: string | null;
    invite_status?: InviteStatus;
    invite_sent_at?: string | null;
    invite_last_error?: string | null;
    invite_attempts?: number;
    invite_last_attempt_at?: string | null;
    invite_expires_at?: string | null;
    created_at: string;
    updated_at: string;
}
interface LoginResponse {
    token: string;
    message?: string;
    user: UserAPIResponse;
}
interface ValidateTokenRequest {
    email: string;
    token: string;
}
interface ValidateTokenResponse {
    valid: boolean;
    role: string | null;
}
interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}
interface ResetPasswordResponse {
    message: string;
}

interface HttpIndividualContact {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    name?: string;
    student_id?: number;
}
interface StudentContact {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
}

interface GetCourseResponse {
    id: number;
    name: string;
    description?: string | null;
    is_active?: boolean;
    students_count?: number;
}
interface UpdateCoursePayload {
    name?: string;
    description?: string | null;
    is_active?: boolean;
}
interface DeleteCourseResponse {
    message: string;
}
interface DeleteCourseErrorResponse {
    message: string;
    students_count?: number;
}

interface Province {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
type GetProvincesResponse = Province[];

interface StaffMember {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: string;
    is_active: boolean;
}
interface StaffResponse {
    current_page: number;
    data: StaffMember[];
    first_page_url?: string;
    last_page?: number;
    per_page?: number;
    total?: number;
}
interface StaffQueryParams {
    page?: number;
    per_page?: number;
    q?: string;
}
interface HttpIndividualStaffMember {
    name: string;
    dni: number;
    phone?: string;
    email: string;
    role: 'admin' | 'staff';
    course_ids: number[];
}

interface Student {
    id: number;
    is_active: boolean;
    name: string;
    dni: number;
    birth_date: string;
    course: string;
    contacts: number;
    contact_phone?: string;
    contact_email?: string;
    contact_name?: string;
}
interface StudentsResponse {
    current_page: number;
    data: Student[];
    first_page_url?: string;
    last_page?: number;
    per_page?: number;
    total?: number;
}
interface StudentsQueryParams {
    page?: number;
    per_page?: number;
    q?: string;
}
interface HttpIndividualStudent {
    id?: number;
    first_name: string;
    last_name: string;
    dni: number;
    birth_date: Date;
    course_id: number;
    name?: string;
}

export type { ApiError as A, DeleteCourseResponse as D, GetCourseResponse as G, HttpIndividualContact as H, InviteStatus as I, LoginRequest as L, Province as P, ResetPasswordRequest as R, StudentContact as S, UserAPIResponse as U, ValidateTokenRequest as V, LoginResponse as a, ValidateTokenResponse as b, ResetPasswordResponse as c, UpdateCoursePayload as d, DeleteCourseErrorResponse as e, GetProvincesResponse as f, StaffMember as g, StaffResponse as h, StaffQueryParams as i, HttpIndividualStaffMember as j, Student as k, StudentsResponse as l, StudentsQueryParams as m, HttpIndividualStudent as n };

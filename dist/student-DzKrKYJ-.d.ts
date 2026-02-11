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
    school_email?: string | null;
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

declare enum NotificationType {
    CONTACT = "contact",
    CONTACTS = "contacts",
    COURSES = "courses",
    INSTITUTIONAL = "institutional"
}
interface NotificationMetricsResponse {
    enrolled_students: number;
    active_contacts: number;
    notifications_today: number;
    notifications_this_month: number;
    avg_read_percentage: number;
}
interface NotificationStats {
    viewPercentage: number;
    totalViews: number;
    totalSent: number;
}
interface SentTo {
    type: NotificationType;
    count: number;
    label: string;
}
interface NotificationParams {
    limit?: number;
    offset?: number;
    start_date?: string;
    end_date?: string;
    name?: string;
    course_ids?: number[];
    type?: 'institutional' | 'courses' | 'contacts';
    created_by?: number;
}
interface NotificationCreatedBy {
    id: number;
    name: string;
    initials: string;
}
interface Notification {
    id: number;
    subject: string;
    body: string;
    type: NotificationType;
    icon: string;
    sentTo: SentTo;
    stats: NotificationStats;
    createdAt: string;
    timeAgo: string;
    status: 'sent' | 'draft' | 'scheduled';
    channel?: 'push' | 'push_email';
    createdBy?: NotificationCreatedBy | null;
}
interface NotificationResponse {
    total: number;
    data: Notification[];
}
interface NotificationAttachment {
    id: number;
    name: string;
    filename: string;
}
interface HttpIndividualNotificationBase {
    id: number;
    subject: string;
    body: string;
    sent_at: string;
    recipients: string[];
    attachments: NotificationAttachment[];
}
interface ContactReadStatus {
    has_read: boolean;
    read_count: number;
}
interface ContactDetails {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    read_status: ContactReadStatus;
}
interface StudentGroupDetails {
    student_id: number;
    student_name: string;
    course: string;
    contacts: ContactDetails[];
}
interface HttpIndividualNotificationContacts extends HttpIndividualNotificationBase {
    preview_type: typeof NotificationType.CONTACTS | typeof NotificationType.CONTACT;
    recipient_details: StudentGroupDetails[];
}
interface CourseReadStatus {
    total_recipients: number;
    read_count: number;
    unread_count: number;
    read_percentage: number;
}
interface CourseDetails {
    course_id: number;
    course_name: string;
    contacts_count: number;
    read_status: CourseReadStatus;
}
interface HttpIndividualNotificationCourses extends HttpIndividualNotificationBase {
    preview_type: typeof NotificationType.COURSES;
    recipient_details: CourseDetails[];
}
interface InstitutionalDetails {
    contacts_count: number;
}
interface HttpIndividualNotificationInstitutional extends HttpIndividualNotificationBase {
    preview_type: typeof NotificationType.INSTITUTIONAL;
    recipient_details: InstitutionalDetails;
}
type HttpIndividualNotification = HttpIndividualNotificationInstitutional | HttpIndividualNotificationCourses | HttpIndividualNotificationContacts;
interface NotificationToCreate {
    type: NotificationType;
    subject: string;
    body: string;
    attachments: File[] | null;
}
interface CourseWithContactsResponse {
    id: number;
    name: string;
    contacts_count: number;
}
interface StudentWithContactsResponse {
    id: number;
    name: string;
    course_name: string;
    contacts_count: number;
}
interface MobileNotification {
    id: number;
    title: string;
    description: string;
    type: string;
    created_at: string;
    status: string;
    priority?: number;
    category?: string;
    has_read: boolean;
    read_count: number;
}
interface MobileNotificationsResponse {
    data: MobileNotification[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}
interface ResendResponse {
    message: string;
    resent_count: number;
    delivery?: {
        emails_queued: number;
        push_queued: number;
    };
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
    dni?: number;
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

export { type ApiError as A, type StaffMember as B, type ContactDetails as C, type DeleteCourseErrorResponse as D, type StaffQueryParams as E, type StaffResponse as F, type GetCourseResponse as G, type HttpIndividualContact as H, type InstitutionalDetails as I, type Student as J, type StudentContact as K, type LoginRequest as L, type MobileNotification as M, type Notification as N, type StudentGroupDetails as O, type Province as P, type StudentWithContactsResponse as Q, type ResendResponse as R, type SentTo as S, type StudentsQueryParams as T, type StudentsResponse as U, type UpdateCoursePayload as V, type UserAPIResponse as W, type ValidateTokenRequest as X, type ValidateTokenResponse as Y, type ContactReadStatus as a, type CourseDetails as b, type CourseReadStatus as c, type CourseWithContactsResponse as d, type DeleteCourseResponse as e, type GetProvincesResponse as f, type HttpIndividualNotification as g, type HttpIndividualNotificationBase as h, type HttpIndividualNotificationContacts as i, type HttpIndividualNotificationCourses as j, type HttpIndividualNotificationInstitutional as k, type HttpIndividualStaffMember as l, type HttpIndividualStudent as m, type InviteStatus as n, type LoginResponse as o, type MobileNotificationsResponse as p, type NotificationAttachment as q, type NotificationCreatedBy as r, type NotificationMetricsResponse as s, type NotificationParams as t, type NotificationResponse as u, type NotificationStats as v, type NotificationToCreate as w, NotificationType as x, type ResetPasswordRequest as y, type ResetPasswordResponse as z };

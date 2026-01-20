import { U as UserAPIResponse } from './student-CjivjBP1.mjs';

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

export { type ContactReadStatus as C, type GetSchoolsResponse as G, type HttpIndividualNotificationBase as H, type InstitutionalDetails as I, type MobileNotification as M, NotificationType as N, type SentTo as S, type NotificationMetricsResponse as a, type NotificationStats as b, type NotificationParams as c, type Notification as d, type NotificationResponse as e, type NotificationAttachment as f, type ContactDetails as g, type StudentGroupDetails as h, type HttpIndividualNotificationContacts as i, type CourseReadStatus as j, type CourseDetails as k, type HttpIndividualNotificationCourses as l, type HttpIndividualNotificationInstitutional as m, type HttpIndividualNotification as n, type NotificationToCreate as o, type CourseWithContactsResponse as p, type StudentWithContactsResponse as q, type MobileNotificationsResponse as r, type School as s };

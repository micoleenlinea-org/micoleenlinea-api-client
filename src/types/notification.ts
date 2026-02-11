export enum NotificationType {
  CONTACT = 'contact',
  CONTACTS = 'contacts',
  COURSES = 'courses',
  INSTITUTIONAL = 'institutional',
}

export interface NotificationMetricsResponse {
  enrolled_students: number;
  active_contacts: number;
  notifications_today: number;
  notifications_this_month: number;
  avg_read_percentage: number;
}

export interface NotificationStats {
  viewPercentage: number;
  totalViews: number;
  totalSent: number;
}

export interface SentTo {
  type: NotificationType;
  count: number;
  label: string;
}

export interface NotificationParams {
  limit?: number;
  offset?: number;
  start_date?: string; // Format: YYYY-MM-DD - Filter from date
  end_date?: string; // Format: YYYY-MM-DD - Filter to date
  name?: string; // Student name filter
  course_ids?: number[]; // Array of course IDs
  type?: 'institutional' | 'courses' | 'contacts'; // Type filter
  created_by?: number; // Filter by sender user ID
}

export interface NotificationCreatedBy {
  id: number;
  name: string;
  initials: string;
}

export interface Notification {
  id: number;
  subject: string;
  body: string;
  type: NotificationType;
  icon: string;
  sentTo: SentTo;
  stats: NotificationStats;
  createdAt: string; // ISO 8601 date string
  timeAgo: string;
  status: 'sent' | 'draft' | 'scheduled';
  channel?: 'push' | 'push_email';
  createdBy?: NotificationCreatedBy | null;
}

export interface NotificationResponse {
  total: number;
  data: Notification[];
}

export interface NotificationAttachment {
  id: number;
  name: string;
  filename: string;
}

export interface HttpIndividualNotificationBase {
  id: number;
  subject: string;
  body: string;
  sent_at: string;
  recipients: string[];
  attachments: NotificationAttachment[];
}

export interface ContactReadStatus {
  has_read: boolean;
  read_count: number;
}

export interface ContactDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string; // ISO date string
  read_status: ContactReadStatus;
}

export interface StudentGroupDetails {
  student_id: number;
  student_name: string;
  course: string;
  contacts: ContactDetails[];
}

export interface HttpIndividualNotificationContacts extends HttpIndividualNotificationBase {
  preview_type: typeof NotificationType.CONTACTS | typeof NotificationType.CONTACT;
  recipient_details: StudentGroupDetails[];
}

export interface CourseReadStatus {
  total_recipients: number;
  read_count: number;
  unread_count: number;
  read_percentage: number;
}
export interface CourseDetails {
  course_id: number;
  course_name: string;
  contacts_count: number;
  read_status: CourseReadStatus;
}

export interface HttpIndividualNotificationCourses extends HttpIndividualNotificationBase {
  preview_type: typeof NotificationType.COURSES;
  recipient_details: CourseDetails[];
}

export interface InstitutionalDetails {
  contacts_count: number;
}

export interface HttpIndividualNotificationInstitutional extends HttpIndividualNotificationBase {
  preview_type: typeof NotificationType.INSTITUTIONAL;
  recipient_details: InstitutionalDetails;
}

// Union type
export type HttpIndividualNotification =
  | HttpIndividualNotificationInstitutional
  | HttpIndividualNotificationCourses
  | HttpIndividualNotificationContacts;

export interface NotificationToCreate {
  type: NotificationType;
  subject: string;
  body: string;
  attachments: File[] | null;
}

export interface CourseWithContactsResponse {
  id: number;
  name: string;
  contacts_count: number;
}

export interface StudentWithContactsResponse {
  id: number;
  name: string;
  course_name: string;
  contacts_count: number;
}

// Mobile notification types (for contact users)
export interface MobileNotification {
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

export interface MobileNotificationsResponse {
  data: MobileNotification[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ResendResponse {
  message: string;
  resent_count: number;
  delivery?: {
    emails_queued: number;
    push_queued: number;
  };
}

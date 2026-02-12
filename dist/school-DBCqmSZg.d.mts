import { W as UserAPIResponse, P as Province } from './student-B9T5q6Jr.mjs';

interface CreateAdminRequest {
    name: string;
    email: string;
    dni?: number;
    phone?: string;
    school_id: number;
}
interface CreateAdminResponse {
    id: number;
}

interface ImportCsvRequest {
    file: File;
}
interface ImportCsvSuccessResponse {
    message: string;
    students_created: number;
    contacts_created: number;
    summary: {
        total_rows: number;
        students: number;
        contacts: number;
    };
}
interface ImportCsvErrorResponse {
    message: string;
    errors: Record<string, unknown>;
}
type ImportCsvResponse = ImportCsvSuccessResponse | ImportCsvErrorResponse;
/**
 * Una fila del CSV con metadatos de validación
 */
interface CsvRowWithStatus {
    dni: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    curso: string;
    dni_contacto: string;
    nombre_contacto: string;
    apellido_contacto: string;
    email_contacto: string;
    telefono_contacto: string;
    _rowIndex: number;
    _errors: string[];
    _isValid: boolean;
}
/**
 * Resumen de la validación del preview
 */
interface ImportPreviewSummary {
    total_rows: number;
    valid_rows: number;
    error_rows: number;
    new_students: number;
    new_contacts: number;
    existing_contacts: number;
    new_courses: number;
    existing_courses: number;
}
/**
 * Request para preview de importación
 */
interface ImportPreviewRequest {
    file: File;
}
/**
 * Response del endpoint preview
 */
interface ImportPreviewResponse {
    success: boolean;
    error?: string;
    rows: CsvRowWithStatus[];
    summary: ImportPreviewSummary;
}
/**
 * Request para confirmar importación
 */
interface ImportConfirmRequest {
    rows: Omit<CsvRowWithStatus, '_errors' | '_isValid'>[];
}
/**
 * Resumen del resultado de la importación
 */
interface ImportResultSummary {
    students_created: number;
    contacts_created: number;
    contacts_linked: number;
    courses_created: number;
    courses_reused: number;
    invites_queued: number;
}
/**
 * Response del endpoint confirm
 */
interface ImportConfirmResponse {
    success: boolean;
    message?: string;
    summary?: ImportResultSummary;
    errors?: string[];
}

interface UpdateProfileRequest {
    name: string;
    email: string;
    phone: string | null;
    dni: number;
}
interface UpdateProfileResponse {
    message: string;
    user: UserAPIResponse;
}

interface SchoolRequest {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    postal_code?: string;
    city?: string;
    province_id?: Province['id'];
}
interface CreateSchoolResponse {
    id: number;
}
interface SchoolResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    postal_code: string;
    city: string;
    logo_path: string | null;
    province_id: number;
    is_active: number;
    created_at: string;
    updated_at: string;
}

export type { CreateAdminRequest as C, ImportConfirmRequest as I, SchoolRequest as S, UpdateProfileRequest as U, CreateAdminResponse as a, CreateSchoolResponse as b, CsvRowWithStatus as c, ImportConfirmResponse as d, ImportCsvRequest as e, ImportCsvResponse as f, ImportPreviewRequest as g, ImportPreviewResponse as h, ImportPreviewSummary as i, ImportResultSummary as j, SchoolResponse as k, UpdateProfileResponse as l };

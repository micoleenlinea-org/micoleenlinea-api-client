// Legacy import types (deprecated)
export interface ImportCsvRequest {
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
export type ImportCsvResponse = ImportCsvSuccessResponse | ImportCsvErrorResponse;

// New unified import types

/**
 * Una fila del CSV con metadatos de validación
 */
export interface CsvRowWithStatus {
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
export interface ImportPreviewSummary {
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
export interface ImportPreviewRequest {
  file: File;
}

/**
 * Response del endpoint preview
 */
export interface ImportPreviewResponse {
  success: boolean;
  error?: string;
  rows: CsvRowWithStatus[];
  summary: ImportPreviewSummary;
}

/**
 * Request para confirmar importación
 */
export interface ImportConfirmRequest {
  rows: Omit<CsvRowWithStatus, '_rowIndex' | '_errors' | '_isValid'>[];
}

/**
 * Resumen del resultado de la importación
 */
export interface ImportResultSummary {
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
export interface ImportConfirmResponse {
  success: boolean;
  message?: string;
  summary?: ImportResultSummary;
  errors?: string[];
}

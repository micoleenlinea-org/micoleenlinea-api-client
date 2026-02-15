export interface Student {
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
  contact_dni?: number;
  notes?: string;
}

export interface StudentsResponse {
  current_page: number;
  data: Student[];
  first_page_url?: string;
  last_page?: number;
  per_page?: number;
  total?: number;
}

export interface StudentsQueryParams {
  page?: number;
  per_page?: number;
  q?: string; // texto de búsqueda opcional
}

export interface HttpIndividualStudent {
  id?: number;
  first_name: string;
  last_name: string;
  dni: number;
  birth_date: Date;
  course_id: number;
  name?: string;
  notes?: string;
}

export interface UpdateStudentData {
  id: number;
  course_id?: number;
  phone?: string;
  first_name?: string;
  last_name?: string;
  notes?: string;
}

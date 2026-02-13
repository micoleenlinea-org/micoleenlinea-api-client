export interface HttpIndividualContact {
  first_name: string;
  last_name: string;
  dni?: number;
  email: string;
  phone: string;
  name?: string;
  student_id?: number;
}

export interface StudentContact {
  id: number;
  name: string;
  dni?: number;
  email: string;
  phone: string;
  is_active: boolean;
}

export interface CreateContactStandaloneRequest {
  first_name: string;
  last_name: string;
  dni: number;
  email: string;
  phone?: string;
  student_ids: number[];
}

export interface CreateContactResponse {
  contact_id: number;
  student_id?: number;
  is_existing: boolean;
}

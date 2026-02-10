// Staff member data structure (following Student pattern)
export interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone?: string; // Optional like Student's contact fields
  role: string;
  is_active: boolean;
}

export interface StaffResponse {
  current_page: number;
  data: StaffMember[];
  first_page_url?: string;
  last_page?: number;
  per_page?: number;
  total?: number;
}

// Staff query params (following Student pattern)
export interface StaffQueryParams {
  page?: number;
  per_page?: number;
  q?: string; // texto de búsqueda opcional
}

export interface HttpIndividualStaffMember {
  name: string;
  dni?: number;
  phone?: string;
  email: string;
  role: 'admin' | 'staff';
  course_ids: number[];
}

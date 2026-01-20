export interface HttpIndividualContact {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  name?: string;
  student_id?: number;
}

export interface StudentContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
}

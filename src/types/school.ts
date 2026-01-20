import { type Province } from './province';

export interface SchoolRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  province_id?: Province['id'];
}

export interface CreateSchoolResponse {
  id: number;
}

export interface SchoolResponse {
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

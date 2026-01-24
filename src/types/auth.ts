export interface LoginRequest {
  email: string;
  password: string;
}

export type InviteStatus = 'pending' | 'sent' | 'failed' | 'expired';

export interface UserAPIResponse {
  id: number;
  dni: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: 'superadmin' | 'admin' | 'staff' | 'contact';
  school_id: number | null;
  school_email?: string | null; // Email del colegio, usado para validar si puede enviar emails
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
export interface LoginResponse {
  token: string;
  message?: string;
  user: UserAPIResponse;
}

export interface ValidateTokenRequest {
  email: string;
  token: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
  role: string | null;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResponse {
  message: string;
}

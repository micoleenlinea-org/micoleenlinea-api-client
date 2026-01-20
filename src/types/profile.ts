import type { UserAPIResponse } from './auth';

export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone: string | null;
  dni: number;
}

export interface UpdateProfileResponse {
  message: string;
  user: UserAPIResponse;
}

export interface GetCourseResponse {
  id: number;
  name: string;
  description?: string | null;
  is_active?: boolean;
  students_count?: number;
}

export interface UpdateCoursePayload {
  name?: string;
  description?: string | null;
  is_active?: boolean;
}

export interface DeleteCourseResponse {
  message: string;
}

export interface DeleteCourseErrorResponse {
  message: string;
  students_count?: number;
}

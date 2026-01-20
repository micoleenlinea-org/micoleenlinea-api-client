// Request sent from FE to BE to crear un admin
export interface CreateAdminRequest {
  name: string;
  email: string;
  dni?: number;
  phone?: string;
  school_id: number;
}

// Respuesta del BE al crear un admin
export interface CreateAdminResponse {
  id: number;
}

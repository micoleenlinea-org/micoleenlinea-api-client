export interface Province {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Define el tipo para la respuesta del endpoint
export type GetProvincesResponse = Province[];

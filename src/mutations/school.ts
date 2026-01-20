import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import type { CreateSchoolResponse, SchoolRequest, SchoolResponse } from '../types/school';

const createSchoolAPI = async (school: SchoolRequest): Promise<CreateSchoolResponse> => {
  const response = await apiClient.post<CreateSchoolResponse>('/schools', school);
  return response.data;
};

export const useCreateSchool = () => {
  return useMutation<CreateSchoolResponse, ApiError, SchoolRequest>({
    mutationFn: createSchoolAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en crear escuela:', error);
    },
  });
};

const setSchoolActiveAPI = async ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}): Promise<void> => {
  await apiClient.patch(`/schools/${id}/active`, { is_active });
};

export const useSetSchoolActive = () => {
  return useMutation<void, ApiError, { id: number; is_active: boolean }>({
    mutationFn: setSchoolActiveAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en cambiar el status de la escuela:', error);
    },
  });
};

const getSchoolByIdAPI = async (id: number): Promise<SchoolResponse> => {
  const response = await apiClient.get<SchoolResponse>(`/schools/${id}`);
  return response.data;
};

export const useGetSchoolById = (id?: number) => {
  return useQuery<SchoolResponse, ApiError>({
    queryKey: ['school', id],
    queryFn: () => getSchoolByIdAPI(id!),
    enabled: !!id,
  });
};

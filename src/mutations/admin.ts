import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../config/axios';
import { type CreateAdminRequest, type CreateAdminResponse } from '../types/admin';
import { type ApiError } from '../types/apiError';

const createAdminAPI = async (admin: CreateAdminRequest): Promise<CreateAdminResponse> => {
  try {
    const response = await apiClient.post<CreateAdminResponse>('/admins', admin);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {},
    } as ApiError;
  }
};

export const resendAdminInviteAPI = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/admins/resend-invite', { email });
  return response.data;
};

export const useCreateAdmin = () => {
  return useMutation<CreateAdminResponse, ApiError, CreateAdminRequest>({
    mutationFn: createAdminAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en crear administrador:', error);
    },
  });
};

export const useResendAdminInvite = () => {
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: resendAdminInviteAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error al reenviar invitación de administrador:', error);
    },
  });
};

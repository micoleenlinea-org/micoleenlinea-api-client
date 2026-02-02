import { AxiosError } from 'axios';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import { type HttpIndividualContact } from '../types/contact';
import { useMutation } from '@tanstack/react-query';

const createContactAPI = async (contact: HttpIndividualContact): Promise<void> => {
  try {
    await apiClient.post<HttpIndividualContact>(
      `/students/${contact.student_id}/contacts`,
      contact
    );
  } catch (err) {
    const error = err as AxiosError<any>;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {},
    } as ApiError;
  }
};

interface UpdateContactParams {
  id: number;
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

const updateContactAPI = async (params: UpdateContactParams): Promise<void> => {
  try {
    await apiClient.patch(
      `/students/${params.student_id}/contacts/${params.id}`,
      {
        first_name: params.first_name,
        last_name: params.last_name,
        email: params.email,
        phone: params.phone || '',
      }
    );
  } catch (err) {
    const error = err as AxiosError<any>;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {},
    } as ApiError;
  }
};

export const useCreateContact = () => {
  return useMutation<void, ApiError, HttpIndividualContact>({
    mutationFn: createContactAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en crear contacto:', error);
    },
  });
};

export const useUpdateContact = () => {
  return useMutation<void, ApiError, UpdateContactParams>({
    mutationFn: updateContactAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en actualizar contacto:', error);
    },
  });
};

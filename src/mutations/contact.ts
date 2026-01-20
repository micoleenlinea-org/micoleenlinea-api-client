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

export const useCreateContact = () => {
  return useMutation<void, ApiError, HttpIndividualContact>({
    mutationFn: createContactAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en crear contacto:', error);
    },
  });
};

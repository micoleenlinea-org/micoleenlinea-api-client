import type { AxiosError } from 'axios';
import { apiClient } from '../config/axios';
import type { ApiError } from '../types/apiError';
import { useMutation } from '@tanstack/react-query';

const createNotificationApi = async (notificationData: FormData) => {
  try {
    const { data } = await apiClient.post('/notifications', notificationData);
    return data;
  } catch (err) {
    const error = err as AxiosError<any>;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {},
    } as ApiError;
  }
};

export const useCreateNotification = () => {
  return useMutation<void, ApiError, FormData>({
    mutationFn: createNotificationApi,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error creating notification:', error);
    },
  });
};

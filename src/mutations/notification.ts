import type { AxiosError } from 'axios';
import { apiClient } from '../config/axios';
import type { ApiError } from '../types/apiError';
import type { ResendResponse } from '../types/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

const resendToPendingApi = async (notificationId: number): Promise<ResendResponse> => {
  try {
    const { data } = await apiClient.post(`/notifications/${notificationId}/resend-pending`);
    return data;
  } catch (err) {
    const error = err as AxiosError<any>;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {},
    } as ApiError;
  }
};

export const useResendToPending = () => {
  const queryClient = useQueryClient();

  return useMutation<ResendResponse, ApiError, number>({
    mutationFn: resendToPendingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

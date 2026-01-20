import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import type { ApiError } from '../types/apiError';
import type { UpdateProfileRequest, UpdateProfileResponse } from '../types/profile';

/**
 * Update user profile information
 */
export const updateProfileAPI = async (
  token: string,
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put('/me', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
  return useMutation<
    UpdateProfileResponse,
    ApiError,
    { token: string; data: UpdateProfileRequest }
  >({
    mutationFn: ({ token, data }) => updateProfileAPI(token, data),
    onSuccess: () => {
      console.log('Profile updated successfully');
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });
};

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import { type GetSchoolsResponse } from '../types/superadminDashboard';

const getSchools = async (page: number, perPage: number) => {
  const { data } = await apiClient.get('/schools', {
    params: { page, per_page: perPage },
  });
  return data;
};

export const useGetSchoolsQuery = (page: number, perPage: number) => {
  return useQuery<GetSchoolsResponse, ApiError>({
    queryKey: ['schools', page, perPage],
    queryFn: () => getSchools(page, perPage),
    placeholderData: (prev) => prev,
  });
};

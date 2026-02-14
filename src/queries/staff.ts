import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import type { HttpIndividualStaffMember, StaffQueryParams, StaffResponse } from '../types/staff';
import { type ApiError } from '../types/apiError';

const getStaffAPI = async (params: StaffQueryParams = {}): Promise<StaffResponse> => {
  const defaultParams = { page: 1, per_page: 10 };
  const response = await apiClient.get<StaffResponse>('/staff', {
    params: { ...defaultParams, ...params },
  });
  return response.data;
};

const getStaffByIdAPI = async (id: number) => {
  const response = await apiClient.get(`/staff/${id}`);
  return response.data;
};

export const useGetStaff = (
  params?: StaffQueryParams,
  options?: Omit<UseQueryOptions<StaffResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  const merged = { page: 1, per_page: 10, ...(params ?? {}) };

  const queryKey = ['staff', merged.page, merged.per_page, merged.q ?? ''];

  const placeholder: StaffResponse = {
    current_page: merged.page,
    data: [],
    first_page_url: undefined,
    last_page: undefined,
    per_page: merged.per_page,
    total: 0,
  };

  const defaultOptions = {
    keepPreviousData: true,
    placeholderData: placeholder,
    staleTime: 60_000,
    enabled: options?.enabled ?? true,
  };

  return useQuery<StaffResponse, ApiError>({
    queryKey,
    queryFn: () => getStaffAPI(merged),
    ...defaultOptions,
    ...options,
  });
};

export const useGetStaffById = (id: number) => {
  return useQuery<HttpIndividualStaffMember, ApiError>({
    queryKey: ['staff', id],
    queryFn: () => getStaffByIdAPI(id),
    enabled: !!id,
  });
};

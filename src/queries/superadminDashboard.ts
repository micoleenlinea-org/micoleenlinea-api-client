import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import {
  type GetSchoolsResponse,
  type SuperAdminMetricsResponse,
  type GetDashboardSchoolsResponse,
} from '../types/superadminDashboard';

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

// --- SuperAdmin Dashboard hooks (nuevos, no modifican los existentes) ---

const getSuperAdminMetrics = async (): Promise<SuperAdminMetricsResponse> => {
  const { data } = await apiClient.get('/schools/superadmin-metrics');
  return data;
};

export const useGetSuperAdminMetricsQuery = () => {
  return useQuery<SuperAdminMetricsResponse, ApiError>({
    queryKey: ['superadmin', 'metrics'],
    queryFn: getSuperAdminMetrics,
  });
};

interface DashboardSchoolsParams {
  page: number;
  perPage: number;
  search?: string;
  isActive?: boolean;
}

const getDashboardSchools = async (
  params: DashboardSchoolsParams,
): Promise<GetDashboardSchoolsResponse> => {
  const { data } = await apiClient.get('/schools/dashboard', {
    params: {
      page: params.page,
      per_page: params.perPage,
      search: params.search || undefined,
      is_active: params.isActive,
    },
  });
  return data;
};

export const useGetDashboardSchoolsQuery = (params: DashboardSchoolsParams) => {
  return useQuery<GetDashboardSchoolsResponse, ApiError>({
    queryKey: ['superadmin', 'dashboard-schools', params],
    queryFn: () => getDashboardSchools(params),
    placeholderData: (prev) => prev,
  });
};

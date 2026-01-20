import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type GetProvincesResponse } from '../types/province';
import { type ApiError } from '../types/apiError';

const getProvinces = async () => {
  const { data } = await apiClient.get('/provinces');
  return data;
};

export const useGetProvincesQuery = () => {
  return useQuery<GetProvincesResponse, ApiError>({
    queryKey: ['provinces'],
    queryFn: getProvinces,
    placeholderData: (prev) => prev,
  });
};

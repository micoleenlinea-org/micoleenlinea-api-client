import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import { type GetCourseResponse } from '../types/course';
import { getMockCoursesStorage } from '../mutations/course';
import { MOCK_MODE } from '../config/mock';

const getCoursesMock = async (): Promise<GetCourseResponse[]> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Retornar cursos del storage mock
  return getMockCoursesStorage();
};

const getCourses = async () => {
  // 🧪 MODO TESTING
  if (MOCK_MODE) {
    return getCoursesMock();
  }
  
  // PRODUCCIÓN
  const { data } = await apiClient.get('/courses');
  return data;
};

export const useGetCoursesQuery = () => {
  return useQuery<GetCourseResponse[], ApiError>({
    queryKey: ['courses'],
    queryFn: getCourses,
    placeholderData: (prev) => prev,
  });
};

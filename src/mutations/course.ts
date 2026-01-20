import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import { MOCK_MODE } from '../config/mock';
import type { UpdateCoursePayload, DeleteCourseResponse } from '../types/course';

export interface CreateCoursePayload {
  name: string;
  description?: string;
}

export interface CourseResponse {
  id: number;
  name: string;
  description: string | null;
  school_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Re-exportar tipos para conveniencia
export type { UpdateCoursePayload, DeleteCourseResponse } from '../types/course';

// Almacenamiento temporal de cursos creados en localStorage (solo para modo mock)
const MOCK_STORAGE_KEY = 'mockCoursesStorage';

const getMockCoursesFromStorage = (): CourseResponse[] => {
  try {
    const stored = localStorage.getItem(MOCK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveMockCoursesToStorage = (courses: CourseResponse[]) => {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error('Error guardando cursos en localStorage:', error);
  }
};

const createCourseMock = async (course: CreateCoursePayload): Promise<CourseResponse> => {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const mockCoursesStorage = getMockCoursesFromStorage();
  
  // Validar duplicado (comparar solo nombre)
  const duplicate = mockCoursesStorage.find(
    (c) => c.name.toLowerCase() === course.name.toLowerCase()
  );
  
  if (duplicate) {
    throw {
      message: 'El curso ya existe',
      errors: {
        name: ['Ya existe un curso con ese nombre.'],
      },
    } as ApiError;
  }
  
  // Simular respuesta exitosa
  const newCourse: CourseResponse = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: course.name,
    description: course.description || null,
    school_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  mockCoursesStorage.push(newCourse);
  saveMockCoursesToStorage(mockCoursesStorage);
  return newCourse;
};

// Exportar función para que otros módulos puedan acceder
export const getMockCoursesStorage = () => getMockCoursesFromStorage();

const createCourseAPI = async (course: CreateCoursePayload): Promise<CourseResponse> => {
  if (MOCK_MODE) return createCourseMock(course);
  
  const response = await apiClient.post<CourseResponse>('/courses', course);
  return response.data;
};

export const useCreateCourse = () => {
  return useMutation<CourseResponse, ApiError, CreateCoursePayload>({
    mutationFn: createCourseAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error al crear curso:', error);
    },
  });
};

// ==================== UPDATE COURSE ====================

// Tipo local extendido con id para el payload de mutation
interface UpdateCourseMutationPayload extends UpdateCoursePayload {
  id: number;
}

const updateCourseMock = async (payload: UpdateCourseMutationPayload): Promise<CourseResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockCoursesStorage = getMockCoursesFromStorage();
  const courseIndex = mockCoursesStorage.findIndex((c) => c.id === payload.id);

  if (courseIndex === -1) {
    throw { message: 'Curso no encontrado' } as ApiError;
  }

  // Check for duplicate name (excluding current course)
  if (payload.name) {
    const duplicate = mockCoursesStorage.find(
      (c) => c.id !== payload.id && c.name.toLowerCase() === payload.name!.toLowerCase()
    );
    if (duplicate) {
      throw {
        message: 'Ya existe un curso con ese nombre.',
        errors: { name: ['Ya existe un curso con ese nombre.'] },
      } as ApiError;
    }
  }

  const updatedCourse: CourseResponse = {
    ...mockCoursesStorage[courseIndex],
    ...(payload.name !== undefined && { name: payload.name }),
    ...(payload.description !== undefined && { description: payload.description }),
    ...(payload.is_active !== undefined && { is_active: payload.is_active }),
    updated_at: new Date().toISOString(),
  };

  mockCoursesStorage[courseIndex] = updatedCourse;
  saveMockCoursesToStorage(mockCoursesStorage);

  return updatedCourse;
};

const updateCourseAPI = async (payload: UpdateCourseMutationPayload): Promise<CourseResponse> => {
  if (MOCK_MODE) return updateCourseMock(payload);

  const { id, ...data } = payload;
  const response = await apiClient.patch<CourseResponse>(`/courses/${id}`, data);
  return response.data;
};

export const useUpdateCourse = () => {
  return useMutation<CourseResponse, ApiError, UpdateCourseMutationPayload>({
    mutationFn: updateCourseAPI,
    onError: (error) => {
      console.error('Error al actualizar curso:', error);
    },
  });
};

// ==================== DELETE COURSE ====================

const deleteCourseMock = async (id: number): Promise<DeleteCourseResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockCoursesStorage = getMockCoursesFromStorage();
  const courseIndex = mockCoursesStorage.findIndex((c) => c.id === id);

  if (courseIndex === -1) {
    throw { message: 'Curso no encontrado' } as ApiError;
  }

  mockCoursesStorage.splice(courseIndex, 1);
  saveMockCoursesToStorage(mockCoursesStorage);

  return { message: 'Curso eliminado exitosamente' };
};

const deleteCourseAPI = async (id: number): Promise<DeleteCourseResponse> => {
  if (MOCK_MODE) return deleteCourseMock(id);

  const response = await apiClient.delete<DeleteCourseResponse>(`/courses/${id}`);
  return response.data;
};

export const useDeleteCourse = () => {
  return useMutation<DeleteCourseResponse, ApiError, number>({
    mutationFn: deleteCourseAPI,
    onError: (error) => {
      console.error('Error al eliminar curso:', error);
    },
  });
};

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import type {
  HttpIndividualStudent,
  StudentsQueryParams,
  StudentsResponse,
} from '../types/student';
import { type ApiError } from '../types/apiError';
import { type HttpIndividualContact, type StudentContact } from '../types/contact';
import { getMockStudentsStorage } from '../mutations/student';
import { getMockCoursesStorage } from '../mutations/course';
import { MOCK_MODE } from '../config/mock';

const getStudentsAPIMock = async (params: StudentsQueryParams = {}): Promise<StudentsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const students = getMockStudentsStorage();
  const courses = getMockCoursesStorage();
  
  // Mapear estudiantes al formato esperado
  const mappedData = students.map(s => {
    const course = courses.find(c => c.id === s.student.course_id);
    return {
      id: s.id,
      name: `${s.student.first_name} ${s.student.last_name}`,
      dni: s.student.dni,
      birth_date: s.student.birth_date instanceof Date ? s.student.birth_date.toISOString().split('T')[0] : s.student.birth_date,
      course: course?.name || 'Sin curso',
      contacts: 1,
      contact_phone: s.contact.phone || '',
      contact_email: s.contact.email || '',
      contact_name: `${s.contact.first_name} ${s.contact.last_name}`,
      is_active: s.is_active,
    };
  });
  
  // Aplicar búsqueda si existe query
  let filteredData = mappedData;
  if (params.q) {
    const searchTerm = params.q.toLowerCase();
    filteredData = mappedData.filter(s => 
      s.name.toLowerCase().includes(searchTerm) ||
      s.dni.toString().includes(searchTerm) ||
      s.course.toLowerCase().includes(searchTerm) ||
      s.contact_email.toLowerCase().includes(searchTerm)
    );
  }
  
  // Aplicar paginación
  const page = params.page || 1;
  const perPage = params.per_page || 10;
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);
  
  return {
    current_page: page,
    data: paginatedData,
    first_page_url: undefined,
    last_page: Math.ceil(filteredData.length / perPage) || 1,
    per_page: perPage,
    total: filteredData.length,
  };
};

const getStudentByIdAPIMock = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    student: {
      id,
      first_name: 'Juan',
      last_name: 'Pérez',
      dni: 12345678,
      birth_date: new Date('2010-05-15'),
      course_id: 1,
    },
    contact: {
      first_name: 'María',
      last_name: 'Pérez',
      email: 'maria@example.com',
      phone: '+54 9 11 1234-5678',
    },
  };
};

const getStudentsAPI = async (params: StudentsQueryParams = {}): Promise<StudentsResponse> => {
  if (MOCK_MODE) return getStudentsAPIMock(params);
  
  const defaultParams = { page: 1, per_page: 10 };
  const response = await apiClient.get<StudentsResponse>('/students', {
    params: { ...defaultParams, ...params },
  });
  return response.data;
};

const getStudentByIdAPI = async (id: number) => {
  if (MOCK_MODE) return getStudentByIdAPIMock(id);
  
  const response = await apiClient.get(`/students/${id}`);
  return response.data;
};

export const useGetStudents = (
  params?: StudentsQueryParams,
  options?: UseQueryOptions<StudentsResponse, ApiError>
) => {
  const merged = { page: 1, per_page: 10, ...(params ?? {}) };

  const queryKey = ['students', merged.page, merged.per_page, merged.q ?? ''];

  const placeholder: StudentsResponse = {
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

  return useQuery<StudentsResponse, ApiError>({
    queryKey,
    queryFn: () => getStudentsAPI(merged),
    ...defaultOptions,
    ...options,
  });
};

export const useGetStudentById = (id: number) => {
  return useQuery<{ student: HttpIndividualStudent; contact: HttpIndividualContact }, ApiError>({
    queryKey: ['students', id],
    queryFn: () => getStudentByIdAPI(id),
    enabled: !!id,
  });
};

// ==================== GET STUDENT CONTACTS ====================

const getStudentContactsMock = async (studentId: number): Promise<StudentContact[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const students = getMockStudentsStorage();
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return [];
  }

  return [
    {
      id: 1,
      name: `${student.contact.first_name} ${student.contact.last_name}`,
      email: student.contact.email,
      phone: student.contact.phone,
      is_active: true,
    },
  ];
};

const getStudentContactsAPI = async (studentId: number): Promise<StudentContact[]> => {
  if (MOCK_MODE) return getStudentContactsMock(studentId);

  const response = await apiClient.get<StudentContact[]>(`/students/${studentId}/contacts`);
  return response.data;
};

export const useGetStudentContacts = (studentId: number | null) => {
  return useQuery<StudentContact[], ApiError>({
    queryKey: ['students', studentId, 'contacts'],
    queryFn: () => getStudentContactsAPI(studentId!),
    enabled: !!studentId,
  });
};

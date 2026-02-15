import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type ApiError } from '../types/apiError';
import { type HttpIndividualStudent, type UpdateStudentData } from '../types/student';
import { type HttpIndividualContact } from '../types/contact';
import type {
  ImportCsvRequest,
  ImportCsvResponse,
  ImportPreviewRequest,
  ImportPreviewResponse,
  ImportConfirmRequest,
  ImportConfirmResponse,
  CsvRowWithStatus,
} from '../types/csv';
import { MOCK_MODE } from '../config/mock';
const MOCK_STUDENTS_STORAGE_KEY = 'mockStudentsStorage';

interface StoredStudent {
  id: number;
  student: HttpIndividualStudent;
  contact: HttpIndividualContact;
  is_active: boolean;
}

const getMockStudentsFromStorage = (): StoredStudent[] => {
  try {
    const stored = localStorage.getItem(MOCK_STUDENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveMockStudentsToStorage = (students: StoredStudent[]) => {
  try {
    localStorage.setItem(MOCK_STUDENTS_STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error guardando estudiantes en localStorage:', error);
  }
};

const toggleContactAPIMock = async ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const students = getMockStudentsFromStorage();
  const student = students.find(s => s.id === id);
  if (student) {
    student.is_active = is_active;
    saveMockStudentsToStorage(students);
  }
  console.log(`🧪 Mock: Toggle contact ${id} to ${is_active}`);
};

const createStudentWithContactAPIMock = async (
  studentData: HttpIndividualStudent,
  contactData: HttpIndividualContact
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const students = getMockStudentsFromStorage();
  const newStudent: StoredStudent = {
    id: Math.floor(Math.random() * 10000) + 1,
    student: { ...studentData, id: Math.floor(Math.random() * 10000) + 1 },
    contact: contactData,
    is_active: true,
  };
  
  students.push(newStudent);
  saveMockStudentsToStorage(students);
  console.log('🧪 Mock: Estudiante creado:', newStudent);
};

const updateStudentAPIMock = async (id: number, data: Omit<UpdateStudentData, 'id'>) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const students = getMockStudentsFromStorage();
  const student = students.find(s => s.id === id);
  if (student) {
    if (data.course_id !== undefined) student.student.course_id = data.course_id;
    if (data.phone !== undefined) student.contact.phone = data.phone;
    if (data.first_name !== undefined) student.student.first_name = data.first_name;
    if (data.last_name !== undefined) student.student.last_name = data.last_name;
    saveMockStudentsToStorage(students);
  }
  console.log(`🧪 Mock: Estudiante ${id} actualizado`, data);
};

const deleteStudentAPIMock = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const students = getMockStudentsFromStorage();
  const filtered = students.filter(s => s.id !== id);
  saveMockStudentsToStorage(filtered);
  console.log(`🧪 Mock: Estudiante ${id} eliminado`);
};

const importCsvAPIMock = async (data: ImportCsvRequest): Promise<ImportCsvResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('🧪 Mock: CSV importado:', data.file.name);
  return {
    message: 'Archivo procesado exitosamente (mock)',
    students_created: 5,
    contacts_created: 5,
    summary: {
      total_rows: 10,
      students: 5,
      contacts: 5,
    },
  };
};

export const getMockStudentsStorage = () => getMockStudentsFromStorage();

const toggleContactAPI = async ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}): Promise<void> => {
  if (MOCK_MODE) return toggleContactAPIMock({ id, is_active });
  await apiClient.patch(`students/${id}/contacts/toggle`, { is_active });
};

const createStudentWithContactAPI = async (
  studentData: HttpIndividualStudent,
  contactData: HttpIndividualContact
): Promise<void> => {
  if (MOCK_MODE) return createStudentWithContactAPIMock(studentData, contactData);
  await apiClient.post('/students', { student: studentData, contact: contactData });
};

const updateStudentAPI = async ({ id, ...data }: UpdateStudentData) => {
  if (MOCK_MODE) return updateStudentAPIMock(id, data);
  await apiClient.patch(`/students/${id}`, data);
};

const deleteStudentAPI = async (id: number): Promise<void> => {
  if (MOCK_MODE) return deleteStudentAPIMock(id);
  await apiClient.delete(`/students/${id}`);
};

const importCsvAPI = async (data: ImportCsvRequest): Promise<ImportCsvResponse> => {
  if (MOCK_MODE) return importCsvAPIMock(data);
  
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await apiClient.post('/students/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useToggleContact = () => {
  return useMutation<void, ApiError, { id: number; is_active: boolean }>({
    mutationFn: toggleContactAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en cambiar el estatus del contacto del estudiante:', error);
    },
  });
};

export const useCreateStudentWithContact = () => {
  return useMutation<
    void,
    ApiError,
    { studentData: HttpIndividualStudent; contactData: HttpIndividualContact }
  >({
    mutationFn: ({ studentData, contactData }) =>
      createStudentWithContactAPI(studentData, contactData),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en crear estudiante con contacto:', error);
    },
  });
};

export const useUpdateStudent = () => {
  return useMutation<void, ApiError, UpdateStudentData>({
    mutationFn: updateStudentAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en actualizar estudiante:', error);
    },
  });
};

export const useDeleteStudent = () => {
  return useMutation<void, ApiError, number>({
    mutationFn: deleteStudentAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en eliminar estudiante:', error);
    },
  });
};

export const useImportCsv = () => {
  return useMutation<ImportCsvResponse, ApiError, ImportCsvRequest>({
    mutationFn: importCsvAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error al importar CSV:', error);
    },
  });
};

// ============================================
// New Import Preview/Confirm API
// ============================================

const importPreviewAPIMock = async (
  _data: ImportPreviewRequest
): Promise<ImportPreviewResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log('🧪 Mock: CSV preview');

  // Simular algunas filas con y sin errores
  const mockRows: CsvRowWithStatus[] = [
    {
      dni: '12345678',
      nombre: 'Juan',
      apellido: 'Perez',
      fecha_nacimiento: '15/03/2015',
      curso: '1ro A',
      dni_contacto: '20345678',
      nombre_contacto: 'Maria',
      apellido_contacto: 'Perez',
      email_contacto: 'maria@email.com',
      telefono_contacto: '1123456789',
      _rowIndex: 1,
      _errors: [],
      _isValid: true,
    },
    {
      dni: '87654321',
      nombre: 'Ana',
      apellido: 'Garcia',
      fecha_nacimiento: '22/07/2016',
      curso: '1ro A',
      dni_contacto: '21456789',
      nombre_contacto: 'Pedro',
      apellido_contacto: 'Garcia',
      email_contacto: 'pedro@email.com',
      telefono_contacto: '1198765432',
      _rowIndex: 2,
      _errors: [],
      _isValid: true,
    },
    {
      dni: '1234',
      nombre: 'Error',
      apellido: 'Test',
      fecha_nacimiento: '01/01/2015',
      curso: '2do B',
      dni_contacto: '123',
      nombre_contacto: 'Test',
      apellido_contacto: 'Contact',
      email_contacto: 'invalid-email',
      telefono_contacto: '123',
      _rowIndex: 3,
      _errors: ['DNI debe tener 7-8 dígitos numéricos', 'DNI del contacto debe tener 7-8 dígitos', 'Email inválido', 'Teléfono debe tener 10 dígitos'],
      _isValid: false,
    },
  ];

  return {
    success: true,
    rows: mockRows,
    summary: {
      total_rows: 3,
      valid_rows: 2,
      error_rows: 1,
      new_students: 2,
      new_contacts: 2,
      existing_contacts: 0,
      new_courses: 1,
      existing_courses: 0,
    },
  };
};

const importPreviewAPI = async (
  data: ImportPreviewRequest
): Promise<ImportPreviewResponse> => {
  if (MOCK_MODE) return importPreviewAPIMock(data);

  const formData = new FormData();
  formData.append('file', data.file);

  const response = await apiClient.post('/students/import/preview', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const importConfirmAPIMock = async (
  _data: ImportConfirmRequest
): Promise<ImportConfirmResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('🧪 Mock: CSV confirm import');

  return {
    success: true,
    message: 'Importación completada exitosamente (mock)',
    summary: {
      students_created: 2,
      contacts_created: 2,
      contacts_linked: 0,
      courses_created: 1,
      courses_reused: 0,
      invites_queued: 2,
    },
  };
};

const importConfirmAPI = async (
  data: ImportConfirmRequest
): Promise<ImportConfirmResponse> => {
  if (MOCK_MODE) return importConfirmAPIMock(data);

  const response = await apiClient.post('/students/import/confirm', data);
  return response.data;
};

/**
 * Hook para subir CSV y obtener preview con validación
 */
export const useImportPreview = () => {
  return useMutation<ImportPreviewResponse, ApiError, ImportPreviewRequest>({
    mutationFn: importPreviewAPI,
    onError: (error) => {
      console.error('Error al obtener preview de CSV:', error);
    },
  });
};

/**
 * Hook para confirmar la importación con filas editadas
 */
export const useImportConfirm = () => {
  return useMutation<ImportConfirmResponse, ApiError, ImportConfirmRequest>({
    mutationFn: importConfirmAPI,
    onError: (error) => {
      console.error('Error al confirmar importación:', error);
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import { type HttpIndividualStaffMember } from '../types/staff';
import { type ApiError } from '../types/apiError';

const toggleStaffAPI = async ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}): Promise<void> => {
  await apiClient.patch(`staff/${id}/active`, { is_active });
};

export const useToggleStaff = () => {
  return useMutation<void, ApiError, { id: number; is_active: boolean }>({
    mutationFn: toggleStaffAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en cambiar el estatus del personal:', error);
    },
  });
};

const createStaffAPI = async (staffData: HttpIndividualStaffMember): Promise<void> => {
  await apiClient.post('staff', staffData);
};

export const useCreateStaff = () => {
  return useMutation<void, ApiError, HttpIndividualStaffMember>({
    mutationFn: createStaffAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en crear el usuario del personal:', error);
    },
  });
};

const updateStaffAPI = async (id: number, staffData: HttpIndividualStaffMember): Promise<void> => {
  await apiClient.patch(`staff/${id}`, staffData);
};

export const useUpdateStaff = () => {
  return useMutation<void, ApiError, { id: number; data: HttpIndividualStaffMember }>({
    mutationFn: ({ id, data }) => updateStaffAPI(id, data),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en actualizar el usuario del personal:', error);
    },
  });
};

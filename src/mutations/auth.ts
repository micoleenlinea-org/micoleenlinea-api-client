import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../config/axios';

import type {
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UserAPIResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '../types/auth';
import { type ApiError } from '../types/apiError';
import { MOCK_MODE } from '../config/mock';

const mockLoginResponse: LoginResponse = {
  token: 'mock-token-12345',
  user: {
    id: 1,
    dni: 12345678,
    name: 'Admin Test',
    email: 'admin@test.com',
    email_verified_at: null,
    role: 'admin',
    school_id: 1,
    is_active: true,
    phone: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

const loginAPIMock = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Aceptar cualquier credencial en modo mock
  console.log('🧪 Login mock con credenciales:', credentials.email);
  return mockLoginResponse;
};

// Función que hace la llamada HTTP al backend
export const loginAPI = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // 🧪 MODO TESTING
  if (MOCK_MODE) {
    return loginAPIMock(credentials);
  }
  
  // PRODUCCIÓN: API real
  const response = await apiClient.post<LoginResponse>('/login', credentials);
  return response.data;
};

export const forgotPasswordAPI = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/forgot-password', { email });
  return response.data;
};

export const validateResetTokenAPI = async (
  resetTokenRequest: ValidateTokenRequest
): Promise<ValidateTokenResponse> => {
  const response = await apiClient.post<ValidateTokenResponse>(
    '/validate-reset-token',
    resetTokenRequest
  );
  return response.data;
};

export const fetchMeAPI = async (token: string) => {
  if (!token) return null;
  
  // 🧪 MODO TESTING
  if (MOCK_MODE && token === 'mock-token-12345') {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLoginResponse.user;
  }
  
  // PRODUCCIÓN: API real
  const response = await apiClient.get('/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const resetPasswordAPI = async (
  resetPasswordRequest: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post<ResetPasswordResponse>(
    '/reset-password',
    resetPasswordRequest
  );
  return response.data;
};

export const validateSignupTokenAPI = async (
  signupTokenRequest: ValidateTokenRequest
): Promise<ValidateTokenResponse> => {
  const response = await apiClient.post<ValidateTokenResponse>(
    '/signup/verify/',
    signupTokenRequest
  );
  return response.data;
};

export const completeSignupAPI = async (
  completeSignupRequest: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post<ResetPasswordResponse>(
    '/signup/complete',
    completeSignupRequest
  );
  return response.data;
};

// Hook de React Query para usar en componentes
export const useLogin = () => {
  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: loginAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en login:', error);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: forgotPasswordAPI,
    onSuccess: () => {},
    onError: (error) => {
      // Manejo de error, por ejemplo mostrar un toast
      // Ejemplo: toast.error(error.response?.data?.message || 'Error al solicitar el reseteo');
      console.error('Error en forgot password:', error);
    },
  });
};

export const useValidateResetToken = () => {
  return useMutation<ValidateTokenResponse, ApiError, ValidateTokenRequest>({
    mutationFn: validateResetTokenAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en validate reset token:', error);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordRequest>({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en reset password:', error);
    },
  });
};

export const useFetchMe = () => {
  return useMutation<UserAPIResponse, ApiError, string>({
    mutationFn: fetchMeAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en fetchMe:', error);
    },
  });
};

export const useValidateSignupToken = () => {
  return useMutation<ValidateTokenResponse, ApiError, ValidateTokenRequest>({
    mutationFn: validateSignupTokenAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en validate signup token:', error);
    },
  });
};

export const useCompleteSignup = () => {
  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordRequest>({
    mutationFn: completeSignupAPI,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error en complete signup:', error);
    },
  });
};

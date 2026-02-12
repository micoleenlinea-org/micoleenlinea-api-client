import * as _tanstack_react_query from '@tanstack/react-query';
import { a as CreateAdminResponse, C as CreateAdminRequest, U as UpdateProfileRequest, l as UpdateProfileResponse, b as CreateSchoolResponse, S as SchoolRequest, k as SchoolResponse, d as ImportConfirmResponse, I as ImportConfirmRequest, f as ImportCsvResponse, e as ImportCsvRequest, h as ImportPreviewResponse, g as ImportPreviewRequest } from '../school-DWNwdIuv.js';
import { A as ApiError, y as ResetPasswordRequest, z as ResetPasswordResponse, L as LoginRequest, o as LoginResponse, W as UserAPIResponse, Y as ValidateTokenResponse, X as ValidateTokenRequest, H as HttpIndividualContact, V as UpdateCoursePayload, e as DeleteCourseResponse, R as ResendResponse, l as HttpIndividualStaffMember, m as HttpIndividualStudent } from '../student-B9T5q6Jr.js';

declare const resendAdminInviteAPI: (email: string) => Promise<{
    message: string;
}>;
declare const useCreateAdmin: () => _tanstack_react_query.UseMutationResult<CreateAdminResponse, ApiError, CreateAdminRequest, unknown>;
declare const useResendAdminInvite: () => _tanstack_react_query.UseMutationResult<{
    message: string;
}, ApiError, string, unknown>;

declare const loginAPI: (credentials: LoginRequest) => Promise<LoginResponse>;
declare const forgotPasswordAPI: (email: string) => Promise<{
    message: string;
}>;
declare const validateResetTokenAPI: (resetTokenRequest: ValidateTokenRequest) => Promise<ValidateTokenResponse>;
declare const fetchMeAPI: (token: string) => Promise<any>;
declare const resetPasswordAPI: (resetPasswordRequest: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
declare const validateSignupTokenAPI: (signupTokenRequest: ValidateTokenRequest) => Promise<ValidateTokenResponse>;
declare const completeSignupAPI: (completeSignupRequest: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
declare const useLogin: () => _tanstack_react_query.UseMutationResult<LoginResponse, ApiError, LoginRequest, unknown>;
declare const useForgotPassword: () => _tanstack_react_query.UseMutationResult<{
    message: string;
}, ApiError, string, unknown>;
declare const useValidateResetToken: () => _tanstack_react_query.UseMutationResult<ValidateTokenResponse, ApiError, ValidateTokenRequest, unknown>;
declare const useResetPassword: () => _tanstack_react_query.UseMutationResult<ResetPasswordResponse, ApiError, ResetPasswordRequest, unknown>;
declare const useFetchMe: () => _tanstack_react_query.UseMutationResult<UserAPIResponse, ApiError, string, unknown>;
declare const useValidateSignupToken: () => _tanstack_react_query.UseMutationResult<ValidateTokenResponse, ApiError, ValidateTokenRequest, unknown>;
declare const useCompleteSignup: () => _tanstack_react_query.UseMutationResult<ResetPasswordResponse, ApiError, ResetPasswordRequest, unknown>;

interface UpdateContactParams {
    id: number;
    student_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
}
declare const useCreateContact: () => _tanstack_react_query.UseMutationResult<void, ApiError, HttpIndividualContact, unknown>;
declare const useUpdateContact: () => _tanstack_react_query.UseMutationResult<void, ApiError, UpdateContactParams, unknown>;

interface CreateCoursePayload {
    name: string;
    description?: string;
}
interface CourseResponse {
    id: number;
    name: string;
    description: string | null;
    school_id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

declare const getMockCoursesStorage: () => CourseResponse[];
declare const useCreateCourse: () => _tanstack_react_query.UseMutationResult<CourseResponse, ApiError, CreateCoursePayload, unknown>;
interface UpdateCourseMutationPayload extends UpdateCoursePayload {
    id: number;
}
declare const useUpdateCourse: () => _tanstack_react_query.UseMutationResult<CourseResponse, ApiError, UpdateCourseMutationPayload, unknown>;
declare const useDeleteCourse: () => _tanstack_react_query.UseMutationResult<DeleteCourseResponse, ApiError, number, unknown>;

declare const useCreateNotification: () => _tanstack_react_query.UseMutationResult<void, ApiError, FormData, unknown>;
declare const useResendToPending: () => _tanstack_react_query.UseMutationResult<ResendResponse, ApiError, number, unknown>;

/**
 * Update user profile information
 */
declare const updateProfileAPI: (token: string, data: UpdateProfileRequest) => Promise<UpdateProfileResponse>;
/**
 * Hook to update user profile
 */
declare const useUpdateProfile: () => _tanstack_react_query.UseMutationResult<UpdateProfileResponse, ApiError, {
    token: string;
    data: UpdateProfileRequest;
}, unknown>;

declare const useCreateSchool: () => _tanstack_react_query.UseMutationResult<CreateSchoolResponse, ApiError, SchoolRequest, unknown>;
declare const useSetSchoolActive: () => _tanstack_react_query.UseMutationResult<void, ApiError, {
    id: number;
    is_active: boolean;
}, unknown>;
declare const useGetSchoolById: (id?: number) => _tanstack_react_query.UseQueryResult<SchoolResponse, ApiError>;

declare const useToggleStaff: () => _tanstack_react_query.UseMutationResult<void, ApiError, {
    id: number;
    is_active: boolean;
}, unknown>;
declare const useCreateStaff: () => _tanstack_react_query.UseMutationResult<void, ApiError, HttpIndividualStaffMember, unknown>;
declare const useUpdateStaff: () => _tanstack_react_query.UseMutationResult<void, ApiError, {
    id: number;
    data: HttpIndividualStaffMember;
}, unknown>;

interface StoredStudent {
    id: number;
    student: HttpIndividualStudent;
    contact: HttpIndividualContact;
    is_active: boolean;
}
declare const getMockStudentsStorage: () => StoredStudent[];
declare const useToggleContact: () => _tanstack_react_query.UseMutationResult<void, ApiError, {
    id: number;
    is_active: boolean;
}, unknown>;
declare const useCreateStudentWithContact: () => _tanstack_react_query.UseMutationResult<void, ApiError, {
    studentData: HttpIndividualStudent;
    contactData: HttpIndividualContact;
}, unknown>;
declare const useUpdateStudent: () => _tanstack_react_query.UseMutationResult<void, ApiError, {
    id: number;
    course_id: number;
    phone: string;
}, unknown>;
declare const useDeleteStudent: () => _tanstack_react_query.UseMutationResult<void, ApiError, number, unknown>;
declare const useImportCsv: () => _tanstack_react_query.UseMutationResult<ImportCsvResponse, ApiError, ImportCsvRequest, unknown>;
/**
 * Hook para subir CSV y obtener preview con validación
 */
declare const useImportPreview: () => _tanstack_react_query.UseMutationResult<ImportPreviewResponse, ApiError, ImportPreviewRequest, unknown>;
/**
 * Hook para confirmar la importación con filas editadas
 */
declare const useImportConfirm: () => _tanstack_react_query.UseMutationResult<ImportConfirmResponse, ApiError, ImportConfirmRequest, unknown>;

export { type CourseResponse, type CreateCoursePayload, DeleteCourseResponse, type UpdateCourseMutationPayload, UpdateCoursePayload, completeSignupAPI, fetchMeAPI, forgotPasswordAPI, getMockCoursesStorage, getMockStudentsStorage, loginAPI, resendAdminInviteAPI, resetPasswordAPI, updateProfileAPI, useCompleteSignup, useCreateAdmin, useCreateContact, useCreateCourse, useCreateNotification, useCreateSchool, useCreateStaff, useCreateStudentWithContact, useDeleteCourse, useDeleteStudent, useFetchMe, useForgotPassword, useGetSchoolById, useImportConfirm, useImportCsv, useImportPreview, useLogin, useResendAdminInvite, useResendToPending, useResetPassword, useSetSchoolActive, useToggleContact, useToggleStaff, useUpdateContact, useUpdateCourse, useUpdateProfile, useUpdateStaff, useUpdateStudent, useValidateResetToken, useValidateSignupToken, validateResetTokenAPI, validateSignupTokenAPI };

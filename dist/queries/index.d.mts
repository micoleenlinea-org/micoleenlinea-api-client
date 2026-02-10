import * as _tanstack_react_query from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query';
import { G as GetCourseResponse, A as ApiError, f as NotificationMetricsResponse, i as NotificationParams, l as NotificationResponse, w as HttpIndividualNotification, y as CourseWithContactsResponse, z as StudentWithContactsResponse, F as GetProvincesResponse, O as StaffQueryParams, K as StaffResponse, Q as HttpIndividualStaffMember, X as StudentsQueryParams, W as StudentsResponse, Y as HttpIndividualStudent, H as HttpIndividualContact, S as StudentContact } from '../student-BlylHHl6.mjs';
import * as _tanstack_query_core from '@tanstack/query-core';
import { G as GetSchoolsResponse, c as SuperAdminMetricsResponse, d as GetDashboardSchoolsResponse } from '../superadminDashboard-CLBSaiW-.mjs';

declare const useGetCoursesQuery: () => _tanstack_react_query.UseQueryResult<GetCourseResponse[], ApiError>;

declare const useGetNotificationsMetricsQuery: () => _tanstack_react_query.UseQueryResult<NotificationMetricsResponse, ApiError>;
declare const useGetNotificationsFromSchoolQuery: (params?: NotificationParams) => _tanstack_react_query.UseQueryResult<NotificationResponse, ApiError>;
declare const useGetNotificationsFromSchoolInfiniteQuery: (params?: Omit<NotificationParams, "offset">) => _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<any, unknown>, Error>;
declare const useGetNotificationByIdQuery: (id: number) => _tanstack_react_query.UseQueryResult<HttpIndividualNotification, ApiError>;
declare const useGetCoursesWithContactsQuery: () => _tanstack_react_query.UseQueryResult<CourseWithContactsResponse[], ApiError>;
declare const useGetStudentsWithContactsQuery: () => _tanstack_react_query.UseQueryResult<StudentWithContactsResponse[], ApiError>;

declare const useGetProvincesQuery: () => _tanstack_react_query.UseQueryResult<GetProvincesResponse, ApiError>;

declare const useGetStaff: (params?: StaffQueryParams, options?: UseQueryOptions<StaffResponse, ApiError>) => _tanstack_react_query.UseQueryResult<StaffResponse, ApiError>;
declare const useGetStaffById: (id: number) => _tanstack_react_query.UseQueryResult<HttpIndividualStaffMember, ApiError>;

declare const useGetStudents: (params?: StudentsQueryParams, options?: UseQueryOptions<StudentsResponse, ApiError>) => _tanstack_react_query.UseQueryResult<StudentsResponse, ApiError>;
declare const useGetStudentById: (id: number) => _tanstack_react_query.UseQueryResult<{
    student: HttpIndividualStudent;
    contact: HttpIndividualContact;
}, ApiError>;
declare const useGetStudentContacts: (studentId: number | null) => _tanstack_react_query.UseQueryResult<StudentContact[], ApiError>;

declare const useGetSchoolsQuery: (page: number, perPage: number) => _tanstack_react_query.UseQueryResult<GetSchoolsResponse, ApiError>;
declare const useGetSuperAdminMetricsQuery: () => _tanstack_react_query.UseQueryResult<SuperAdminMetricsResponse, ApiError>;
interface DashboardSchoolsParams {
    page: number;
    perPage: number;
    search?: string;
    isActive?: boolean;
}
declare const useGetDashboardSchoolsQuery: (params: DashboardSchoolsParams) => _tanstack_react_query.UseQueryResult<GetDashboardSchoolsResponse, ApiError>;

export { useGetCoursesQuery, useGetCoursesWithContactsQuery, useGetDashboardSchoolsQuery, useGetNotificationByIdQuery, useGetNotificationsFromSchoolInfiniteQuery, useGetNotificationsFromSchoolQuery, useGetNotificationsMetricsQuery, useGetProvincesQuery, useGetSchoolsQuery, useGetStaff, useGetStaffById, useGetStudentById, useGetStudentContacts, useGetStudents, useGetStudentsWithContactsQuery, useGetSuperAdminMetricsQuery };

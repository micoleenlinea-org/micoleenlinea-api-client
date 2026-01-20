import * as _tanstack_react_query from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query';
import { G as GetCourseResponse, A as ApiError, f as GetProvincesResponse, i as StaffQueryParams, h as StaffResponse, j as HttpIndividualStaffMember, m as StudentsQueryParams, l as StudentsResponse, n as HttpIndividualStudent, H as HttpIndividualContact, S as StudentContact } from '../student-CjivjBP1.js';
import * as _tanstack_query_core from '@tanstack/query-core';
import { a as NotificationMetricsResponse, c as NotificationParams, e as NotificationResponse, n as HttpIndividualNotification, p as CourseWithContactsResponse, q as StudentWithContactsResponse, G as GetSchoolsResponse } from '../superadminDashboard-IhjkYbPI.js';

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

export { useGetCoursesQuery, useGetCoursesWithContactsQuery, useGetNotificationByIdQuery, useGetNotificationsFromSchoolInfiniteQuery, useGetNotificationsFromSchoolQuery, useGetNotificationsMetricsQuery, useGetProvincesQuery, useGetSchoolsQuery, useGetStaff, useGetStaffById, useGetStudentById, useGetStudentContacts, useGetStudents, useGetStudentsWithContactsQuery };

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '../config/axios';
import type {
  CourseWithContactsResponse,
  HttpIndividualNotification,
  NotificationMetricsResponse,
  NotificationParams,
  NotificationResponse,
  StudentWithContactsResponse,
} from '../types/notification';
import type { ApiError } from '../types/apiError';

const getMetrics = async () => {
  const { data } = await apiClient.get('/notifications/metrics');
  return data;
};

const getNotificationsFromSchool = async (params?: NotificationParams) => {
  const defaultParams = { limit: 20, offset: 0 };

  const { data } = await apiClient.get('/notifications/school', {
    params: { ...defaultParams, ...params },
  });

  return data;
};

const getNotificationById = async (id: number) => {
  const { data } = await apiClient.get(`/notifications/${id}/preview`);
  return data;
};

const getCoursesWithContacts = async () => {
  const { data } = await apiClient.get('/notifications/courses-with-contacts');
  return data;
};

const getStudentsWithContacts = async () => {
  const { data } = await apiClient.get(`/notifications/students-with-contacts`);
  return data;
};

export const useGetNotificationsMetricsQuery = () => {
  return useQuery<NotificationMetricsResponse, ApiError>({
    queryKey: ['notifications', 'metrics'],
    queryFn: getMetrics,
    placeholderData: (prev) => prev,
  });
};

export const useGetNotificationsFromSchoolQuery = (params?: NotificationParams) => {
  return useQuery<NotificationResponse, ApiError>({
    queryKey: ['notifications', 'school', params],
    queryFn: () => getNotificationsFromSchool(params),
    placeholderData: (prev) => prev,
  });
};

export const useGetNotificationsFromSchoolInfiniteQuery = (
  params?: Omit<NotificationParams, 'offset'> // Exclude offset since we'll manage it
) => {
  const limit = params?.limit || 20;
  return useInfiniteQuery({
    queryKey: ['notifications', 'school', 'infinite', params],
    queryFn: ({ pageParam = 0 }) => {
      return getNotificationsFromSchool({
        limit,
        ...params,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage?.total || 0;

      // Calculate total items loaded so far
      const totalLoadedItems = allPages.reduce((acc, page) => {
        const pageData = page?.data || [];
        return acc + pageData.length;
      }, 0);

      // If we've loaded fewer items than exist in DB, load more
      if (totalLoadedItems < total) {
        const nextOffset = totalLoadedItems;
        return nextOffset;
      }

      return undefined;
    },
    initialPageParam: 0,
  });
};

export const useGetNotificationByIdQuery = (id: number) => {
  return useQuery<HttpIndividualNotification, ApiError>({
    queryKey: ['notifications', 'preview', id],
    queryFn: () => getNotificationById(id),
    placeholderData: (prev) => prev,
    enabled: !!id,
  });
};

export const useGetCoursesWithContactsQuery = () => {
  return useQuery<CourseWithContactsResponse[], ApiError>({
    queryKey: ['notifications', 'courses-with-contacts'],
    queryFn: getCoursesWithContacts,
    placeholderData: (prev) => prev,
  });
};

export const useGetStudentsWithContactsQuery = () => {
  return useQuery<StudentWithContactsResponse[], ApiError>({
    queryKey: ['notifications', 'students-with-contacts'],
    queryFn: getStudentsWithContacts,
    placeholderData: (prev) => prev,
  });
};

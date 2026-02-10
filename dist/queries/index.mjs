// src/queries/course.ts
import { useQuery } from "@tanstack/react-query";

// src/config/axios.ts
import axios from "axios";
var defaultStorageAdapter = {
  getItem: (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  }
};
var storageAdapter = defaultStorageAdapter;
var onUnauthorizedCallback = null;
var getBaseURL = () => {
  if (typeof window !== "undefined") {
    return import.meta.env?.VITE_API_URL || "http://localhost:8000/api";
  }
  return process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";
};
var apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 1e4
});
var cachedToken = null;
var getAuthToken = async () => {
  if (cachedToken) return cachedToken;
  const token = await storageAdapter.getItem("authToken");
  if (token) cachedToken = token;
  return token;
};
var clearAuthToken = async () => {
  cachedToken = null;
  await storageAdapter.removeItem("authToken");
};
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearAuthToken();
      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }
    const apiError = error.response?.data || { message: error.message || "Error de conexi\xF3n" };
    return Promise.reject(apiError);
  }
);

// src/mutations/course.ts
import { useMutation } from "@tanstack/react-query";

// src/config/mock.ts
var MOCK_MODE = false;

// src/mutations/course.ts
var MOCK_STORAGE_KEY = "mockCoursesStorage";
var getMockCoursesFromStorage = () => {
  try {
    const stored = localStorage.getItem(MOCK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
var getMockCoursesStorage = () => getMockCoursesFromStorage();

// src/queries/course.ts
var getCoursesMock = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getMockCoursesStorage();
};
var getCourses = async () => {
  if (MOCK_MODE) {
    return getCoursesMock();
  }
  const { data } = await apiClient.get("/courses");
  return data;
};
var useGetCoursesQuery = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    placeholderData: (prev) => prev
  });
};

// src/queries/notification.ts
import { useInfiniteQuery, useQuery as useQuery2 } from "@tanstack/react-query";
var getMetrics = async () => {
  const { data } = await apiClient.get("/notifications/metrics");
  return data;
};
var getNotificationsFromSchool = async (params) => {
  const defaultParams = { limit: 20, offset: 0 };
  const { data } = await apiClient.get("/notifications/school", {
    params: { ...defaultParams, ...params }
  });
  return data;
};
var getNotificationById = async (id) => {
  const { data } = await apiClient.get(`/notifications/${id}/preview`);
  return data;
};
var getCoursesWithContacts = async () => {
  const { data } = await apiClient.get("/notifications/courses-with-contacts");
  return data;
};
var getStudentsWithContacts = async () => {
  const { data } = await apiClient.get(`/notifications/students-with-contacts`);
  return data;
};
var useGetNotificationsMetricsQuery = () => {
  return useQuery2({
    queryKey: ["notifications", "metrics"],
    queryFn: getMetrics,
    placeholderData: (prev) => prev
  });
};
var useGetNotificationsFromSchoolQuery = (params) => {
  return useQuery2({
    queryKey: ["notifications", "school", params],
    queryFn: () => getNotificationsFromSchool(params),
    placeholderData: (prev) => prev
  });
};
var useGetNotificationsFromSchoolInfiniteQuery = (params) => {
  const limit = params?.limit || 20;
  return useInfiniteQuery({
    queryKey: ["notifications", "school", "infinite", params],
    queryFn: ({ pageParam = 0 }) => {
      return getNotificationsFromSchool({
        limit,
        ...params,
        offset: pageParam
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage?.total || 0;
      const totalLoadedItems = allPages.reduce((acc, page) => {
        const pageData = page?.data || [];
        return acc + pageData.length;
      }, 0);
      if (totalLoadedItems < total) {
        const nextOffset = totalLoadedItems;
        return nextOffset;
      }
      return void 0;
    },
    initialPageParam: 0
  });
};
var useGetNotificationByIdQuery = (id) => {
  return useQuery2({
    queryKey: ["notifications", "preview", id],
    queryFn: () => getNotificationById(id),
    placeholderData: (prev) => prev,
    enabled: !!id
  });
};
var useGetCoursesWithContactsQuery = () => {
  return useQuery2({
    queryKey: ["notifications", "courses-with-contacts"],
    queryFn: getCoursesWithContacts,
    placeholderData: (prev) => prev
  });
};
var useGetStudentsWithContactsQuery = () => {
  return useQuery2({
    queryKey: ["notifications", "students-with-contacts"],
    queryFn: getStudentsWithContacts,
    placeholderData: (prev) => prev
  });
};

// src/queries/provinces.ts
import { useQuery as useQuery3 } from "@tanstack/react-query";
var getProvinces = async () => {
  const { data } = await apiClient.get("/provinces");
  return data;
};
var useGetProvincesQuery = () => {
  return useQuery3({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    placeholderData: (prev) => prev
  });
};

// src/queries/staff.ts
import { useQuery as useQuery4 } from "@tanstack/react-query";
var getStaffAPI = async (params = {}) => {
  const defaultParams = { page: 1, per_page: 10 };
  const response = await apiClient.get("/staff", {
    params: { ...defaultParams, ...params }
  });
  return response.data;
};
var getStaffByIdAPI = async (id) => {
  const response = await apiClient.get(`/staff/${id}`);
  return response.data;
};
var useGetStaff = (params, options) => {
  const merged = { page: 1, per_page: 10, ...params ?? {} };
  const queryKey = ["staff", merged.page, merged.per_page, merged.q ?? ""];
  const placeholder = {
    current_page: merged.page,
    data: [],
    first_page_url: void 0,
    last_page: void 0,
    per_page: merged.per_page,
    total: 0
  };
  const defaultOptions = {
    keepPreviousData: true,
    placeholderData: placeholder,
    staleTime: 6e4,
    enabled: options?.enabled ?? true
  };
  return useQuery4({
    queryKey,
    queryFn: () => getStaffAPI(merged),
    ...defaultOptions,
    ...options
  });
};
var useGetStaffById = (id) => {
  return useQuery4({
    queryKey: ["staff", id],
    queryFn: () => getStaffByIdAPI(id),
    enabled: !!id
  });
};

// src/queries/student.ts
import { useQuery as useQuery5 } from "@tanstack/react-query";

// src/mutations/student.ts
import { useMutation as useMutation2 } from "@tanstack/react-query";
var MOCK_STUDENTS_STORAGE_KEY = "mockStudentsStorage";
var getMockStudentsFromStorage = () => {
  try {
    const stored = localStorage.getItem(MOCK_STUDENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
var getMockStudentsStorage = () => getMockStudentsFromStorage();

// src/queries/student.ts
var getStudentsAPIMock = async (params = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const students = getMockStudentsStorage();
  const courses = getMockCoursesStorage();
  const mappedData = students.map((s) => {
    const course = courses.find((c) => c.id === s.student.course_id);
    return {
      id: s.id,
      name: `${s.student.first_name} ${s.student.last_name}`,
      dni: s.student.dni,
      birth_date: s.student.birth_date instanceof Date ? s.student.birth_date.toISOString().split("T")[0] : s.student.birth_date,
      course: course?.name || "Sin curso",
      contacts: 1,
      contact_phone: s.contact.phone || "",
      contact_email: s.contact.email || "",
      contact_name: `${s.contact.first_name} ${s.contact.last_name}`,
      is_active: s.is_active
    };
  });
  let filteredData = mappedData;
  if (params.q) {
    const searchTerm = params.q.toLowerCase();
    filteredData = mappedData.filter(
      (s) => s.name.toLowerCase().includes(searchTerm) || s.dni.toString().includes(searchTerm) || s.course.toLowerCase().includes(searchTerm) || s.contact_email.toLowerCase().includes(searchTerm)
    );
  }
  const page = params.page || 1;
  const perPage = params.per_page || 10;
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);
  return {
    current_page: page,
    data: paginatedData,
    first_page_url: void 0,
    last_page: Math.ceil(filteredData.length / perPage) || 1,
    per_page: perPage,
    total: filteredData.length
  };
};
var getStudentByIdAPIMock = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    student: {
      id,
      first_name: "Juan",
      last_name: "P\xE9rez",
      dni: 12345678,
      birth_date: /* @__PURE__ */ new Date("2010-05-15"),
      course_id: 1
    },
    contact: {
      first_name: "Mar\xEDa",
      last_name: "P\xE9rez",
      email: "maria@example.com",
      phone: "+54 9 11 1234-5678"
    }
  };
};
var getStudentsAPI = async (params = {}) => {
  if (MOCK_MODE) return getStudentsAPIMock(params);
  const defaultParams = { page: 1, per_page: 10 };
  const response = await apiClient.get("/students", {
    params: { ...defaultParams, ...params }
  });
  return response.data;
};
var getStudentByIdAPI = async (id) => {
  if (MOCK_MODE) return getStudentByIdAPIMock(id);
  const response = await apiClient.get(`/students/${id}`);
  return response.data;
};
var useGetStudents = (params, options) => {
  const merged = { page: 1, per_page: 10, ...params ?? {} };
  const queryKey = ["students", merged.page, merged.per_page, merged.q ?? ""];
  const placeholder = {
    current_page: merged.page,
    data: [],
    first_page_url: void 0,
    last_page: void 0,
    per_page: merged.per_page,
    total: 0
  };
  const defaultOptions = {
    keepPreviousData: true,
    placeholderData: placeholder,
    staleTime: 6e4,
    enabled: options?.enabled ?? true
  };
  return useQuery5({
    queryKey,
    queryFn: () => getStudentsAPI(merged),
    ...defaultOptions,
    ...options
  });
};
var useGetStudentById = (id) => {
  return useQuery5({
    queryKey: ["students", id],
    queryFn: () => getStudentByIdAPI(id),
    enabled: !!id
  });
};
var getStudentContactsMock = async (studentId) => {
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
      is_active: true
    }
  ];
};
var getStudentContactsAPI = async (studentId) => {
  if (MOCK_MODE) return getStudentContactsMock(studentId);
  const response = await apiClient.get(`/students/${studentId}/contacts`);
  return response.data;
};
var useGetStudentContacts = (studentId) => {
  return useQuery5({
    queryKey: ["students", studentId, "contacts"],
    queryFn: () => getStudentContactsAPI(studentId),
    enabled: !!studentId
  });
};

// src/queries/superadminDashboard.ts
import { useQuery as useQuery6 } from "@tanstack/react-query";
var getSchools = async (page, perPage) => {
  const { data } = await apiClient.get("/schools", {
    params: { page, per_page: perPage }
  });
  return data;
};
var useGetSchoolsQuery = (page, perPage) => {
  return useQuery6({
    queryKey: ["schools", page, perPage],
    queryFn: () => getSchools(page, perPage),
    placeholderData: (prev) => prev
  });
};
var getSuperAdminMetrics = async () => {
  const { data } = await apiClient.get("/schools/superadmin-metrics");
  return data;
};
var useGetSuperAdminMetricsQuery = () => {
  return useQuery6({
    queryKey: ["superadmin", "metrics"],
    queryFn: getSuperAdminMetrics
  });
};
var getDashboardSchools = async (params) => {
  const { data } = await apiClient.get("/schools/dashboard", {
    params: {
      page: params.page,
      per_page: params.perPage,
      search: params.search || void 0,
      is_active: params.isActive
    }
  });
  return data;
};
var useGetDashboardSchoolsQuery = (params) => {
  return useQuery6({
    queryKey: ["superadmin", "dashboard-schools", params],
    queryFn: () => getDashboardSchools(params),
    placeholderData: (prev) => prev
  });
};
export {
  useGetCoursesQuery,
  useGetCoursesWithContactsQuery,
  useGetDashboardSchoolsQuery,
  useGetNotificationByIdQuery,
  useGetNotificationsFromSchoolInfiniteQuery,
  useGetNotificationsFromSchoolQuery,
  useGetNotificationsMetricsQuery,
  useGetProvincesQuery,
  useGetSchoolsQuery,
  useGetStaff,
  useGetStaffById,
  useGetStudentById,
  useGetStudentContacts,
  useGetStudents,
  useGetStudentsWithContactsQuery,
  useGetSuperAdminMetricsQuery
};
//# sourceMappingURL=index.mjs.map
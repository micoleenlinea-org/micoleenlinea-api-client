"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/mutations/index.ts
var mutations_exports = {};
__export(mutations_exports, {
  completeSignupAPI: () => completeSignupAPI,
  fetchMeAPI: () => fetchMeAPI,
  forgotPasswordAPI: () => forgotPasswordAPI,
  getMockCoursesStorage: () => getMockCoursesStorage,
  getMockStudentsStorage: () => getMockStudentsStorage,
  loginAPI: () => loginAPI,
  resendAdminInviteAPI: () => resendAdminInviteAPI,
  resetPasswordAPI: () => resetPasswordAPI,
  updateProfileAPI: () => updateProfileAPI,
  useCompleteSignup: () => useCompleteSignup,
  useCreateAdmin: () => useCreateAdmin,
  useCreateContact: () => useCreateContact,
  useCreateContactStandalone: () => useCreateContactStandalone,
  useCreateCourse: () => useCreateCourse,
  useCreateNotification: () => useCreateNotification,
  useCreateSchool: () => useCreateSchool,
  useCreateStaff: () => useCreateStaff,
  useCreateStudentWithContact: () => useCreateStudentWithContact,
  useDeleteCourse: () => useDeleteCourse,
  useDeleteStudent: () => useDeleteStudent,
  useFetchMe: () => useFetchMe,
  useForgotPassword: () => useForgotPassword,
  useGetSchoolById: () => useGetSchoolById,
  useImportConfirm: () => useImportConfirm,
  useImportCsv: () => useImportCsv,
  useImportPreview: () => useImportPreview,
  useLogin: () => useLogin,
  useResendAdminInvite: () => useResendAdminInvite,
  useResendToPending: () => useResendToPending,
  useResetPassword: () => useResetPassword,
  useSetSchoolActive: () => useSetSchoolActive,
  useToggleContact: () => useToggleContact,
  useToggleStaff: () => useToggleStaff,
  useUpdateContact: () => useUpdateContact,
  useUpdateCourse: () => useUpdateCourse,
  useUpdateProfile: () => useUpdateProfile,
  useUpdateStaff: () => useUpdateStaff,
  useUpdateStudent: () => useUpdateStudent,
  useValidateResetToken: () => useValidateResetToken,
  useValidateSignupToken: () => useValidateSignupToken,
  validateResetTokenAPI: () => validateResetTokenAPI,
  validateSignupTokenAPI: () => validateSignupTokenAPI
});
module.exports = __toCommonJS(mutations_exports);

// src/mutations/admin.ts
var import_react_query = require("@tanstack/react-query");

// src/config/axios.ts
var import_axios = __toESM(require("axios"));
var import_meta = {};
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
    return import_meta.env?.VITE_API_URL || "http://localhost:8000/api";
  }
  return process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";
};
var apiClient = import_axios.default.create({
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

// src/mutations/admin.ts
var createAdminAPI = async (admin) => {
  try {
    const response = await apiClient.post("/admins", admin);
    return response.data;
  } catch (err) {
    const error = err;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {}
    };
  }
};
var resendAdminInviteAPI = async (email) => {
  const response = await apiClient.post("/admins/resend-invite", { email });
  return response.data;
};
var useCreateAdmin = () => {
  return (0, import_react_query.useMutation)({
    mutationFn: createAdminAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear administrador:", error);
    }
  });
};
var useResendAdminInvite = () => {
  return (0, import_react_query.useMutation)({
    mutationFn: resendAdminInviteAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error al reenviar invitaci\xF3n de administrador:", error);
    }
  });
};

// src/mutations/auth.ts
var import_react_query2 = require("@tanstack/react-query");

// src/config/mock.ts
var MOCK_MODE = false;

// src/mutations/auth.ts
var mockLoginResponse = {
  token: "mock-token-12345",
  user: {
    id: 1,
    dni: 12345678,
    name: "Admin Test",
    email: "admin@test.com",
    email_verified_at: null,
    role: "admin",
    school_id: 1,
    is_active: true,
    phone: null,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }
};
var loginAPIMock = async (credentials) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.log("\u{1F9EA} Login mock con credenciales:", credentials.email);
  return mockLoginResponse;
};
var loginAPI = async (credentials) => {
  if (MOCK_MODE) {
    return loginAPIMock(credentials);
  }
  const response = await apiClient.post("/login", credentials);
  return response.data;
};
var forgotPasswordAPI = async (email) => {
  const response = await apiClient.post("/forgot-password", { email });
  return response.data;
};
var validateResetTokenAPI = async (resetTokenRequest) => {
  const response = await apiClient.post(
    "/validate-reset-token",
    resetTokenRequest
  );
  return response.data;
};
var fetchMeAPI = async (token) => {
  if (!token) return null;
  if (MOCK_MODE && token === "mock-token-12345") {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockLoginResponse.user;
  }
  const response = await apiClient.get("/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
var resetPasswordAPI = async (resetPasswordRequest) => {
  const response = await apiClient.post(
    "/reset-password",
    resetPasswordRequest
  );
  return response.data;
};
var validateSignupTokenAPI = async (signupTokenRequest) => {
  const response = await apiClient.post(
    "/signup/verify/",
    signupTokenRequest
  );
  return response.data;
};
var completeSignupAPI = async (completeSignupRequest) => {
  const response = await apiClient.post(
    "/signup/complete",
    completeSignupRequest
  );
  return response.data;
};
var useLogin = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: loginAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en login:", error);
    }
  });
};
var useForgotPassword = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: forgotPasswordAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en forgot password:", error);
    }
  });
};
var useValidateResetToken = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: validateResetTokenAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en validate reset token:", error);
    }
  });
};
var useResetPassword = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en reset password:", error);
    }
  });
};
var useFetchMe = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: fetchMeAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en fetchMe:", error);
    }
  });
};
var useValidateSignupToken = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: validateSignupTokenAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en validate signup token:", error);
    }
  });
};
var useCompleteSignup = () => {
  return (0, import_react_query2.useMutation)({
    mutationFn: completeSignupAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en complete signup:", error);
    }
  });
};

// src/mutations/contact.ts
var import_react_query3 = require("@tanstack/react-query");
var createContactAPI = async (contact) => {
  try {
    const response = await apiClient.post(
      `/students/${contact.student_id}/contacts`,
      contact
    );
    return response.data;
  } catch (err) {
    const error = err;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {}
    };
  }
};
var updateContactAPI = async (params) => {
  try {
    await apiClient.patch(
      `/students/${params.student_id}/contacts/${params.id}`,
      {
        first_name: params.first_name,
        last_name: params.last_name,
        dni: params.dni,
        email: params.email,
        phone: params.phone || ""
      }
    );
  } catch (err) {
    const error = err;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {}
    };
  }
};
var createContactStandaloneAPI = async (data) => {
  try {
    const response = await apiClient.post("/contacts", data);
    return response.data;
  } catch (err) {
    const error = err;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {}
    };
  }
};
var useCreateContact = () => {
  return (0, import_react_query3.useMutation)({
    mutationFn: createContactAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear contacto:", error);
    }
  });
};
var useUpdateContact = () => {
  return (0, import_react_query3.useMutation)({
    mutationFn: updateContactAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en actualizar contacto:", error);
    }
  });
};
var useCreateContactStandalone = () => {
  return (0, import_react_query3.useMutation)({
    mutationFn: createContactStandaloneAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear contacto standalone:", error);
    }
  });
};

// src/mutations/course.ts
var import_react_query4 = require("@tanstack/react-query");
var MOCK_STORAGE_KEY = "mockCoursesStorage";
var getMockCoursesFromStorage = () => {
  try {
    const stored = localStorage.getItem(MOCK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
var saveMockCoursesToStorage = (courses) => {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error("Error guardando cursos en localStorage:", error);
  }
};
var createCourseMock = async (course) => {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  const mockCoursesStorage = getMockCoursesFromStorage();
  const duplicate = mockCoursesStorage.find(
    (c) => c.name.toLowerCase() === course.name.toLowerCase()
  );
  if (duplicate) {
    throw {
      message: "El curso ya existe",
      errors: {
        name: ["Ya existe un curso con ese nombre."]
      }
    };
  }
  const newCourse = {
    id: Math.floor(Math.random() * 1e3) + 1,
    name: course.name,
    description: course.description || null,
    school_id: 1,
    is_active: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  mockCoursesStorage.push(newCourse);
  saveMockCoursesToStorage(mockCoursesStorage);
  return newCourse;
};
var getMockCoursesStorage = () => getMockCoursesFromStorage();
var createCourseAPI = async (course) => {
  if (MOCK_MODE) return createCourseMock(course);
  const response = await apiClient.post("/courses", course);
  return response.data;
};
var useCreateCourse = () => {
  return (0, import_react_query4.useMutation)({
    mutationFn: createCourseAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error al crear curso:", error);
    }
  });
};
var updateCourseMock = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const mockCoursesStorage = getMockCoursesFromStorage();
  const courseIndex = mockCoursesStorage.findIndex((c) => c.id === payload.id);
  if (courseIndex === -1) {
    throw { message: "Curso no encontrado" };
  }
  if (payload.name) {
    const duplicate = mockCoursesStorage.find(
      (c) => c.id !== payload.id && c.name.toLowerCase() === payload.name.toLowerCase()
    );
    if (duplicate) {
      throw {
        message: "Ya existe un curso con ese nombre.",
        errors: { name: ["Ya existe un curso con ese nombre."] }
      };
    }
  }
  const updatedCourse = {
    ...mockCoursesStorage[courseIndex],
    ...payload.name !== void 0 && { name: payload.name },
    ...payload.description !== void 0 && { description: payload.description },
    ...payload.is_active !== void 0 && { is_active: payload.is_active },
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  mockCoursesStorage[courseIndex] = updatedCourse;
  saveMockCoursesToStorage(mockCoursesStorage);
  return updatedCourse;
};
var updateCourseAPI = async (payload) => {
  if (MOCK_MODE) return updateCourseMock(payload);
  const { id, ...data } = payload;
  const response = await apiClient.patch(`/courses/${id}`, data);
  return response.data;
};
var useUpdateCourse = () => {
  return (0, import_react_query4.useMutation)({
    mutationFn: updateCourseAPI,
    onError: (error) => {
      console.error("Error al actualizar curso:", error);
    }
  });
};
var deleteCourseMock = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const mockCoursesStorage = getMockCoursesFromStorage();
  const courseIndex = mockCoursesStorage.findIndex((c) => c.id === id);
  if (courseIndex === -1) {
    throw { message: "Curso no encontrado" };
  }
  mockCoursesStorage.splice(courseIndex, 1);
  saveMockCoursesToStorage(mockCoursesStorage);
  return { message: "Curso eliminado exitosamente" };
};
var deleteCourseAPI = async (id) => {
  if (MOCK_MODE) return deleteCourseMock(id);
  const response = await apiClient.delete(`/courses/${id}`);
  return response.data;
};
var useDeleteCourse = () => {
  return (0, import_react_query4.useMutation)({
    mutationFn: deleteCourseAPI,
    onError: (error) => {
      console.error("Error al eliminar curso:", error);
    }
  });
};

// src/mutations/notification.ts
var import_react_query5 = require("@tanstack/react-query");
var createNotificationApi = async (notificationData) => {
  try {
    const { data } = await apiClient.post("/notifications", notificationData);
    return data;
  } catch (err) {
    const error = err;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {}
    };
  }
};
var useCreateNotification = () => {
  return (0, import_react_query5.useMutation)({
    mutationFn: createNotificationApi,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error creating notification:", error);
    }
  });
};
var resendToPendingApi = async (notificationId) => {
  try {
    const { data } = await apiClient.post(`/notifications/${notificationId}/resend-pending`);
    return data;
  } catch (err) {
    const error = err;
    throw {
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors || {}
    };
  }
};
var useResendToPending = () => {
  const queryClient = (0, import_react_query5.useQueryClient)();
  return (0, import_react_query5.useMutation)({
    mutationFn: resendToPendingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};

// src/mutations/profile.ts
var import_react_query6 = require("@tanstack/react-query");
var updateProfileAPI = async (token, data) => {
  const response = await apiClient.put("/me", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
var useUpdateProfile = () => {
  return (0, import_react_query6.useMutation)({
    mutationFn: ({ token, data }) => updateProfileAPI(token, data),
    onSuccess: () => {
      console.log("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    }
  });
};

// src/mutations/school.ts
var import_react_query7 = require("@tanstack/react-query");
var createSchoolAPI = async (school) => {
  const response = await apiClient.post("/schools", school);
  return response.data;
};
var useCreateSchool = () => {
  return (0, import_react_query7.useMutation)({
    mutationFn: createSchoolAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear escuela:", error);
    }
  });
};
var setSchoolActiveAPI = async ({
  id,
  is_active
}) => {
  await apiClient.patch(`/schools/${id}/active`, { is_active });
};
var useSetSchoolActive = () => {
  return (0, import_react_query7.useMutation)({
    mutationFn: setSchoolActiveAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en cambiar el status de la escuela:", error);
    }
  });
};
var getSchoolByIdAPI = async (id) => {
  const response = await apiClient.get(`/schools/${id}`);
  return response.data;
};
var useGetSchoolById = (id) => {
  return (0, import_react_query7.useQuery)({
    queryKey: ["school", id],
    queryFn: () => getSchoolByIdAPI(id),
    enabled: !!id
  });
};

// src/mutations/staff.ts
var import_react_query8 = require("@tanstack/react-query");
var toggleStaffAPI = async ({
  id,
  is_active
}) => {
  await apiClient.patch(`staff/${id}/active`, { is_active });
};
var useToggleStaff = () => {
  return (0, import_react_query8.useMutation)({
    mutationFn: toggleStaffAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en cambiar el estatus del personal:", error);
    }
  });
};
var createStaffAPI = async (staffData) => {
  await apiClient.post("staff", staffData);
};
var useCreateStaff = () => {
  return (0, import_react_query8.useMutation)({
    mutationFn: createStaffAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear el usuario del personal:", error);
    }
  });
};
var updateStaffAPI = async (id, staffData) => {
  await apiClient.patch(`staff/${id}`, staffData);
};
var useUpdateStaff = () => {
  return (0, import_react_query8.useMutation)({
    mutationFn: ({ id, data }) => updateStaffAPI(id, data),
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en actualizar el usuario del personal:", error);
    }
  });
};

// src/mutations/student.ts
var import_react_query9 = require("@tanstack/react-query");
var MOCK_STUDENTS_STORAGE_KEY = "mockStudentsStorage";
var getMockStudentsFromStorage = () => {
  try {
    const stored = localStorage.getItem(MOCK_STUDENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
var saveMockStudentsToStorage = (students) => {
  try {
    localStorage.setItem(MOCK_STUDENTS_STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Error guardando estudiantes en localStorage:", error);
  }
};
var toggleContactAPIMock = async ({
  id,
  is_active
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const students = getMockStudentsFromStorage();
  const student = students.find((s) => s.id === id);
  if (student) {
    student.is_active = is_active;
    saveMockStudentsToStorage(students);
  }
  console.log(`\u{1F9EA} Mock: Toggle contact ${id} to ${is_active}`);
};
var createStudentWithContactAPIMock = async (studentData, contactData) => {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  const students = getMockStudentsFromStorage();
  const newStudent = {
    id: Math.floor(Math.random() * 1e4) + 1,
    student: { ...studentData, id: Math.floor(Math.random() * 1e4) + 1 },
    contact: contactData,
    is_active: true
  };
  students.push(newStudent);
  saveMockStudentsToStorage(students);
  console.log("\u{1F9EA} Mock: Estudiante creado:", newStudent);
};
var updateStudentAPIMock = async (id, data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const students = getMockStudentsFromStorage();
  const student = students.find((s) => s.id === id);
  if (student) {
    if (data.course_id !== void 0) student.student.course_id = data.course_id;
    if (data.phone !== void 0) student.contact.phone = data.phone;
    if (data.first_name !== void 0) student.student.first_name = data.first_name;
    if (data.last_name !== void 0) student.student.last_name = data.last_name;
    saveMockStudentsToStorage(students);
  }
  console.log(`\u{1F9EA} Mock: Estudiante ${id} actualizado`, data);
};
var deleteStudentAPIMock = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const students = getMockStudentsFromStorage();
  const filtered = students.filter((s) => s.id !== id);
  saveMockStudentsToStorage(filtered);
  console.log(`\u{1F9EA} Mock: Estudiante ${id} eliminado`);
};
var importCsvAPIMock = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  console.log("\u{1F9EA} Mock: CSV importado:", data.file.name);
  return {
    message: "Archivo procesado exitosamente (mock)",
    students_created: 5,
    contacts_created: 5,
    summary: {
      total_rows: 10,
      students: 5,
      contacts: 5
    }
  };
};
var getMockStudentsStorage = () => getMockStudentsFromStorage();
var toggleContactAPI = async ({
  id,
  is_active
}) => {
  if (MOCK_MODE) return toggleContactAPIMock({ id, is_active });
  await apiClient.patch(`students/${id}/contacts/toggle`, { is_active });
};
var createStudentWithContactAPI = async (studentData, contactData) => {
  if (MOCK_MODE) return createStudentWithContactAPIMock(studentData, contactData);
  await apiClient.post("/students", { student: studentData, contact: contactData });
};
var updateStudentAPI = async ({ id, ...data }) => {
  if (MOCK_MODE) return updateStudentAPIMock(id, data);
  await apiClient.patch(`/students/${id}`, data);
};
var deleteStudentAPI = async (id) => {
  if (MOCK_MODE) return deleteStudentAPIMock(id);
  await apiClient.delete(`/students/${id}`);
};
var importCsvAPI = async (data) => {
  if (MOCK_MODE) return importCsvAPIMock(data);
  const formData = new FormData();
  formData.append("file", data.file);
  const response = await apiClient.post("/students/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};
var useToggleContact = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: toggleContactAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en cambiar el estatus del contacto del estudiante:", error);
    }
  });
};
var useCreateStudentWithContact = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: ({ studentData, contactData }) => createStudentWithContactAPI(studentData, contactData),
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear estudiante con contacto:", error);
    }
  });
};
var useUpdateStudent = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: updateStudentAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en actualizar estudiante:", error);
    }
  });
};
var useDeleteStudent = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: deleteStudentAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en eliminar estudiante:", error);
    }
  });
};
var useImportCsv = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: importCsvAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error al importar CSV:", error);
    }
  });
};
var importPreviewAPIMock = async (_data) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("\u{1F9EA} Mock: CSV preview");
  const mockRows = [
    {
      dni: "12345678",
      nombre: "Juan",
      apellido: "Perez",
      fecha_nacimiento: "15/03/2015",
      curso: "1ro A",
      dni_contacto: "20345678",
      nombre_contacto: "Maria",
      apellido_contacto: "Perez",
      email_contacto: "maria@email.com",
      telefono_contacto: "1123456789",
      _rowIndex: 1,
      _errors: [],
      _isValid: true
    },
    {
      dni: "87654321",
      nombre: "Ana",
      apellido: "Garcia",
      fecha_nacimiento: "22/07/2016",
      curso: "1ro A",
      dni_contacto: "21456789",
      nombre_contacto: "Pedro",
      apellido_contacto: "Garcia",
      email_contacto: "pedro@email.com",
      telefono_contacto: "1198765432",
      _rowIndex: 2,
      _errors: [],
      _isValid: true
    },
    {
      dni: "1234",
      nombre: "Error",
      apellido: "Test",
      fecha_nacimiento: "01/01/2015",
      curso: "2do B",
      dni_contacto: "123",
      nombre_contacto: "Test",
      apellido_contacto: "Contact",
      email_contacto: "invalid-email",
      telefono_contacto: "123",
      _rowIndex: 3,
      _errors: ["DNI debe tener 7-8 d\xEDgitos num\xE9ricos", "DNI del contacto debe tener 7-8 d\xEDgitos", "Email inv\xE1lido", "Tel\xE9fono debe tener 10 d\xEDgitos"],
      _isValid: false
    }
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
      existing_courses: 0
    }
  };
};
var importPreviewAPI = async (data) => {
  if (MOCK_MODE) return importPreviewAPIMock(data);
  const formData = new FormData();
  formData.append("file", data.file);
  const response = await apiClient.post("/students/import/preview", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};
var importConfirmAPIMock = async (_data) => {
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  console.log("\u{1F9EA} Mock: CSV confirm import");
  return {
    success: true,
    message: "Importaci\xF3n completada exitosamente (mock)",
    summary: {
      students_created: 2,
      contacts_created: 2,
      contacts_linked: 0,
      courses_created: 1,
      courses_reused: 0,
      invites_queued: 2
    }
  };
};
var importConfirmAPI = async (data) => {
  if (MOCK_MODE) return importConfirmAPIMock(data);
  const response = await apiClient.post("/students/import/confirm", data);
  return response.data;
};
var useImportPreview = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: importPreviewAPI,
    onError: (error) => {
      console.error("Error al obtener preview de CSV:", error);
    }
  });
};
var useImportConfirm = () => {
  return (0, import_react_query9.useMutation)({
    mutationFn: importConfirmAPI,
    onError: (error) => {
      console.error("Error al confirmar importaci\xF3n:", error);
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  completeSignupAPI,
  fetchMeAPI,
  forgotPasswordAPI,
  getMockCoursesStorage,
  getMockStudentsStorage,
  loginAPI,
  resendAdminInviteAPI,
  resetPasswordAPI,
  updateProfileAPI,
  useCompleteSignup,
  useCreateAdmin,
  useCreateContact,
  useCreateContactStandalone,
  useCreateCourse,
  useCreateNotification,
  useCreateSchool,
  useCreateStaff,
  useCreateStudentWithContact,
  useDeleteCourse,
  useDeleteStudent,
  useFetchMe,
  useForgotPassword,
  useGetSchoolById,
  useImportConfirm,
  useImportCsv,
  useImportPreview,
  useLogin,
  useResendAdminInvite,
  useResendToPending,
  useResetPassword,
  useSetSchoolActive,
  useToggleContact,
  useToggleStaff,
  useUpdateContact,
  useUpdateCourse,
  useUpdateProfile,
  useUpdateStaff,
  useUpdateStudent,
  useValidateResetToken,
  useValidateSignupToken,
  validateResetTokenAPI,
  validateSignupTokenAPI
});
//# sourceMappingURL=index.js.map
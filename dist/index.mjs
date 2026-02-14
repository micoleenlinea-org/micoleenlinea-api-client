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
var configureStorage = (adapter) => {
  storageAdapter = adapter;
};
var configureOnUnauthorized = (callback) => {
  onUnauthorizedCallback = callback;
};
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
var configureApiBaseURL = (url) => {
  apiClient.defaults.baseURL = url;
};
var cachedToken = null;
var setAuthToken = async (token) => {
  cachedToken = token;
  await storageAdapter.setItem("authToken", token);
};
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

// src/config/mock.ts
var MOCK_MODE = false;

// src/types/notification.ts
var NotificationType = /* @__PURE__ */ ((NotificationType2) => {
  NotificationType2["CONTACT"] = "contact";
  NotificationType2["CONTACTS"] = "contacts";
  NotificationType2["COURSES"] = "courses";
  NotificationType2["INSTITUTIONAL"] = "institutional";
  return NotificationType2;
})(NotificationType || {});

// src/mutations/admin.ts
import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: createAdminAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear administrador:", error);
    }
  });
};
var useResendAdminInvite = () => {
  return useMutation({
    mutationFn: resendAdminInviteAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error al reenviar invitaci\xF3n de administrador:", error);
    }
  });
};

// src/mutations/auth.ts
import { useMutation as useMutation2 } from "@tanstack/react-query";
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
  return useMutation2({
    mutationFn: loginAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en login:", error);
    }
  });
};
var useForgotPassword = () => {
  return useMutation2({
    mutationFn: forgotPasswordAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en forgot password:", error);
    }
  });
};
var useValidateResetToken = () => {
  return useMutation2({
    mutationFn: validateResetTokenAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en validate reset token:", error);
    }
  });
};
var useResetPassword = () => {
  return useMutation2({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en reset password:", error);
    }
  });
};
var useFetchMe = () => {
  return useMutation2({
    mutationFn: fetchMeAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en fetchMe:", error);
    }
  });
};
var useValidateSignupToken = () => {
  return useMutation2({
    mutationFn: validateSignupTokenAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en validate signup token:", error);
    }
  });
};
var useCompleteSignup = () => {
  return useMutation2({
    mutationFn: completeSignupAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en complete signup:", error);
    }
  });
};

// src/mutations/contact.ts
import { useMutation as useMutation3 } from "@tanstack/react-query";
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
  return useMutation3({
    mutationFn: createContactAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear contacto:", error);
    }
  });
};
var useUpdateContact = () => {
  return useMutation3({
    mutationFn: updateContactAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en actualizar contacto:", error);
    }
  });
};
var useCreateContactStandalone = () => {
  return useMutation3({
    mutationFn: createContactStandaloneAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear contacto standalone:", error);
    }
  });
};

// src/mutations/course.ts
import { useMutation as useMutation4 } from "@tanstack/react-query";
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
  return useMutation4({
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
  return useMutation4({
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
  return useMutation4({
    mutationFn: deleteCourseAPI,
    onError: (error) => {
      console.error("Error al eliminar curso:", error);
    }
  });
};

// src/mutations/notification.ts
import { useMutation as useMutation5, useQueryClient } from "@tanstack/react-query";
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
  return useMutation5({
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
  const queryClient = useQueryClient();
  return useMutation5({
    mutationFn: resendToPendingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};

// src/mutations/profile.ts
import { useMutation as useMutation6 } from "@tanstack/react-query";
var updateProfileAPI = async (token, data) => {
  const response = await apiClient.put("/me", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
var useUpdateProfile = () => {
  return useMutation6({
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
import { useMutation as useMutation7, useQuery } from "@tanstack/react-query";
var createSchoolAPI = async (school) => {
  const response = await apiClient.post("/schools", school);
  return response.data;
};
var useCreateSchool = () => {
  return useMutation7({
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
  return useMutation7({
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
  return useQuery({
    queryKey: ["school", id],
    queryFn: () => getSchoolByIdAPI(id),
    enabled: !!id
  });
};

// src/mutations/staff.ts
import { useMutation as useMutation8 } from "@tanstack/react-query";
var toggleStaffAPI = async ({
  id,
  is_active
}) => {
  await apiClient.patch(`staff/${id}/active`, { is_active });
};
var useToggleStaff = () => {
  return useMutation8({
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
  return useMutation8({
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
  return useMutation8({
    mutationFn: ({ id, data }) => updateStaffAPI(id, data),
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en actualizar el usuario del personal:", error);
    }
  });
};

// src/mutations/student.ts
import { useMutation as useMutation9 } from "@tanstack/react-query";
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
var updateStudentAPIMock = async (id, course_id, phone) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const students = getMockStudentsFromStorage();
  const student = students.find((s) => s.id === id);
  if (student) {
    student.student.course_id = course_id;
    student.contact.phone = phone;
    saveMockStudentsToStorage(students);
  }
  console.log(`\u{1F9EA} Mock: Estudiante ${id} actualizado con curso ${course_id}`);
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
var updateStudentAPI = async (id, course_id, phone) => {
  if (MOCK_MODE) return updateStudentAPIMock(id, course_id, phone);
  await apiClient.patch(`/students/${id}`, { course_id, phone });
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
  return useMutation9({
    mutationFn: toggleContactAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en cambiar el estatus del contacto del estudiante:", error);
    }
  });
};
var useCreateStudentWithContact = () => {
  return useMutation9({
    mutationFn: ({ studentData, contactData }) => createStudentWithContactAPI(studentData, contactData),
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en crear estudiante con contacto:", error);
    }
  });
};
var useUpdateStudent = () => {
  return useMutation9({
    mutationFn: ({ id, course_id, phone }) => updateStudentAPI(id, course_id, phone),
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en actualizar estudiante:", error);
    }
  });
};
var useDeleteStudent = () => {
  return useMutation9({
    mutationFn: deleteStudentAPI,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Error en eliminar estudiante:", error);
    }
  });
};
var useImportCsv = () => {
  return useMutation9({
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
  return useMutation9({
    mutationFn: importPreviewAPI,
    onError: (error) => {
      console.error("Error al obtener preview de CSV:", error);
    }
  });
};
var useImportConfirm = () => {
  return useMutation9({
    mutationFn: importConfirmAPI,
    onError: (error) => {
      console.error("Error al confirmar importaci\xF3n:", error);
    }
  });
};

// src/queries/course.ts
import { useQuery as useQuery2 } from "@tanstack/react-query";
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
  return useQuery2({
    queryKey: ["courses"],
    queryFn: getCourses,
    placeholderData: (prev) => prev
  });
};

// src/queries/notification.ts
import { useInfiniteQuery, useQuery as useQuery3 } from "@tanstack/react-query";
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
  return useQuery3({
    queryKey: ["notifications", "metrics"],
    queryFn: getMetrics,
    placeholderData: (prev) => prev
  });
};
var useGetNotificationsFromSchoolQuery = (params) => {
  return useQuery3({
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
  return useQuery3({
    queryKey: ["notifications", "preview", id],
    queryFn: () => getNotificationById(id),
    placeholderData: (prev) => prev,
    enabled: !!id
  });
};
var useGetCoursesWithContactsQuery = () => {
  return useQuery3({
    queryKey: ["notifications", "courses-with-contacts"],
    queryFn: getCoursesWithContacts,
    placeholderData: (prev) => prev
  });
};
var useGetStudentsWithContactsQuery = () => {
  return useQuery3({
    queryKey: ["notifications", "students-with-contacts"],
    queryFn: getStudentsWithContacts,
    placeholderData: (prev) => prev
  });
};

// src/queries/provinces.ts
import { useQuery as useQuery4 } from "@tanstack/react-query";
var getProvinces = async () => {
  const { data } = await apiClient.get("/provinces");
  return data;
};
var useGetProvincesQuery = () => {
  return useQuery4({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    placeholderData: (prev) => prev
  });
};

// src/queries/staff.ts
import { useQuery as useQuery5 } from "@tanstack/react-query";
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
  return useQuery5({
    queryKey,
    queryFn: () => getStaffAPI(merged),
    ...defaultOptions,
    ...options
  });
};
var useGetStaffById = (id) => {
  return useQuery5({
    queryKey: ["staff", id],
    queryFn: () => getStaffByIdAPI(id),
    enabled: !!id
  });
};

// src/queries/student.ts
import { useQuery as useQuery6 } from "@tanstack/react-query";
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
  return useQuery6({
    queryKey,
    queryFn: () => getStudentsAPI(merged),
    ...defaultOptions,
    ...options
  });
};
var useGetStudentById = (id) => {
  return useQuery6({
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
  return useQuery6({
    queryKey: ["students", studentId, "contacts"],
    queryFn: () => getStudentContactsAPI(studentId),
    enabled: !!studentId
  });
};

// src/queries/superadminDashboard.ts
import { useQuery as useQuery7 } from "@tanstack/react-query";
var getSchools = async (page, perPage) => {
  const { data } = await apiClient.get("/schools", {
    params: { page, per_page: perPage }
  });
  return data;
};
var useGetSchoolsQuery = (page, perPage) => {
  return useQuery7({
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
  return useQuery7({
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
  return useQuery7({
    queryKey: ["superadmin", "dashboard-schools", params],
    queryFn: () => getDashboardSchools(params),
    placeholderData: (prev) => prev
  });
};

// src/utils/errorLogger.ts
var isDevelopment = () => {
  if (typeof __DEV__ !== "undefined") return __DEV__;
  if (typeof process !== "undefined" && process.env?.NODE_ENV) {
    return process.env.NODE_ENV !== "production";
  }
  return true;
};
var logError = ({ message, error, context }) => {
  if (isDevelopment()) {
    console.error("Error:", message);
    console.error("Details:", error);
    if (context) {
      console.error("Context:", context);
    }
  }
};

// src/utils/notificationMapper.ts
var mapNotificationType = (apiType) => {
  switch (apiType.toLowerCase()) {
    case "info":
    case "information":
      return "info";
    case "warning":
    case "warn":
      return "warning";
    case "error":
    case "danger":
      return "error";
    case "success":
      return "success";
    default:
      return "info";
  }
};

// src/utils/transformations.ts
var transformDniToNumber = (dni) => {
  return Number(dni.replace(/\./g, ""));
};
var transformDniToString = (dni) => {
  const dniStr = dni.toString().padStart(8, "0");
  return `${dniStr.slice(0, 2)}.${dniStr.slice(2, 5)}.${dniStr.slice(5)}`;
};
export {
  MOCK_MODE,
  NotificationType,
  apiClient,
  clearAuthToken,
  completeSignupAPI,
  configureApiBaseURL,
  configureOnUnauthorized,
  configureStorage,
  fetchMeAPI,
  forgotPasswordAPI,
  getAuthToken,
  getMockCoursesStorage,
  getMockStudentsStorage,
  logError,
  loginAPI,
  mapNotificationType,
  resendAdminInviteAPI,
  resetPasswordAPI,
  setAuthToken,
  transformDniToNumber,
  transformDniToString,
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
  useGetCoursesQuery,
  useGetCoursesWithContactsQuery,
  useGetDashboardSchoolsQuery,
  useGetNotificationByIdQuery,
  useGetNotificationsFromSchoolInfiniteQuery,
  useGetNotificationsFromSchoolQuery,
  useGetNotificationsMetricsQuery,
  useGetProvincesQuery,
  useGetSchoolById,
  useGetSchoolsQuery,
  useGetStaff,
  useGetStaffById,
  useGetStudentById,
  useGetStudentContacts,
  useGetStudents,
  useGetStudentsWithContactsQuery,
  useGetSuperAdminMetricsQuery,
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
};
//# sourceMappingURL=index.mjs.map
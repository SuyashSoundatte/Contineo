import axios from "axios";

export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/",
  VERSION: import.meta.env.VITE_API_VERSION || "api/v1"
};

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

const api = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// ⏩ **Reusable API Request Function**
export const apiRequest = async (method, endpoint, data = null, requiresAuth = false) => {
  try {
    let headers = {};

    if (requiresAuth) {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found. Please log in again.");
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const response = await api({
      method,
      url: endpoint,
      data,
      headers,
    });

    return response.data.data; // Standardized return
  } catch (error) {
    throw error.response?.data?.message || "API request failed.";
  }
};

export const fetchStudents = async () => apiRequest("GET", API.STUDENTS, null, true);

export const fetchStudentByRoll = async (mobile) =>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getStuByRoll/${mobile}`, null, true);

export const fetchStudentResult = async (mobile) =>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getStuByRoll/${mobile}`, null, true);

export const createStudent = async (data)=>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/getStuByRoll`, data, true)

export const loginUser = async (loginType, credentials) => {
  const endpoint =
    loginType === "user"
      ? `${API.BASE_URL}${API.VERSION}/login`
      : `${API.BASE_URL}${API.VERSION}/parentLogin`;

  return apiRequest("POST", endpoint, credentials, false);
};

export const logoutUser = async () => {
  try {
    await apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/logout`, null, true);
    localStorage.removeItem("token");
    return true; // Indicate successful logout
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const createUser = async (data)=>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/createUser`, data, true);

export const fileUpload = async(data) =>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/upload`, data, true);

export const getStudentByStandardDivision = async(endpoint) =>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}${endpoint}`, null, true);

export const attendanceStudent = async(data)=>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/attendaceStudent`, data, true);

export const getAllClassTeacher = async()=>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getAllClassTeacher`, null, true);

export const assignClassTeacherByStdDiv = async(data)=>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/assignClassTeacherByStdDiv`, data, true);

export const getAllMentors = async()=>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getAllMentors`, null, true);

export const assignMentorByStandardDivision = async(data)=>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/assignMentorByStdDiv`, data, true);

export const getAllStudents = async()=>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getAllStudents`, null, true);

export const assignMultipleStudentByDivsionStandard = async(data)=>
  apiRequest(METHOD.POST, `${API.BASE_URL}${API.VERSION}/assignMultipleStudentByDivStd`, data, true);

export const getStudentById = async (parmas) => 
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getStudentId/${parmas}`, null, true);

export const getAllTeacher = async () => 
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getAllTeacher`, null, true);

export const addSubjectData = async(data)=>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/addSubjectData`, data, true);

export const getSyllabus = async()=>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getSyllabus`, null, true);

export const getTeacherByAllocation = async()=>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getTeacherByAllocation`, null, true);

export const allocateTeacherSubject = async(data)=>
  apiRequest(METHOD.PUT, `${API.BASE_URL}${API.VERSION}/allocateTeacherSubject`, data, true);

export const getAllUsers = async() =>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getAllUsers`, null, true);

export const getTeacherById = async(params) =>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getTeacherById/${params}`, null, true);

export const getUserById = async(params) =>
  apiRequest(METHOD.GET, `${API.BASE_URL}${API.VERSION}/getUserById/${params}`, null, true);
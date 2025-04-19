import axios from "axios";

// Define API endpoints
const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  STUDENTS: import.meta.env.VITE_STUDENT_API || "/getAllStudents",
  LOGIN: import.meta.env.VITE_AUTH_API || "/login",
  PARENT_LOGIN: import.meta.env.VITE_PARENT_LOGIN || "/parentLogin",
  STUDENT_BY_ROLL: import.meta.env.VITE_STUDENT_BY_ROLL || "/getStuByRoll",
};


// Create a reusable Axios instance
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

// **Fetch Students API Function**
export const fetchStudents = async () => apiRequest("GET", API.STUDENTS, null, true);

// **Fetch Student by Roll API Function**
export const fetchStudentByRoll = async (mobile) =>
  apiRequest("GET", `${API.STUDENT_BY_ROLL}/${mobile}`, null, true);

// **Fetch Student Result API Function**
export const fetchStudentResult = async (mobile) =>
  apiRequest("GET", `${API.STUDENT_BY_ROLL}/${mobile}`, null, true);


export const loginUser = async (loginType, credentials) => {
  const endpoint =
    loginType === "user"
      ? `${API.BASE_URL}${API.LOGIN}`
      : `${API.BASE_URL}${API.PARENT_LOGIN}`;

  return apiRequest("POST", endpoint, credentials, false);
};


// **Logout API Function**
export const logoutUser = async () => {
  try {
    await apiRequest("GET", "/logout", null, true);
    localStorage.removeItem("token");
    return true; // Indicate successful logout
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};


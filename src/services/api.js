import axios from "axios";

// Define API endpoints
const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  STUDENTS: import.meta.env.VITE_STUDENT_API,
  LOGIN: "/login",
  PARENT_LOGIN: "/parentLogin",
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

export const loginUser = async (loginType, credentials) => {
  const endpoint = loginType === "user" ? API.LOGIN : API.PARENT_LOGIN;
  return apiRequest("POST", endpoint, credentials, false);
};

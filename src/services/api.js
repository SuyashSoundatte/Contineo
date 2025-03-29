import axios from "axios";

const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  STUDENTS: import.meta.env.VITE_STUDENT_API,
};

// Create an Axios instance
export const api = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch students with token authentication
export const fetchStudents = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }

    const response = await api.get(API.STUDENTS, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data; // Return data directly
  } catch (error) {
    throw error.response?.data?.message || "Error fetching data"; // Standardize error handling
  }
};

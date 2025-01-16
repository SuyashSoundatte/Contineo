import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

const Dashboard = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <aside className="bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl fixed h-screen w-48 md:w-56 lg:w-64 py-6 px-3 overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400 tracking-wide">Dashboard</h1>
      </div>
      <nav className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-300 px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50">
            User
          </h2>
          <ul className="ml-4 space-y-2">
            <Link to="/MainPage/UserForm">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                User Create Form
              </li>
            </Link>
            <Link to="/MainPage/StudentCreate">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Student Create Form
              </li>
            </Link>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-300 px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50">
            Student
          </h2>
          <ul className="ml-4 space-y-2">
            <Link to="/MainPage/StudentMasterForm">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Student Master Form
              </li>
            </Link>
            <Link to="/MainPage/StudentAllocate">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Student Allocate Form
              </li>
            </Link>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-300 px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50">
            Teacher
          </h2>
          <ul className="ml-4 space-y-2">
            <Link to="/MainPage/TeacherForm">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Teacher Master Form
              </li>
            </Link>
            <Link to="/MainPage/TeacherAllocate">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Teacher Allocate Form
              </li>
            </Link>
            <Link to="/MainPage/ClassTeacherForm">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Class Teacher Allocate
              </li>
            </Link>
            <Link to="/MainPage/MentorAllocate">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Mentor Allocate Form
              </li>
            </Link>
            <Link to="/MainPage/SubjectAllocate">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Subject Allocate Form
              </li>
            </Link>
            <Link to="/MainPage/SubjectForm">
              <li className="px-3 py-2 text-gray-300 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-200">
                Subject Master Form
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      <div className="absolute bottom-4 left-3 right-3">
        <ButtonComponent
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
          onClick={handleLogout}
        >
          Log Out
        </ButtonComponent>
      </div>
    </aside>
  );
};

export default Dashboard;


import React, { useEffect, useState, useCallback } from "react";
import Dashboard from "../../components/Dashboard";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";

const MainPage = () => {
  const { isLoggedIn, setIsLoggedIn, role, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect if not logged in
    } else if (role === "parent" && !location.pathname.startsWith("/parent")) {
      navigate("/parent/dashboard"); // Redirect parents to their dashboard
    } else if (role === "user" && !location.pathname.startsWith("/user")) {
      navigate("/user/dashboard"); // Redirect users to their dashboard
    }
  }, [isLoggedIn, role, navigate, location]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const renderFormCard = (title, description, link) => (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out'>
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-indigo-600 mb-3'>{title}</h2>
        <p className='text-gray-600 mb-4'>{description}</p>
      </div>
      <div className='bg-gray-50 px-6 py-4'>
        <Link
          to={link}
          className='inline-block w-full text-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out'
        >
          Go to {title}
        </Link>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen overflow-hidden mt-14 lg:mt-0'>
      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 w-64 bg-white shadow-xl z-40 lg:translate-x-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:h-auto`}
      >
        <Dashboard />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className='flex-1 lg:ml-94 overflow-y-auto'>
        {/* Mobile toggle button */}
        <button
          className='fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md lg:hidden'
          onClick={toggleSidebar}
          aria-label='Toggle sidebar'
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {location.pathname === "/MainPage" ? (
          <div className='container mx-auto px-4 sm:px-6 py-8'>
            <header className='mb-10 text-center'>
              <h1 className='text-3xl sm:text-4xl font-bold text-indigo-700 mb-2'>
                Academics Management System
              </h1>
              <p className='text-lg sm:text-xl text-gray-600'>
                Manage Users, Students, Teachers, and More
              </p>
            </header>
            {/* Render Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
              {renderFormCard(
                "Staff Create",
                "Create new users for the system with roles and permissions.",
                "/MainPage/UserForm"
              )}
              {renderFormCard(
                "Student Create",
                "Add new students with details like name, roll number, and class.",
                "/MainPage/StudentCreate"
              )}
              {renderFormCard(
                "Student Allocation",
                "Allocate students to different classes or groups.",
                "/MainPage/StudentAllocate"
              )}
              {renderFormCard(
                "Teacher Allocation",
                "Allocate teachers to classes and subjects as per timetable.",
                "/MainPage/TeacherAllocate"
              )}
              {renderFormCard(
                "Class Teacher Allocation",
                "Assign teachers as class teachers for student management.",
                "/MainPage/ClassTeacherForm"
              )}
              {renderFormCard(
                "Mentor Allocation",
                "Allocate mentors to guide students in specific subjects.",
                "/MainPage/MentorAllocate"
              )}
              {renderFormCard(
                "Subject Master",
                "Manage subjects and assign them to teachers.",
                "/MainPage/SubjectForm"
              )}
              {renderFormCard(
                "Attendance",
                "Manage and track student attendance.",
                "/MainPage/AttendanceForm"
              )}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default MainPage;

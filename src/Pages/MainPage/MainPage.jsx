import React, { useEffect, useState, useCallback } from "react"
import Dashboard from "../../components/Dashboard"
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Menu, X } from "lucide-react"

const MainPage = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) navigate("/login")
  }, [isLoggedIn, navigate])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  const renderFormCard = (title, description, link) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-3">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <Link
          to={link}
          className="inline-block w-full text-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
        >
          Go to {title}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Dashboard />
      </div>

      <main className="flex-1 overflow-x-hidden overflow-y-auto min-h-screen w-full">
        {location.pathname === "/MainPage" ? (
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <header className="mb-10 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">Academics Management System</h1>
              <p className="text-lg sm:text-xl text-gray-600">Manage Users, Students, Teachers, and More</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {renderFormCard(
                "Staff Create",
                "Create new users for the system with roles and permissions.",
                "/MainPage/UserForm",
              )}
              {renderFormCard(
                "Student Create",
                "Add new students with details like name, roll number, and class.",
                "/MainPage/StudentCreate",
              )}
              {renderFormCard(
                "Student Allocation",
                "Allocate students to different classes or groups.",
                "/MainPage/StudentAllocate",
              )}
              {renderFormCard(
                "Teacher Allocation",
                "Allocate teachers to classes and subjects as per timetable.",
                "/MainPage/TeacherAllocate",
              )}
              {renderFormCard(
                "Class Teacher Allocation",
                "Assign teachers as class teachers for student management.",
                "/MainPage/ClassTeacherForm",
              )}
              {renderFormCard(
                "Mentor Allocation",
                "Allocate mentors to guide students in specific subjects.",
                "/MainPage/MentorAllocate",
              )}
              {renderFormCard(
                "Subject Master",
                "Manage subjects and assign them to teachers.",
                "/MainPage/SubjectForm",
              )}
              {renderFormCard("Attendance", "Manage and track student attendance.", "/MainPage/AttendanceForm")}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  )
}

export default MainPage


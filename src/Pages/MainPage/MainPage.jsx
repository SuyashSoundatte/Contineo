import React, { useEffect } from "react"
import Dashboard from "../../components/Dashboard"
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const MainPage = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) navigate("/login")
  }, [isLoggedIn, navigate])

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
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <Dashboard />
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {location.pathname === "/MainPage" ? (
          <div className="container mx-auto px-6 py-8">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-indigo-700 mb-2">Academics Management System</h1>
              <p className="text-xl text-gray-600">Manage Users, Students, Teachers, and More</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  )
}

export default MainPage


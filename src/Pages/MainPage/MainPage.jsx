import React,{useContext, useEffect} from "react";
import Dashboard from "../../components/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MainPage = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoggedIn)
        navigate("/login")
  },[isLoggedIn])
  console.log(isLoggedIn)

  const renderFormCard = (title, description, link) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-3">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link}
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Go to {title}
      </Link>
    </div>
  );


  return (
    <div className="flex h-screen">
      <aside className="w-48 md:w-56 lg:w-64 bg-white shadow-md">
        {/* Sidebar content */}
        <Dashboard />
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        {/* Main content */}
        {location.pathname === '/MainPage' ?  (
          <div className="flex flex-col h-screen bg-gray-300 p-6 w-full">
          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-4xl font-semibold text-indigo-600">Exam Management System</h1>
            <p className="text-lg text-gray-700 mt-2">Manage Users, Students, Teachers, and More</p>
          </header>
  
          {/* Forms Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderFormCard(
              "User Create Form",
              "Create new users for the system. This form allows adding users with roles and permissions.",
              "/MainPage/UserForm"
            )}
  
            {renderFormCard(
              "/MainPage/StudentCreate",
              "Add new students to the system with details like name, roll number, and class.",
              "/StudentCreate"
            )}
  
            {renderFormCard(
              "Student Master Form",
              "View and manage the list of all students in the system, including their details.",
              "/MainPage/StudentMasterForm"
            )}
  
            {renderFormCard(
              "Student Allocation Form",
              "Allocate students to different classes or groups based on specific criteria.",
              "/MainPage/StudentAllocate"
            )}
  
            {renderFormCard(
              "Teacher Master Form",
              "View and manage all teachers in the system, including their roles and classes assigned.",
              "/MainPage/TeacherForm"
            )}
  
            {renderFormCard(
              "Teacher Allocation Form",
              "Allocate teachers to different classes and subjects as per the timetable.",
              "/MainPage/TeacherAllocate"
            )}
  
            {renderFormCard(
              "Class Teacher Allocation Form",
              "Allocate teachers as class teachers to specific classes for overall student management.",
              "/MainPage/ClassTeacherForm"
            )}
  
            {renderFormCard(
              "Subject Allocation Form",
              "Allocate subjects to teachers for specific classes based on their expertise.",
              "/MainPage/SubjectAllocate"
            )}
  
            {renderFormCard(
              "Mentor Allocate Form",
              "Allocate mentors to guide students in specific subjects.",
              "/MainPage/MentorInchargeAllocate"
            )}
  
            {renderFormCard(
              "Subject Master Form",
              "Manage subjects available in the system and assign them to teachers.",
              "/MainPage/SubjectForm"
            )}
          </div>
        </div>
        ) : <Outlet />}
      </main>
    </div>
  );
};

export default MainPage;

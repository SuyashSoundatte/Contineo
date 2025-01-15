import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Login");
    }
  }, [isLoggedIn]);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Logout logic
      await axios.get("http://localhost:3000/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      // Log out user by setting isLoggedIn to false
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <aside className='bg-gray-800 text-white shadow-md fixed h-screen py-8 px-1'>
      <div className='py-4 px-6'>
        <h1 className='text-2xl font-semibold text-blue-400'>Dashboard</h1>
      </div>
      <nav className='mt-4'>
        <ul>
          <li className='group'>
            <div className='px-6 py-3 text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-all rounded-lg '>
              <span className='text-lg font-medium '>User</span>
            </div>
            <ul className='ml-4 text-sm mt-1 space-y-1'>
              <Link to='/MainPage/UserForm'>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  User Create Form
                </li>
              </Link>
              <Link to='/MainPage/StudentCreate'>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Student Create Form
                </li>
              </Link>
            </ul>
          </li>
          <li className='group'>
            <div className='px-6 py-3 text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-all rounded-lg '>
              <span className='text-lg font-medium'>Teacher</span>
            </div>
            <ul className='ml-4 text-sm mt-1 space-y-1'>
              <Link to='/MainPage/TeacherForm'>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Teacher Master Form
                </li>
              </Link>
              <Link to='/MainPage/SubjectForm'>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Subject Master Form
                </li>
              </Link>
              <Link to='/MainPage/TeacherAllocate'>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Teacher Allocate Form
                </li>
              </Link>
              <Link to='/MainPage/StudentAllocate'>
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Student Allocate Form
                </li>
              </Link>
              <Link to='/MainPage/MentorAllocate'>  
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Mentor Allocate Form
                </li>
              </Link>
              <Link to='/MainPage/SubjectAllocate'>  
                <li className='px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg '>
                  Subject Allocate Form
                </li>
              </Link>
            </ul>
          </li>
        </ul>
      </nav>
      <ButtonComponent className='absolute bottom-4 w-3/4 ' onClick={handleLogout}>
        Log Out
      </ButtonComponent>
    </aside>
  );
};

export default Dashboard;

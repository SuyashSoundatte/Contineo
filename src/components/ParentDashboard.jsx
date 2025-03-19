import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ButtonComponent } from "./component.js";

const ParentDashboard = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `block px-3 py-2 text-gray-300 rounded-md transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "hover:bg-blue-600 hover:text-white"
    }`;

  return (
    <div className='h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl overflow-y-auto'>
      <div className='py-6 px-3'>
        <div className='mb-8'>
          <h1 className='mt-10 lg:mt-0  text-2xl font-bold text-blue-400 tracking-wide'>
            Dashboard
          </h1>
        </div>
        <nav className='space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold text-gray-300 px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50'>
              Academics
            </h2>
            <ul className='ml-4 space-y-2'>
              <li>
                <Link
                  to='/parent'
                  className={linkClass("/parent")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/parent/StudentMarks'
                  className={linkClass("/parent/StudentMarks")}
                >
                  Test Marks
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <ButtonComponent
              className='w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200'
              onClick={handleLogout}
            >
              Log Out
            </ButtonComponent>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ParentDashboard;

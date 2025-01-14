import React from "react";
import Dashboard from "../../components/Dashboard";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const MainPage = () => {
  
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  return (
    <>
      <div className='w-full flex'>
        <div className='left w-[20%] h-screen'>
          <Dashboard setisLoggedIn={setIsLoggedIn} />
        </div>
        <div className='right w-[80%] h-screen flex justify-center items-center '>
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

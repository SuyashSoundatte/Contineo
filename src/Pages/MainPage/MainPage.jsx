import React from "react";
import Dashboard from "../../components/Dashboard";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div className='w-full flex'>
        <div className='left w-[20%] h-screen'>
          <Dashboard />
        </div>
        <div className='right w-[80%] h-screen flex justify-center items-center '>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

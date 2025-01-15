import React,{useContext, useEffect} from "react";
import Dashboard from "../../components/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import { use } from "react";
const MainPage = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoggedIn)
        navigate("/login")
  },[isLoggedIn])
  console.log(isLoggedIn)
  return (
    <>
      {/* <div className='w-full flex'>
        <div className='left w-[20%] h-screen'>
          <Dashboard />
        </div>
        <div className='right w-[80%] h-screen flex justify-center items-center '>
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div> */}
      <div className="flex h-screen bg-gray-100">
      <aside className="w-48 bg-white shadow-md">
        <Dashboard />
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
    </>
  );
};

export default MainPage;

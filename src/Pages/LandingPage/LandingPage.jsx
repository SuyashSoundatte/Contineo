import React, { useEffect, useState } from "react";
import { Login, MainPage } from "../page.js";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LandingPage = () => {
  const { isLoggedIn, setisLoggedIn } = useAuth();

  useEffect(()=>{
    if(isLoggedIn){
      setisLoggedIn(true)
    }
  })

  return (
    <div className="w-full bg-zinc-100 h-screen flex items-center justify-center">
      {/* {isLoggedIn ? <MainPage /> : <Login setisLoggedIn={setisLoggedIn} />} */}
    </div>
  );
};

export default LandingPage;

import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className='w-full bg-zinc-400 h-screen'>{isLoggedIn ? <Login /> : <Register />}</div>
    </>
  );
};

export default LandingPage;

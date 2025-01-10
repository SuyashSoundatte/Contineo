import React, { useState } from "react";
import { Login, MainPage } from "../page.js";
const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <div className='w-full bg-zinc-100 h-screen flex items-center justify-center'>
        {isLoggedIn ? <MainPage /> : <Login />}
      </div>
    </>
  );
};

export default LandingPage;

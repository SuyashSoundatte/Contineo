import React, { useState } from "react";
import { Login, MainPage } from "../page.js";

const LandingPage = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <div className="w-full bg-zinc-100 h-screen flex items-center justify-center">
      {isLoggedIn ? <MainPage /> : <Login setisLoggedIn={setisLoggedIn} />}
    </div>
  );
};

export default LandingPage;

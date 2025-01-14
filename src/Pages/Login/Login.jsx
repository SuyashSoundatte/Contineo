import React, { useState, useEffect } from "react";
import { Input, Button } from "../../components/component.js";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedIn(true);
    }
  }, [setisLoggedIn]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,  
        }
      );

      console.log("Login Response:", response.data);
      const data = response.data.data.token;
      localStorage.setItem("token", data);
      setisLoggedIn(true);
  
      
    } catch (err) {
      console.error("Error during login:", err);
    }
  };
  

  return (
    <div className="loginForm flex items-center justify-center h-screen">
      <div className="registerForm flex flex-col items-center gap-4">
        <form
          className="bg-zinc-50 px-4 py-4 flex flex-col gap-6"
          onSubmit={loginHandler} // Correct event handler binding
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

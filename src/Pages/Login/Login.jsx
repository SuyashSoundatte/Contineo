import React, { useState, useEffect } from "react";
import { Input, ButtonComponent } from "../../components/component.js";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/MainPage");
    }
  }, [isLoggedIn, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

      const data = response.data.data.token;
      localStorage.setItem("token", data);
      setIsLoggedIn(true);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Error during login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginForm flex items-center justify-center h-screen">
      <div className="registerForm flex flex-col items-center gap-4">
        <form
          className="bg-zinc-50 px-4 py-4 flex flex-col gap-6"
          onSubmit={loginHandler} 
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
          <ButtonComponent type="submit">Login</ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default Login;

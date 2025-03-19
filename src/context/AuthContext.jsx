import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mobile, setMobile] = useState(localStorage.getItem("mobile") || ""); // Persist mobile
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedmobile = localStorage.getItem("mobile");
    
    setIsLoggedIn(!!token);
    if (storedmobile) setMobile(storedmobile); // Restore mobile on refresh

    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginType");
    localStorage.removeItem("mobile"); // Clear mobile on logout
    setIsLoggedIn(false);
    setMobile("");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Prevents flickering
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, mobile, setMobile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

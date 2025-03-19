import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState(localStorage.getItem("phone") || ""); // Persist phone
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedPhone = localStorage.getItem("phone");
    
    setIsLoggedIn(!!token);
    if (storedPhone) setPhone(storedPhone); // Restore phone on refresh

    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginType");
    localStorage.removeItem("phone"); // Clear phone on logout
    setIsLoggedIn(false);
    setPhone("");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Prevents flickering
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, phone, setPhone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

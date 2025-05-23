import { useState, useEffect } from "react";
import { Input, ButtonComponent } from "../../components/component.js";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState(localStorage.getItem("loginType") || "user");

  const { mobile, setMobile, isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedLoginType = localStorage.getItem("loginType");
      navigate(storedLoginType === "parent" ? "/parent" : "/MainPage");
    }
  }, [isLoggedIn, navigate]);

  // Login handler function
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credentials =
        loginType === "user" ? { email, password } : { mobile, password };

      const data = await loginUser(loginType, credentials);
      const token = data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("loginType", loginType);

      if (loginType === "parent") {
        localStorage.setItem("mobile", mobile);
      }

      login(token);
    } catch (err) {
      setError(err || "Invalid credentials. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex w-full border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                loginType === "user" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => {
                setLoginType("user");
                localStorage.setItem("loginType", "user");
              }}
            >
              Login as User
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                loginType === "parent" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => {
                setLoginType("parent");
                localStorage.setItem("loginType", "parent");
              }}
            >
              Login as Parent
            </button>
          </div>

          <div className="p-6">
            <form className="space-y-6" onSubmit={loginHandler}>
              {loginType === "user" ? (
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile || ""} // Prevent uncontrolled input warnings
                  onChange={(e) => setMobile(e.target.value)}
                />
              )}

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>}

              <div className="pt-2">
                <ButtonComponent
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

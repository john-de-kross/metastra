import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import validate from "validate.js";
import constraints from "./constraints";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/userContext";

const Login = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { setIsAuthenticated, isAuthenticated, loginData, setLoginData } =
    useUserContext();
  const navigate = useNavigate();
  const [err, setErr] = useState({
    text: "",
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  useEffect(() => {
    const validationFields = ["email", "password"];
    validationFields.forEach((field) => {
      const validation = validate(
        { [field]: loginData[field] },
        { [field]: constraints[field] }
      );
      setErr((prev) => ({
        ...prev,
        [field]: validation ? validation[field] : "",
      }));
    });
  }, [loginData]);

  const handleloginData = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validate(
      { [name]: value },
      { [name]: constraints[name] }
    );
    setErr((prev) => ({
      ...prev,
      [name]: validation ? validation[name] : "",
    }));
  };

  useEffect(() => {
    console.log("is auth?:", isAuthenticated);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(loginData, constraints);
    if (validationErrors) {
      setErr((prev) => ({ ...prev, ...validationErrors }));
      return;
    }

    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/login",
        loginData
      );
      console.log("Response:", response);
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      console.log("Login successful:", response.data);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          navigate("/verify");
        } else if (status === 400 || status === 404) {
          setErr((prev) => ({ ...prev, text: "Incorrect email or password." }));
        } else if (status === 500) {
          setErr((prev) => ({
            ...prev,
            text: "Server error. Please try again later.",
          }));
        } else {
          setErr((prev) => ({
            ...prev,
            text: "Something went wrong. Please try again.",
          }));
        }
      } else {
        setErr((prev) => ({
          ...prev,
          text: "Network error. Please check your connection.",
        }));
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo and Description Section */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-0">
          <h1 className="text-3xl font-bold text-[#0866FF] mb-3">Metastra</h1>
          <p className="text-lg md:text-xl text-gray-700">
            Connect with friends and the world around you on Metastra.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md bg-white md:shadow-lg md:rounded-lg p-4 md:p-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Email Input */}
            {err.text && (
              <p className="text-xs text-red-500 mb-2">{err.text}</p>
            )}
            <div className="relative">
              <input
                className={`w-full h-10 px-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                  err.email ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                name="email"
                onChange={handleloginData}
                onBlur={handleBlur}
                value={loginData.email}
                placeholder="Email address or phone number"
              />
              {/* {err.email && (
                <CircleAlert className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
              {err.email && (
                <p className="text-xs text-red-500 mt-1">{err.email[0]}</p>
              )} */}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                className={`w-full h-10 px-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] ${
                  err.password ? "border-red-500" : "border-gray-300"
                }`}
                type="password"
                name="password"
                onChange={handleloginData}
                onBlur={handleBlur}
                value={loginData.password}
                placeholder="Password"
              />
              {/* {err.password && (
                <CircleAlert className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
              {err.password && (
                <p className="text-xs text-red-500 mt-1">{err.password[0]}</p>
              )} */}
            </div>

            {/* Log In Button */}
            <div className="pt-2">
              <button
                type="submit"
                // onClick={handleSubmit}
                className="w-full h-10 bg-[#0866FF] text-white font-semibold rounded-md text-sm hover:bg-[#0054cc] transition-colors"
              >
                Log In
              </button>
            </div>

            {/* Forgotten Password and Create Account Links */}
            <div className="text-center space-y-3">
              <a href="#" className="text-xs text-[#0866FF] hover:underline">
                Forgotten password?
              </a>
              <hr className="border-gray-300" />
              <Link
                to="/signup"
                className="px-6 py-2  w-40 h-10 bg-[#42b72a] text-white font-semibold rounded-md text-sm hover:bg-[#36a420] transition-colors"
              >
                Create new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

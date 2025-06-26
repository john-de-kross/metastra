import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import Loader from "../loadingIndicator";
import toastAlert from "../ALERT";

const Login = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData, setIsAuthenticated, refreshUser } =
    useUserContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const handleloginData = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/login",
        loginData,
        { withCredentials: true }
      );
      await refreshUser();
      console.log("Response:", response);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          navigate("/verify");
        } else if (status === 400 || status === 404) {
          toastAlert.error("Incorrect email or password");
        } else if (status === 500) {
          toastAlert.error("Server error. Please try again later.");
        } else {
          toastAlert.error("Something went wrong. Please try again.");
        }
      } else {
        toastAlert.error("Network error. Please check your connection.");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full  bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Logo and Description Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-2">
          <h1 className="text-3xl font-bold text-[#0866FF] mb-3">Metastra</h1>
          <p className="text-base md:text-lg text-gray-700 leading-snug max-w-sm">
            Connect with friends and the world around you on Metastra.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 max-w-md bg-white shadow-md rounded-lg p-4 sm:p-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative">
              <input
                className="w-full h-10 px-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] "
                type="text"
                name="email"
                onChange={handleloginData}
                value={loginData.email}
                placeholder="Email address or phone number"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                className="w-full h-10 px-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF] "
                type="password"
                name="password"
                onChange={handleloginData}
                value={loginData.password}
                placeholder="Password"
              />
            </div>

            {/* Log In Button */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full h-10 ${
                  loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#0866FF]"
                } text-white font-semibold rounded-md text-sm hover:bg-[#0054cc] transition-colors flex items-center justify-center`}
                disabled={loading}
              >
                {loading ? (
                  <Loader className="w-2 h-2 animate-spin" />
                ) : (
                  "Log in"
                )}
              </button>
            </div>

            {/* Forgotten Password and Create Account Links */}
            <div className="text-center space-y-3">
              <Link
                to="/enteremail"
                className="text-xs text-[#0866FF] hover:underline"
              >
                Forgotten password?
              </Link>
              <hr className="border-gray-300" />
              <Link
                to="/signup"
                className="inline-block px-6 py-2 bg-[#42b72a] text-white font-semibold rounded-md text-sm hover:bg-[#36a420] transition-colors"
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

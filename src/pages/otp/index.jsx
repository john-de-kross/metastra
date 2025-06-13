import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loadingIndicator";

const OTPPage = () => {
  const { formData, loginData, setIsAuthenticated } = useUserContext();
  const [otp, setOtp] = useState("");
  // const [email] = useState(formData.email);
  const email = formData?.email || loginData?.email;
  const [seconds, setSeconds] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  // Access control logic
  useEffect(() => {
    const cameFromSignup = formData?.email || formData?.phone;
    const cameFromLogin = loginData?.email && loginData?.password;

    if (!cameFromSignup && !cameFromLogin) {
      navigate("/");
    }
  }, [formData, loginData, navigate]);

  const sendOtp = async () => {
    try {
      const email = formData?.email || loginData?.email;
      if (!email) {
        console.error("No email found to send OTP.");
        return;
      }

      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/otp",
        { email }
      );

      console.log("OTP sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Handle OTP input
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // Verify OTP
  const handleOtpVerify = async () => {
    try {
      setLoading(true);
      console.log("email:", email);
      console.log("here");

      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/verify",
        { email, inputOtp: otp }
      );
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      console.log("response:", response);
      console.log("OTP verified successfully:", response.data.message);
      console.log("token:", token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center px-10 py-8">
          <h1 className="text-4xl font-bold text-[#0866FF] mb-4">Metastra</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Connect with friends and the world around you on{" "}
            <strong>Metastra</strong>.
          </p>
        </div>

        {/* OTP Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center w-full rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-[#0866FF] text-center mb-4">
            Metastra
          </h2>
          <h3 className="text-lg font-semibold text-center mb-2">
            Enter the 6-digit code
          </h3>
          <p className="text-center text-sm text-gray-600 mb-6">
            We've sent a code to <span className="font-medium">{email}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              inputMode="numeric"
              className="w-full text-center tracking-widest text-xl px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0866FF] mb-4"
              placeholder="●●●●●●"
            />
            <button
              type="submit"
              disabled={otp.length !== 6}
              onClick={handleOtpVerify}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                otp.length === 6
                  ? "bg-[#0866FF] hover:bg-[#0756e6]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? <Loader className="w-2 h-2 animate-spin" /> : "Verify"}
            </button>
          </form>

          <div className="mt-5 flex justify-between items-center text-sm text-[#0866FF] space-y-2">
            <button
              className="hover:underline bg-[#0866FF] px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                sendOtp();
                setOtpSent(true);
                setSeconds(60);
              }}
              disabled={otpSent}
            >
              Send Code
            </button>

            <button
              className={`rounded-lg font-semibold ${
                seconds === 0
                  ? "text-[#0756e6] cursor-pointer"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => {
                sendOtp();
                setSeconds(60);
              }}
              disabled={seconds !== 0}
            >
              Resend in {seconds} sec
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;

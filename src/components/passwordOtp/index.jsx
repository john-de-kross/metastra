import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../loadingIndicator";

const PasswordOtp = () => {
  //   const [viewInput, setViewInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();
  const { mail, setMail } = useUserContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    console.log(mail);
    console.log(otp);
  }, [mail, otp]);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/otp",
        { email: mail }
      );
      console.log("response:", response.data);

      if (response.data.status === "success") {
        navigate("/passwordverify");
      }
    } catch (err) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
      setError("");
    }
    console.log("OTP input:", otp);
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/verify",
        { email: mail, inputOtp: otp }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        console.log("OTP correct");
        navigate("/changepassword");
      } else {
        console.log("invalid OTP");
        setError("Incorrect OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verify error:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        // alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClass =
    "rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <div>
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Logo and Description */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-2">
            <h1 className="text-3xl font-bold text-[#0866FF] mb-3">Metastra</h1>
            <p className="text-base md:text-lg text-gray-700 leading-snug max-w-sm">
              Connect with friends and the world around you on Metastra.
            </p>
          </div>
          <div className="w-full md:w-1/2 max-w-md bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#0866FF] text-center mb-6">
              Enter the code sent to {mail}
            </h2>
            <form>
              {/* OTP Input */}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  OTP
                </label>
                <input
                  type="number"
                  value={otp}
                  onChange={handleOtpInput}
                  className={`${inputClass} mb-4`}
                  placeholder="●●●●●●"
                  required
                />

                {error && (
                  <div className="text-red-500 text-sm mb-2">{error}</div>
                )}

                <button
                  type="submit"
                  className={`w-full py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    otp.length !== 6 ? "opacity-50 cursor-not-allowed" : ""
                  } flex justify-center items-center`}
                  disabled={otp.length !== 6}
                  onClick={(e) => {
                    e.preventDefault();
                    if (otp.length !== 6) {
                      setError("Please enter a valid 6-digit OTP.");
                      return;
                    }
                    handleVerify();
                    console.log("OTP submitted:", otp);
                  }}
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </form>
            {/* Send/Resend Buttons */}
            <div className="mt-5 flex  justify-between items-center text-sm text-[#0866FF] space-y-2">
              <button
                className={`hover:underline bg-[#0866FF] px-4 py-2 text-white ${buttonClass}`}
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
                className={`${buttonClass} ${
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
    </div>
  );
};

export default PasswordOtp;

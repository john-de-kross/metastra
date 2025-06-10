import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const OTPPage = () => {
  const {formData} = useUserContext()
  const [otp, setOtp] = useState("");
  const [phoneNumber] = useState(formData.phone); 

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  }; 

  if (!formData?.email && !formData?.phone) {
    return <Navigate to="/" />; 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2    overflow-hidden">
        {/* Left Section (Only on Desktop) */}
        <div className="hidden md:flex flex-col justify-center px-10 py-8 ">
          <h1 className="text-4xl font-bold text-[#0866FF] mb-4">Metastra</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Connect with friends and the world around you on <strong>Metastra</strong>.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="p-6 sm:p-10 flex flex-col justify-center w-full rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-[#0866FF] text-center mb-4">Metastra</h2>
          <h3 className="text-lg font-semibold text-center mb-2">
            Enter the 6-digit code
          </h3>
          <p className="text-center text-sm text-gray-600 mb-6">
            We've sent a code to <span className="font-medium">{phoneNumber}</span>
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
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                otp.length === 6
                  ? "bg-[#0866FF] hover:bg-[#0756e6]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center text-sm text-[#0866FF] space-y-2">
            <button className="hover:underline">Resend Code</button>
            <button className="hover:underline">Edit Phone Number</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import Loader from "../loadingIndicator";
import { useNavigate } from "react-router-dom";
import toastAlert from "../ALERT";

const EmailedPassword = () => {
  const { mail, setMail } = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  useEffect(() => {
    console.log(mail);
  }, [mail]);

  const handleEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/otp",
        { email: mail }
      );
      console.log("response:", response.data);
      navigate("/passwordverify");
      
    } catch (error) {
      console.log(error)
      if (error.status === 500) {
        toastAlert.error('Something went wrong. Check your internet connection or try again later')
      } else if (error.response) {
        toastAlert.error(error.response.data.message || 'Something went wrong on the server. Try again later!')
      } else {
        toastAlert.error('Unexpected error occured. Please try again.')
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Logo and Description */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-2">
          <h1 className="text-3xl font-bold text-[#0866FF] mb-3">Metastra</h1>
          <p className="text-base md:text-lg text-gray-700 leading-snug max-w-sm">
            Connect with friends and the world around you on Metastra.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold text-[#0866FF] text-center mb-6">
            Enter the Email Address Linked to Your Account
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className={inputClass}
                placeholder="Enter Email"
                required
              />
            </div>
          </form>

          {/* Error */}
          <button
            type="submit"
            onClick={handleEmail}
            className={`w-full py-2 bg-blue-600 text-white  text-center font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center`}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin text-center" />
            ) : (
              "continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailedPassword;

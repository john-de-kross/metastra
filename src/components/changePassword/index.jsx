import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { mail, setMail } = useUserContext();
  const [newDetails, setNewDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(newDetails);
  }, [newDetails]);

  // useEffect(() => {
  //   setNewDetails((prev) => ({ ...prev, email: mail }));
  // }, [newDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate password change API call
    setSuccess("Password changed successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleConfirmPassword = (e) => {
    setNewDetails((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
  };

  const handlePassword = (e) => {
    setNewDetails((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handlePasswordChange = async () => {
    try {
      setNewDetails((prev) => ({ ...prev, email: mail }));

      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/change-password",
        {
          newPassword: newDetails.password,
          confirmPassword: newDetails.confirmPassword,
          email: mail,
        }
      );

      navigate("/");

      console.log(response.data);
    } catch (err) {
      console.log(err);
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
        <div className="w-full md:w-1/2 max-w-md bg-white shadow-md rounded-lg p-4 sm:p-6">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Change Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newDetails.password}
                  onChange={handlePassword}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={newDetails.confirmPassword}
                  onChange={handleConfirmPassword}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm text-center mb-4">
                  {success}
                </p>
              )}
              <button
                onClick={handlePasswordChange}
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

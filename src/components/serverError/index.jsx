import React from "react";

const ServerError = ({
  message = "Sorry, our server is having issues. Please try again later.",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Server Error</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ServerError;

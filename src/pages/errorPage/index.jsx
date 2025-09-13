import React from "react";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoReloadCircle } from "react-icons/io5";

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <BiError className="mx-auto text-red-500 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          {error?.message ||
            "We're having trouble loading this page. Please try again."}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <IoReloadCircle className="w-5 h-5" />
            Reload Page
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">
              Error details: {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;

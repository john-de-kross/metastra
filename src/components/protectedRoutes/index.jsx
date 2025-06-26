import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Loader from "../loadingIndicator";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading)
    return (
      <div className="w-screen h-screen text-2xl flex items-center justify-center bg-white">
        <Loader className="text-3xl" />
      </div>
    );

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

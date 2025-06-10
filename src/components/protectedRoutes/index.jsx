import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

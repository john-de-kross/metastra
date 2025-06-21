import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext";



const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) return <p>Loading..</p>

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

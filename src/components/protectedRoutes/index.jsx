import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Loader from "../loadingIndicator";



const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) return <Loader/>

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

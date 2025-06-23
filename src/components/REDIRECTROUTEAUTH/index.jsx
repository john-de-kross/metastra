import React from "react";
import { useUserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";
import Loader from "../loadingIndicator";

const RedirctRouteAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) return <Loader />;

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default RedirctRouteAuth;

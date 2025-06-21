import React from "react";
import { useUserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";


const RedirctRouteAuth = ({ children }) => {
    const { isAuthenticated, isLoading } = useUserContext();
    
    if (isLoading) return <p>Loading...</p>
    return isAuthenticated ? <Navigate to="/home" /> : children



}

export default RedirctRouteAuth;
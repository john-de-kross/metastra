import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// Create the context
const UserContext = createContext({});

// Create the provider
export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    day: "",
    month: "",
    year: "",
    gender: "Female",
    phone: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mail, setMail] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = {
    formData,
    setFormData,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    loginData,
    setLoginData,
    mail,
    setMail,
  };
  useEffect(() => {
    axios
      .get("https://metastra-server.onrender.com/api/v1/users/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        setIsAuthenticated(true);
        setIsLoading(false);
        setUser(res.data.user);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        console.log(err);
        console.log("is auth", isAuthenticated);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

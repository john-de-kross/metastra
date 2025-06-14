import React, { createContext, useContext, useState } from "react";

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

  const value = {
    formData,
    setFormData,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loginData,
    setLoginData,
    mail,
    setMail,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

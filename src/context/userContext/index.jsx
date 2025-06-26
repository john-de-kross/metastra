import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [userName, setUserName] = useState("user");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState(
    "https://i.pinimg.com/736x/2e/13/f8/2e13f818fa7e830e9ff084b97d67aabd.jpg"
  );
  const [bio, setBio] = useState("Living the dream! 🌟");

  // Function to refresh user and profile data
  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const authRes = await axios.get(
        "https://metastra-server.onrender.com/api/v1/users/check-auth",
        { withCredentials: true }
      );

      setIsAuthenticated(true);
      setUser(authRes.data.user);

      const profileRes = await axios.get(
        "https://metastra-server.onrender.com/api/v1/users/user-profile",
        { withCredentials: true }
      );

      const currentUser = profileRes.data.data.currentUser;
      const username = `${currentUser.firstname} ${currentUser.surname}`;

      setUserName(username || "user");
      setProfilePic(currentUser.profilePics);
      setCoverPic(currentUser.coverPics);
      setBio(profileRes.data.bio || "Living the dream! 🌟");
      console.log("data:", profileRes.data.data);
    } catch (error) {
      console.log("Refresh failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Run only on mount
  useEffect(() => {
    refreshUser();
  }, []);

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
    userName,
    setUserName,
    profilePic,
    setProfilePic,
    coverPic,
    setCoverPic,
    bio,
    setBio,
    refreshUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

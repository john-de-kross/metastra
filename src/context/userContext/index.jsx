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
  const [myData, setMyData] = useState({
    bio: "",
    work: "",
    education: "",
    location: "",
    relationship: "",
    joined: "",
  });

  const [about, setAbout] = useState({
    bio: "",
    work: "",
    education: "",
    location: "",
    relationship: "",
    // joined: "",
  });

  const [editForm, setEditForm] = useState({ userName, bio, ...about });

  const fetchUserAboutData = async () => {
    try {
      const response = await axios.get(
        "https://metastra-server.onrender.com/api/v1/users/about-user",
        { withCredentials: true }
      );
      console.log("about data:", response.data.data);
      setMyData({
        bio: response.data.data.userAboutProfile.bio,
        work: response.data.data.userAboutProfile.work,
        education: response.data.data.userAboutProfile.education,
        location: response.data.data.userAboutProfile.location,
        relationship: response.data.data.userAboutProfile.relationship,
      });
    } catch (err) {}
  };
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

      await fetchUserAboutData();
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
    myData,
    setMyData,
    about,
    setAbout,
    editForm,
    setEditForm,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

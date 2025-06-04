import React from "react";
import { Router, createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup/index";
import ProtectedRoutes from "./components/protectedRoutes";
import Profile from "./pages/profile";
import Home from "./pages/home";
import OTPPage from "./pages/otp"

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },{ path: "/verify", element: <OTPPage /> },
    ],
  },
]);
export default router;

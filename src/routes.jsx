import React from "react";
import { Router, createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup/index";
import ProtectedRoutes from "./components/protectedRoutes";
import Profile from "./pages/profile";
import Home from "./pages/home";
import OTPPage from "./pages/otp";
import MobileMenu from "./pages/mobileMenu";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/verify", element: <OTPPage /> },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/menu", element: <MobileMenu /> },
    ],
  },
]);
export default router;

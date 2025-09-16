import React from "react";
import { Router, createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup/index";
import ProtectedRoutes from "./components/protectedRoutes";
import ChangePassword from "./components/changePassword";
import Profile from "./pages/profile";
import Home from "./pages/home";
import OTPPage from "./pages/otp";
import MobileMenu from "./pages/mobileMenu";
import EmailedPassword from "./components/enterPasswordEmail";
import PasswordOtp from "./components/passwordOtp";
import RedirctRouteAuth from "./components/REDIRECTROUTEAUTH";
// import NetworkError from "./components/ERRORPAGE/network";
import ServerError from "./components/serverError";
import Settings from "./pages/settings";
import FriendsPage from "./pages/friends";
import FriendRequest from "./components/friendRequest";
import Notifications from "./components/notification";
import MobileNotifications from "./components/mobileNotifications";
import Chat from "./components/chat";
import ErrorPage from "./pages/errorPage";
// import PostDetail from "./components/postDetail";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <RedirctRouteAuth>
            <Login />
          </RedirctRouteAuth>
        ),
      },
      { path: "/signup", element: <SignUp /> },
      { path: "/error", element: <ServerError /> },
      { path: "/verify", element: <OTPPage /> },
      { path: "/enteremail", element: <EmailedPassword /> },
      { path: "/changepassword", element: <ChangePassword /> },
      { path: "/passwordverify", element: <PasswordOtp /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/profile", element: <Profile /> },
          { path: "/menu", element: <MobileMenu /> },
          { path: "/settings", element: <Settings /> },
          { path: "/friends", element: <FriendsPage /> },
          { path: "/notifications", element: <MobileNotifications /> },
          // { path: "/chat", element: <Chat /> },
        ],
      },
    ],
  },
]);

export default router;

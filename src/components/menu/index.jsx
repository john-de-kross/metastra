import axios from "axios";
import React from "react";
import {
  FaUserFriends,
  FaBookmark,
  FaStore,
  FaClock,
  FaFlag,
  FaCalendarAlt,
  FaGamepad,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Menu = ({ openMenu, setOpenMenu }) => {
  const { setIsAuthenticated, setUser } = useUserContext();
  const navigate = useNavigate();

  const menuItems = [
    {
      section: "Shortcuts",
      items: [
        { icon: <FaUserFriends />, label: "Friends", to: "/friends" },
        { icon: <FaStore />, label: "Marketplace", to: "/marketplace" },
        { icon: <FaClock />, label: "Memories", to: "/memories" },
        { icon: <FaFlag />, label: "Pages", to: "/pages" },
        { icon: <FaCalendarAlt />, label: "Events", to: "/events" },
        { icon: <FaBookmark />, label: "Saved", to: "/saved" },
        { icon: <FaGamepad />, label: "Gaming", to: "/gaming" },
      ],
    },
    {
      section: "Help & Support",
      items: [
        { icon: <FaQuestionCircle />, label: "Help Center", to: "/help" },
      ],
    },
    {
      section: "Settings & Privacy",
      items: [{ icon: <FaCog />, label: "Settings", to: "/settings" }],
    },
    {
      section: "Account",
      items: [{ icon: <FaSignOutAlt />, label: "Log Out", to: "/" }],
    },
  ];

  const handleLogOut = async () => {
    try {
      await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logged out successfully");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div
      className={`${
        openMenu ? "block" : "hidden"
      } fixed top-16 right-4 z-[100] w-[320px] max-h-[90vh] overflow-y-scroll bg-white shadow-lg rounded-xl px-4 py-6`}
    >
      <h1 className="text-2xl font-bold text-[#0866FF] mb-4">Menu</h1>

      {menuItems.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-sm text-gray-500 uppercase font-semibold mb-2">
            {section.section}
          </h2>

          <div className="space-y-2">
            {section.items.map((item, i) => (
              <Link
                to={item.to}
                key={i}
                onClick={() => {
                  if (item.label === "Log Out") {
                    handleLogOut();
                  }
                }}
                className="flex items-center justify-between hover:bg-gray-100 rounded-lg px-4 py-3 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-[#0866FF] text-xl">{item.icon}</div>
                  <span className="text-sm font-medium text-gray-800">
                    {item.label}
                  </span>
                </div>
                <FaChevronRight className="text-gray-400 w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;

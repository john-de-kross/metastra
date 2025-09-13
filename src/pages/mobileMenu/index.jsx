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
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/navBar";
import { useUserContext } from "../../context/userContext";

const MobileMenu = () => {
  const menuItems = [
    {
      section: "Shortcuts",
      items: [
        {
          icon: <FaUserFriends />,
          label: "Friends",
          to: "/friends",
          ariaLabel: "Navigate to Friends page",
        },
        {
          icon: <FaStore />,
          label: "Marketplace",
          to: "/marketplace",
          ariaLabel: "Navigate to Marketplace",
        },
        {
          icon: <FaClock />,
          label: "Memories",
          to: "/memories",
          ariaLabel: "Navigate to Memories",
        },
        {
          icon: <FaFlag />,
          label: "Pages",
          to: "/pages",
          ariaLabel: "Navigate to Pages",
        },
        {
          icon: <FaCalendarAlt />,
          label: "Events",
          to: "/events",
          ariaLabel: "Navigate to Events",
        },
        {
          icon: <FaBookmark />,
          label: "Saved",
          to: "/saved",
          ariaLabel: "Navigate to Saved items",
        },
        {
          icon: <FaGamepad />,
          label: "Gaming",
          to: "/gaming",
          ariaLabel: "Navigate to Gaming",
        },
      ],
    },
    {
      section: "Help & Support",
      items: [
        {
          icon: <FaQuestionCircle />,
          label: "Help Center",
          to: "/help",
          ariaLabel: "Navigate to Help Center",
        },
      ],
    },
    {
      section: "Settings & Privacy",
      items: [
        {
          icon: <FaCog />,
          label: "Settings",
          to: "/settings",
          ariaLabel: "Navigate to Settings",
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          icon: <FaSignOutAlt />,
          label: "Log Out",
          to: "/logout",
          ariaLabel: "Log out of account",
        },
      ],
    },
  ];
  const logged = localStorage.getItem("loggedInUser");
  const userId = localStorage.getItem("userId");
  const { userName, setUser } = useUserContext();

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
    <div className="lg:hidden">
      <div>
        <Navbar />
      </div>
      <Link to="/profile" aria-label={`View ${userName}'s profile`}>
        <div className="bg-white p-4 mt-26 rounded-lg shadow-sm hover:bg-gray-200 transition">
          <div
            className="flex items-center space-x-3"
            onClick={() => {
              localStorage.setItem("userId", logged);
              console.log("Navigating to profile of:", userId);
            }}
          >
            <FaUser className="text-[#0866FF] text-xl" />
            <div>
              <p className="text-2xl font-bold">{userName}</p>
              <p className="text-gray-600">View your profile</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="overflow-y-scroll bg-white rounded-xl px-4 py-6 mt-0">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {section.section}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, i) => (
                <Link
                  to={item.to}
                  key={i}
                  className="flex items-center justify-between hover:bg-gray-100 rounded-lg px-4 py-3 transition"
                  aria-label={item.ariaLabel}
                  onClick={() => {
                    if (item.label === "Log Out") {
                      handleLogOut();
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-[#0866FF] text-xl">{item.icon}</div>
                    <span className="text-lg font-medium text-gray-800">
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
    </div>
  );
};

export default MobileMenu;

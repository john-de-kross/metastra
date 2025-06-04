import React from "react";
import { LuTvMinimalPlay } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import { CgGames } from "react-icons/cg";
import { HomeIcon, XIcon } from "@heroicons/react/outline";
import { UserGroupIcon, CalendarIcon } from "@heroicons/react/solid";
import { Link, NavLink } from "react-router-dom";
import dp from "../../assets/img/user.png"

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  // Mock user data (replace with auth context or state)
  const user = {
    name: "John Doe",
    profileImage: dp,
  };

  // Navigation items
  const navItems = [
    { to: "/home", icon: HomeIcon, label: "Home" },
    { to: "/friends", icon: UserGroupIcon, label: "Friends" },
    { to: "/video", icon: LuTvMinimalPlay, label: "Watch" },
    { to: "/marketplace", icon: FaShop, label: "Marketplace" },
    { to: "/groups", icon: UserGroupIcon, label: "Groups" },
    { to: "/gaming", icon: CgGames, label: "Gaming" },
    { to: "/events", icon: CalendarIcon, label: "Events" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 border-r border-gray-200 fixed top-14 left-0 h-[calc(100vh-3.5rem)] overflow-y-auto z-40">
        <div className="flex flex-col p-4 space-y-2">
          {/* Profile Section */}
          <Link
            to="/profile"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-800 font-semibold text-sm">
              {user.name}
            </span>
          </Link>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 ${
                  isActive
                    ? "bg-gray-100 text-[#0866FF] font-semibold"
                    : "text-gray-600"
                }`
              }
            >
              <item.icon className="w-7 h-7 text-[#0866FF]" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="w-80 bg-white h-full p-4 overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <XIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Profile Section */}
            <Link
              to="/profile"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 mb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-800 font-semibold text-sm">
                {user.name}
              </span>
            </Link>

            {/* Navigation Items */}
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 ${
                    isActive
                      ? "bg-gray-100 text-[#0866FF] font-semibold"
                      : "text-gray-600"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-7 h-7" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

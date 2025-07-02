import React, { useState } from "react";
import {
  MdHome,
  MdOutlinePersonAddAlt,
  MdOutlinePeopleAlt,
  MdOutlineGroups,
  MdOutlineCake,
  MdListAlt,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../navBar";
import { useUserContext } from "../../context/userContext";
import { FaBars, FaTimes } from "react-icons/fa";

const sidebarItems = [
  {
    label: "Friend Requests",
    icon: MdOutlinePersonAddAlt,
    tag: "requests",
  },
  {
    label: "Suggestions",
    icon: MdOutlinePeopleAlt,
    tag: "suggestions",
  },
  {
    label: "All Friends",
    icon: MdOutlineGroups,
    tag: "all",
  },
  {
    label: "Birthdays",
    icon: MdOutlineCake,
    tag: "birthdays",
  },
];

const FriendsSidebar = () => {
  const { active, setActive } = useUserContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      <Navbar />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center mt-25 justify-between px-4 py-3 bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-40">
        <h2 className="text-lg font-bold text-gray-900">Friends</h2>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FaBars className="text-xl text-gray-700" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white h-full shadow-lg p-4 pt-16">
            <button
              className="absolute top-4 left-2 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              <FaTimes className="text-2xl text-gray-700" />
            </button>
            <nav className="flex flex-col gap-1 mt-4">
              <Link
                className="flex items-center p-2 rounded-lg transition-all hover:bg-gray-100"
                to="/home"
                onClick={() => setMobileOpen(false)}
              >
                <span className="bg-gray-200 p-2 rounded-full mr-4 flex items-center justify-center">
                  <MdHome className="text-2xl text-gray-600" />
                </span>
                <span className="text-lg font-medium">Home</span>
              </Link>
              {sidebarItems.map(({ tag, label, icon: Icon }) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActive(tag);
                    localStorage.setItem("active", tag);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center p-2 rounded-lg transition-all ${
                    active === tag
                      ? "bg-gray-100 text-black font-semibold"
                      : "text-black hover:bg-gray-100"
                  }`}
                  type="button"
                >
                  <span className="bg-gray-200 p-2 rounded-full mr-4 flex items-center justify-center">
                    <Icon className="text-2xl text-gray-600" />
                  </span>
                  <span className="text-lg font-medium">{label}</span>
                </button>
              ))}
            </nav>
          </div>
          {/* Overlay */}
          <div
            className="flex-1 md:hidden bg-transparent bg-opacity-30"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 pt-20 px-4 overflow-y-auto z-30">
        <h2 className="text-xl font-bold text-gray-900 mb-5 px-1">Friends</h2>
        <nav className="flex flex-col gap-1">
          <Link
            className="flex items-center p-2 rounded-lg transition-all hover:bg-gray-100"
            to="/home"
          >
            <span className="bg-gray-200 p-2 rounded-full mr-4 flex items-center justify-center">
              <MdHome className="text-2xl text-gray-600" />
            </span>
            <span className="text-lg font-medium">Home</span>
          </Link>
          {sidebarItems.map(({ tag, label, icon: Icon }) => (
            <button
              key={tag}
              onClick={() => {
                setActive(tag);
                localStorage.setItem("activ", tag);
                console.log(tag);
              }}
              className={`flex items-center p-2 rounded-lg transition-all ${
                active === tag
                  ? "bg-gray-100 text-black font-semibold"
                  : "text-black hover:bg-gray-100"
              }`}
              type="button"
            >
              <span className="bg-gray-200 p-2 rounded-full mr-4 flex items-center justify-center">
                <Icon className="text-2xl text-gray-600" />
              </span>
              <span className="text-lg font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default FriendsSidebar;

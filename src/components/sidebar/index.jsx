import React from "react";
import {
  FaHome,
  FaUserFriends,
  FaStore,
  FaCalendarAlt,
  FaClock,
  FaFlag,
  FaVideo,
  FaBookmark,
  FaRegNewspaper,
} from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { CgGames } from "react-icons/cg";
import { RiMemoriesLine, RiEarthLine } from "react-icons/ri";
import { GiMegaphone } from "react-icons/gi";
import { BsExclamationTriangleFill, BsChevronDown } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import dp from "../../assets/img/user.png";
import { useUserContext } from "../../context/userContext";

const navItems = [
  { to: "/home", label: "Home", icon: FaHome },
  { to: "/friends", label: "Friends", icon: FaUserFriends },
  { to: "/groups", label: "Groups", icon: HiUserGroup },
  { to: "/marketplace", label: "Marketplace", icon: FaStore },
  { to: "/watch", label: "Watch", icon: FaVideo },
  { to: "/memories", label: "Memories", icon: RiMemoriesLine },
  { to: "/saved", label: "Saved", icon: FaBookmark },
  { to: "/events", label: "Events", icon: FaCalendarAlt },
  { to: "/pages", label: "Pages", icon: FaFlag },
  { to: "/gaming", label: "Gaming", icon: CgGames },
  { to: "/feeds", label: "Feeds", icon: FaRegNewspaper },
  { to: "/ad-center", label: "Ad Center", icon: GiMegaphone },
  { to: "/climate", label: "Climate Science Center", icon: RiEarthLine },
  { to: "/crisis", label: "Crisis Response", icon: BsExclamationTriangleFill },
  { to: "#", label: "See more", icon: BsChevronDown },
];

export default function Sidebar() {
  const { userName, profilePic } = useUserContext();
  const logged = localStorage.getItem("loggedInUser");
  const userId = localStorage.getItem("userId");

  return (
    <aside className="hidden md:block w-72 fixed scrollbar-fb top-14 left-0 h-[calc(100vh-3.5rem)]  border-gray-200 overflow-y-auto z-40">
      <div className="flex flex-col p-4 space-y-2">
        {/* Profile Section */}
        <Link
          to="/profile"
          onClick={() => {
            localStorage.setItem("userId", logged);
            console.log("Navigating to profile of:", userId);
          }}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src={profilePic || dp}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-800 font-semibold text-sm capitalize">
            {userName}
          </span>
        </Link>

        {/* Nav Items */}
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg transition  ${
                isActive
                  ? " text-[#0866FF] font-semibold bg-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`
            }
          >
            <Icon className="w-6 h-6 text-[#0866FF]" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

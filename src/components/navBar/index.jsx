import React, { useState } from "react";
import { LuTvMinimalPlay } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import { CgGames } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { GrSearch } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {
  SearchIcon,
  HomeIcon,
  MenuIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import { UserGroupIcon, BellIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import dp from "../../assets/img/user.png";
import Menu from "../../components/menu"
import Notifications from "../../components/notification"


const Navbar = () => {
  // Mock notification counts 
  const notifications = 3;
  const messages = 5;

  const [openMenu, setOpenMenu] = useState(false)
  const [openNotifications, setOpenNotifications] = useState(false);
  
  const handleNotification = ()=>{
    setOpenNotifications(!openNotifications),
    setOpenMenu(false)
  }

  const handleMenu = ()=>{
    setOpenNotifications(false),
    setOpenMenu(!openMenu)
  }
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 z-50 hidden lg:block">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left - Logo, Search */}
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className=" text-white bg-[#0866FF] rounded-full p-2 text-3xl font-bold"
              >
                M
              </Link>
              <div className="relative w-64">
                <input
                  type="text"
                  className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0866FF] border-none placeholder-gray-500"
                  placeholder="Search Metastra"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Center - Main Navigation Icons */}
            <div className="flex-1 flex justify-center max-w-[600px]">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="px-8 py-3  hover:bg-gray-100 border-b-3 border-[#0866FF]"
                >
                  <HomeIcon className="w-7 h-7 text-[#0866FF]" />
                </Link>
                <Link
                  to="/video"
                  className="px-8 py-3 rounded-lg hover:bg-gray-100"
                >
                  <LuTvMinimalPlay className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
                </Link>
                <Link
                  to="/marketplace"
                  className="px-8 py-3 rounded-lg hover:bg-gray-100"
                >
                  <FaShop className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
                </Link>
                <Link
                  to="/groups"
                  className="px-8 py-3 rounded-lg hover:bg-gray-100"
                >
                  <UserGroupIcon className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
                </Link>
                <Link
                  to="/gaming"
                  className="px-8 py-3 rounded-lg hover:bg-gray-100"
                >
                  <CgGames className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
                </Link>
              </div>
            </div>

            {/* Right - Menu, Messenger, Notifications, Profile */}
            <div className="flex items-center relative z-50 space-x-2">
              <div className="relative">
                <button to="/menu" className={`p-2 rounded-full bg-gray-100 `} onClick={handleMenu}
>
                 <MenuIcon className={`w-7 h-7  hover:text-[#0866FF] ${openMenu ? "text-[#0866FF]" :'text-gray-600' }`}/>
                </button>
                <Menu openMenu={openMenu} setOpenMenu={setOpenMenu}/>
              </div>
              <button
                to="/messenger"
                className="p-2 rounded-full bg-gray-100 relative"
              >
                <ChatIcon className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
                {messages > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {messages}
                  </span>
                )}
              </button>

              <div><button
                
                className={`p-2 rounded-full bg-gray-100 relative `} onClick={handleNotification}
              >
                <BellIcon className={`w-7 h-7  hover:text-[#0866FF] ${openNotifications ? "text-[#0866FF]" :'text-gray-600' }`} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <Notifications open={openNotifications} />
              </div>
              
              <button className="p-2 rounded-full bg-gray-100">
                <img src={dp} alt="Profile" className="rounded-full w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-xl font-bold text-[#0866FF]">Metastra</h1>
          <div className="flex space-x-4 text-xl">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiPlusCircle/>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <GrSearch />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center h-14">
          <Link to="/home" className="p-2">
            <HomeIcon className="w-7 h-7 text-[#0866FF]" />
          </Link>
          <Link to="/video" className="p-2">
            <LuTvMinimalPlay className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
          </Link>
          <Link to="/marketplace" className="p-2">
            <FaShop className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
          </Link>
          <Link to="/notifications" className="p-2 relative">
            <BellIcon className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Link>
          <Link to="/menu" className="p-2">
            <BiMessageRoundedDetail  className="w-7 h-7 text-gray-600 hover:text-[#0866FF]" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

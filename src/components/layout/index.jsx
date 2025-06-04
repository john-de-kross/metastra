import React from "react";
import SideBar from "../sidebar"; // Left
import Aside from "../asideBar"; // Right
import NavBar from "../navBar"; // Top

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[20%] p-4">
          <SideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-grow lg:max-w-[60%] mx-auto p-4">{children}</main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-[20%] p-4">
          <Aside />
        </aside>
      </div>
    </div>
  );
};

export default Layout;

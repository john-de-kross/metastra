import React, { useState } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import PrivacySettings from "../../components/privacySettings";
import SecuritySettings from "../../components/securitySettings";
import NotificationSettings from "../../components/notificationSettings";
import BlockingSettings from "../../components/blockingSettings";
import InfoSettings from "../../components/infoSettings";
import Navbar from "../../components/navBar";

const tabs = [
  { key: "privacy", label: "Privacy" },
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },
  { key: "blocking", label: "Blocking" },
  { key: "info", label: "Your Information" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("privacy");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBack = () => window.history.back();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row mt-14 overflow-y-hidden">
        {/* MOBILE HEADER */}
        <header className="w-full lg:hidden bg-white shadow flex items-center justify-between px-4 py-3">
          <button onClick={handleBack}>
            <FaArrowLeft className="text-gray-600 text-xl" />
          </button>
          <h2 className="font-semibold text-lg">Settings & Privacy</h2>
          <button onClick={() => setSidebarOpen((o) => !o)}>
            <FaBars className="text-gray-600 text-xl" />
          </button>
        </header>

        {/* SIDEBAR */}
        <aside
          className={`${
            sidebarOpen ? "block border-b" : "hidden"
          } lg:block lg:w-64 bg-white lg:border-r lg:border-gray-200 shadow-sm `}
        >
          <div className="p-4 lg:p-6">
            {/* Mobile-only title */}
            <h2 className="text-xl font-semibold mb-4 lg:hidden">Settings</h2>

            <ul className="space-y-1 ">
              {tabs.map(({ key, label }) => (
                <li key={key}>
                  <button
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 text-left py-2.5 px-4 rounded-md transition-all duration-150 ${
                      activeTab === key
                        ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {/* Optional Icon Space */}
                    {/* <span className="text-lg">{icon}</span> */}
                    <span className="truncate">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 lg:p-8">
          {/* DESKTOP HEADER */}
          {/* <div className="hidden lg:flex items-center justify-between mb-6 ">
            <button onClick={handleBack} className="text-gray-600 text-xl">
              <FaArrowLeft />
            </button>
            <h2 className="text-2xl font-semibold">Settings & Privacy</h2>
            <div className="w-6" />
          </div> */}

          <div className=" rounded-lg  p-6 ">
            {activeTab === "privacy" && <PrivacySettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "blocking" && <BlockingSettings />}
            {activeTab === "info" && <InfoSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

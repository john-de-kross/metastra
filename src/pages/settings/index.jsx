import React, { useState } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import GeneralSettings from "../../components/generalSettings";
import PrivacySettings from "../../components/privacySettings";
import SecuritySettings from "../../components/securitySettings";

const tabs = [
  { key: "general", label: "General" },
  { key: "privacy", label: "Privacy" },
  { key: "security", label: "Security" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
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
        } lg:block lg:w-64 bg-white lg:border-r lg:border-gray-200`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 lg:hidden">Settings</h2>
          <ul>
            {tabs.map(({ key, label }) => (
              <li key={key} className="mb-1">
                <button
                  className={`w-full text-left py-3 px-4 rounded-md ${
                    activeTab === key
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab(key);
                    setSidebarOpen(false);
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-8">
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-gray-600 text-xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-semibold">Settings & Privacy</h2>
          <div className="w-6" />
        </div>

        {/* SECTION TITLE */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
          {tabs.find((t) => t.key === activeTab)?.label || "Settings"}
        </h3>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "privacy" && <PrivacySettings />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </main>
    </div>
  );
};

export default Settings;

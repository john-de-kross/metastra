import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SecuritySettings() {
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-100  flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-lg shadow-sm p-6 text-sm w-full mb-0 max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Security Settings
        </h2>
        <p className="text-gray-600 mb-6">
          Manage two-factor authentication, login alerts, and change your
          password.
        </p>

        <div className="space-y-6">
          {/* Change Password Section */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border">
            <div>
              <p className="text-gray-800 font-medium">Change Password</p>
              <p className="text-xs text-gray-500 mt-1">
                It's a good idea to use a strong password that you don't use
                elsewhere.
              </p>
            </div>
            <button
              onClick={() => navigate("/settings/change-password")}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Change
            </button>
          </div>

          {/* Two-Factor Authentication Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Two-Factor Authentication
            </label>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border">
              <p className="text-gray-700 flex-1 mr-4">
                Require a code when logging in from a new device or browser
              </p>
              <label className="inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactorAuth}
                  onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-colors">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Login Alerts */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Login Alerts
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="loginAlerts"
                checked={loginAlerts}
                onChange={() => setLoginAlerts(!loginAlerts)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="loginAlerts" className="text-gray-700">
                Get notified when your account is accessed from a new device
              </label>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex justify-end items-center space-x-3">
          <button className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 text-sm">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

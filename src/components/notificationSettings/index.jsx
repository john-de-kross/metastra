import React, { useState } from "react";

export default function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [smsNotifs, setSmsNotifs] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        Notification Settings
      </h2>
      <p className="text-gray-600 mb-6">
        Choose how you want to receive notifications from Facebook.
      </p>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md ">
          <div>
            <p className="text-gray-800 font-medium">Email Notifications</p>
            <p className="text-xs text-gray-500">
              Get updates and activity alerts via email.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailNotifs}
              onChange={() => setEmailNotifs(!emailNotifs)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-colors">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md ">
          <div>
            <p className="text-gray-800 font-medium">Push Notifications</p>
            <p className="text-xs text-gray-500">
              Receive push alerts on your devices.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={pushNotifs}
              onChange={() => setPushNotifs(!pushNotifs)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-colors">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md ">
          <div>
            <p className="text-gray-800 font-medium">SMS Notifications</p>
            <p className="text-xs text-gray-500">
              Get alerts via text message on your phone.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={smsNotifs}
              onChange={() => setSmsNotifs(!smsNotifs)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-colors">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end items-center space-x-3">
        <button className="px-4 py-2 rounded-md  text-gray-700 hover:bg-gray-100 text-sm">
          Cancel
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}

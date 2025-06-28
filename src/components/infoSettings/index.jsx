import React from "react";

export default function InfoSettings() {
  return (
    <div className="bg-white  rounded-lg shadow-sm p-6 text-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        Your Information
      </h2>
      <p className="text-gray-600 mb-6">
        Download your data, view your activity log, and manage your account
        information.
      </p>

      <div className="space-y-6">
        {/* Download Your Information */}
        <div className="flex items-start justify-between bg-gray-50 p-4  rounded-md">
          <div>
            <p className="text-gray-800 font-medium">
              Download Your Information
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Get a copy of what you’ve shared on Facebook.
            </p>
          </div>
          <button className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Download
          </button>
        </div>

        {/* View Activity Log */}
        <div className="flex items-start justify-between bg-gray-50 p-4  rounded-md">
          <div>
            <p className="text-gray-800 font-medium">Activity Log</p>
            <p className="text-xs text-gray-500 mt-1">
              See your posts, interactions, and other activity.
            </p>
          </div>
          <button className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            View Log
          </button>
        </div>

        {/* Manage Account Info */}
        <div className="flex items-start justify-between bg-gray-50 p-4  rounded-md">
          <div>
            <p className="text-gray-800 font-medium">Manage Account Info</p>
            <p className="text-xs text-gray-500 mt-1">
              Update or delete your personal account details.
            </p>
          </div>
          <button className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function PrivacySettings() {
  const [searchEngineEnabled, setSearchEngineEnabled] = useState(false);

  return (
    <div className="bg-white  rounded-lg shadow-sm p-6 text-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        Privacy Settings
      </h2>
      <p className="text-gray-600 mb-6">
        Manage who can see your activity and how others find you on Facebook.
      </p>

      <div className="space-y-6">
        {/* Future Posts Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Who can see your future posts?
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Public</option>
            <option>Friends</option>
            <option>Only Me</option>
            <option>Custom</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            This controls the default audience for future posts.
          </p>
        </div>

        {/* Friend List Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Who can see your friend list?
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Public</option>
            <option>Friends</option>
            <option>Only Me</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Your friends will always be able to see mutual friends.
          </p>
        </div>

        {/* Search Engine Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Do you want search engines outside Facebook to link to your profile?
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="searchEngine"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={searchEngineEnabled}
              onChange={() => setSearchEngineEnabled(!searchEngineEnabled)}
            />
            <label htmlFor="searchEngine" className="ml-2 text-gray-700">
              Yes, include my profile in search engine results
            </label>
          </div>
          {/* <p className="text-xs text-gray-500 mt-1">
            Note: It may take some time for changes to be reflected in search
            engines.
          </p> */}
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
  );
}

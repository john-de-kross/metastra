import React, { useState } from "react";

export default function BlockingSettings() {
  const [blockedUsers, setBlockedUsers] = useState(["John Doe", "Jane Smith"]);
  const [newBlockedUser, setNewBlockedUser] = useState("");

  const handleAddBlockedUser = () => {
    if (newBlockedUser.trim() !== "") {
      setBlockedUsers([...blockedUsers, newBlockedUser.trim()]);
      setNewBlockedUser("");
    }
  };

  const handleUnblock = (name) => {
    setBlockedUsers(blockedUsers.filter((user) => user !== name));
  };

  return (
    <div className="bg-white  rounded-lg shadow-sm p-6 text-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Blocking</h2>
      <p className="text-gray-600 mb-6">Manage who you’ve blocked.</p>

      {/* Add Blocked User */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Block a user
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newBlockedUser}
            onChange={(e) => setNewBlockedUser(e.target.value)}
            placeholder="Enter name or profile URL"
            className="flex-1  -gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAddBlockedUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Block
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Blocking someone prevents them from seeing things you post on your
          timeline.
        </p>
      </div>

      {/* Blocked Users List */}
      {blockedUsers.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Blocked Users
          </h3>
          {blockedUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50  rounded-md"
            >
              <span className="text-gray-700">{user}</span>
              <button
                onClick={() => handleUnblock(user)}
                className="text-blue-600 hover:underline text-sm"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">You haven't blocked anyone.</p>
      )}

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

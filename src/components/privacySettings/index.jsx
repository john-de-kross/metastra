import React, { useState } from "react";

export default function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    searchEngine: true,
    messageRequests: "friends",
    timelinePosts: "friends",
    tagReview: false,
    locationSharing: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacy({
      ...privacy,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Privacy Settings:", privacy);
    // TODO: Send settings to backend with axios.post(...)
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-2xl">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Privacy Settings
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-700">
        {/* Profile Visibility */}
        <div>
          <label className="block font-semibold mb-1">
            Who can see your profile?
          </label>
          <select
            name="profileVisibility"
            value={privacy.profileVisibility}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>

        {/* Search Engine */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="searchEngine"
            checked={privacy.searchEngine}
            onChange={handleChange}
          />
          <label className="text-sm">
            Allow search engines to link to your profile
          </label>
        </div>

        {/* Message Requests */}
        <div>
          <label className="block font-semibold mb-1">
            Who can message you?
          </label>
          <select
            name="messageRequests"
            value={privacy.messageRequests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="noOne">No One</option>
          </select>
        </div>

        {/* Timeline Posts */}
        <div>
          <label className="block font-semibold mb-1">
            Who can post on your timeline?
          </label>
          <select
            name="timelinePosts"
            value={privacy.timelinePosts}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="onlyMe">Only Me</option>
          </select>
        </div>

        {/* Tag Review */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="tagReview"
            checked={privacy.tagReview}
            onChange={handleChange}
          />
          <label>Review tags before they appear on your timeline</label>
        </div>

        {/* Location Sharing */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="locationSharing"
            checked={privacy.locationSharing}
            onChange={handleChange}
          />
          <label>Allow apps to access your location</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

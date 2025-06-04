import React, { useState } from "react";
import { FaUserPlus, FaCommentDots, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const allNotifications = [
  {
    id: 1,
    icon: <FaUserPlus className="text-blue-500" />,
    message: "John Doe sent you a friend request",
    time: "2h ago",
    link: "/friend-requests",
    read: false,
  },
  {
    id: 2,
    icon: <FaCommentDots className="text-green-500" />,
    message: "Anna commented on your post",
    time: "4h ago",
    link: "/post/123",
    read: true,
  },
  {
    id: 3,
    icon: <FaThumbsUp className="text-pink-500" />,
    message: "Mike liked your photo",
    time: "1d ago",
    link: "/photo/456",
    read: false,
  },
];

const Notifications = ({ open }) => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications =
    activeTab === "unread"
      ? allNotifications.filter((n) => !n.read)
      : allNotifications;

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } absolute right-1 top-14 w-96 bg-white shadow-lg rounded-lg z-50`}
    >
      {/* Header with Tabs */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <div className="flex space-x-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2 py-1 rounded ${
              activeTab === "all" ? "bg-gray-200" : "text-gray-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`px-2 py-1 rounded ${
              activeTab === "unread" ? "bg-gray-200" : "text-gray-500"
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No notifications.
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <Link
              to={n.link}
              key={n.id}
              className={`flex items-start p-4 hover:bg-gray-100 ${
                !n.read ? "bg-gray-50" : ""
              }`}
            >
              <div className="mt-1 mr-3">{n.icon}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{n.message}</p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3  text-center">
        <Link
          to="/notifications"
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          See all
        </Link>
      </div>
    </div>
  );
};

export default Notifications;

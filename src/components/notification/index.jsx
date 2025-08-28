import React, { useEffect, useState } from "react";
import { FaUserPlus, FaCommentDots, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const Notifications = ({ open }) => {
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [activeTab, setActiveTab] = useState("all");
  const { socketRef } = useUserContext(); // Access socketRef from context

  // Filter notifications based on the active tab
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const friendRequests = filteredNotifications.filter(
    (n) => n.type === "friendRequest"
  );

  const otherNotifications = filteredNotifications.filter(
    (n) => n.type !== "friendRequest"
  );

  // Listen for real-time notifications

  useEffect(() => { if (socketRef?.current) {
    const handlefriendRequest = (friendRequest) => {
      console.log("Received friend request:", friendRequest);
      setNotifications((prev) => [friendRequest, ...prev]);
    };
    
    socketRef.current.on("friendRequest", handlefriendRequest);

    return () => {
      socketRef.current.off("friendRequest", handlefriendRequest);

    };
  }
}, [socketRef]);

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } absolute right-1 top-14 w-96 bg-white shadow-lg rounded-lg z-50`}
    >
      {/* Header with Tabs */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
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

      {/* Friend Requests Section */}
      {friendRequests.length > 0 && (
        <div className="border-b">
          <h3 className="px-4 py-2 text-sm font-semibold text-gray-600">
            Friend Requests
          </h3>
          <div className="max-h-40 overflow-y-auto">
            {friendRequests.map((n) => (
              <div
                key={n.id}
                className="flex items-start p-4 hover:bg-gray-100"
              >
                <div className="mt-1 mr-3">{n.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Accept
                  </button>
                  <button className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Notifications Section */}
      <div>
        <h3 className="px-4 py-2 text-sm font-semibold text-gray-600">
          Notifications
        </h3>
        <div className="max-h-60 overflow-y-auto">
          {otherNotifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications.
            </div>
          ) : (
            otherNotifications.map((n) => (
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
      </div>

      {/* Footer */}
      <div className="p-3 text-center">
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
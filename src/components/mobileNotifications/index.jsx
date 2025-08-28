import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaUserPlus,
  FaCommentDots,
  FaThumbsUp,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Navbar from "../navBar";

const MobileNotifications = () => {
  const [notifications, setNotifications] = useState([]); // State for notifications
  const { socketRef } = useUserContext(); // Access socketRef from context
  const navigate = useNavigate(); // For navigating back

  // Fetch notifications (mock or from API)
  useEffect(() => {
    // Example: Fetch initial notifications from an API
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://example.com/api/notifications", {
          credentials: "include",
        });
        const data = await response.json();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    // Listen for real-time notifications
    if (socketRef?.current) {
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
    <div className="md:hidden">
      <Navbar />
      <div className="w-full h-screen bg-gray-100 mt-26">
        {/* Header */}
        <div className="flex items-center px-4 py-3 bg-white shadow-md">
          <button onClick={() => navigate(-1)} className="mr-4">
            <FaArrowLeft className="text-gray-700 text-lg" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        </div>

        {/* Notifications List */}
        <div className="p-4">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No notifications yet.
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start p-4 bg-white shadow rounded-lg"
                >
                  <div className="mr-3">
                    {n.type === "friendRequest" && (
                      <FaUserPlus className="text-blue-500 text-lg" />
                    )}
                    {n.type === "comment" && (
                      <FaCommentDots className="text-green-500 text-lg" />
                    )}
                    {n.type === "like" && (
                      <FaThumbsUp className="text-pink-500 text-lg" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{n.message}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                  {n.type === "friendRequest" && (
                    <div className="flex items-center gap-2">
                      <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Accept
                      </button>
                      <button className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNotifications;

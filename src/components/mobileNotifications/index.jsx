import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Navbar from "../navBar";
import axios from "axios";

const MobileNotifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const { request, setRequest } = useUserContext();

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

  useEffect(() => {
    axios
      .get(
        "https://metastra-server.onrender.com/api/v1/users/get-all-requests",
        { withCredentials: true }
      )
      .then((res) => {
        setRequest(res.data.data.requests);
      })
      .catch((err) => console.log(err));
  }, [notifications, setRequest]);

  return (
    <div className="block md:hidden w-full h-screen bg-gray-100">
      {/* Mobile Navbar */}
      <Navbar />

      {/* Notifications Panel */}
      <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] mt-10 bg-white shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 ">
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          <div className="flex space-x-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded ${
                activeTab === "all" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`px-3 py-1 rounded ${
                activeTab === "unread" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-2 mt-2">
          {/* Friend Requests */}
          {request?.length > 0 && (
            <div className="">
              {/* <h3 className="px-4 py-2 text-sm font-semibold text-gray-600 ">
                Friend Requests
              </h3> */}
              {request.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 bg-gray-100 rounded-lg cursor-pointer mb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={n.sender.profilePics}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p className="text-sm text-gray-800 capitalize">
                      {n.sender.firstname} {n.sender.surname}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Accept
                    </button>
                    <button className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Notifications */}
          <div>
            {/* <h3 className="px-4 py-2 text-sm font-semibold text-gray-600">
              Notifications
            </h3> */}
            {otherNotifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No other notifications.
              </div>
            ) : (
              otherNotifications.map((n) => (
                <Link
                  to={n.link}
                  key={n.id}
                  className={`flex items-start p-4 hover:bg-gray-50 ${
                    !n.read ? "bg-gray-50" : ""
                  }`}
                >
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
        <div className="p-3 border-t text-center">
          <Link
            to="/notifications"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            See all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNotifications;

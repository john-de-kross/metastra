import React, { useState } from "react";
import FriendCard from "../../components/friendCard";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const FriendRequest = () => {
  const suggestions = [
    {
      name: "Daniel Stone",
      mutual: 2,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      _id: "1",
    },
    {
      name: "Lina Park",
      mutual: 4,
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      _id: "2",
    },
    {
      name: "George Smith",
      mutual: 1,
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      _id: "3",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      _id: "4",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      _id: "5",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      _id: "6",
    },
  ];

  // const requests = [
  //   {
  //     name: "Sarah James",
  //     mutual: 8,
  //     image: "https://randomuser.me/api/portraits/women/1.jpg",
  //     _id: "1",
  //   },
  //   {
  //     name: "Mark Vane",
  //     mutual: 3,
  //     image: "https://randomuser.me/api/portraits/men/2.jpg",
  //     _id: "2",
  //   },
  //   {
  //     name: "Emily Chen",
  //     mutual: 5,
  //     image: "https://randomuser.me/api/portraits/women/3.jpg",
  //     _id: "3",
  //   },
  //   {
  //     name: "Fiona Bell",
  //     mutual: 6,
  //     image: "https://randomuser.me/api/portraits/women/7.jpg",
  //     _id: "4",
  //   },
  //   {
  //     name: "Fiona Bell",
  //     mutual: 6,
  //     image: "https://randomuser.me/api/portraits/women/7.jpg",
  //     _id: "5",
  //   },
  //   {
  //     name: "Fiona Bell",
  //     mutual: 6,
  //     image: "https://randomuser.me/api/portraits/women/7.jpg",
  //     _id: "6",
  //   },
  //   {
  //     name: "Fiona Bell",
  //     mutual: 6,
  //     image: "https://randomuser.me/api/portraits/women/7.jpg",
  //     _id: "7",
  //   },
  //   {
  //     name: "Fiona Bell",
  //     mutual: 6,
  //     image: "https://randomuser.me/api/portraits/women/7.jpg",
  //     _id: "8",
  //   },
  // ];
  const { request, setRequest, setClickedUser } = useUserContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);

  return (
    <div>
      <div className="flex-1 overflow-y-auto px-2 mt-2 md:mt-12">
        {/* Friend Requests */}
        {request?.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* <h3 className="px-4 py-2 text-sm font-semibold text-gray-600 ">
                Friend Requests
              </h3> */}
            {request.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 bg-gray-100 rounded-lg cursor-pointer mb-2"
                onClick={() => {
                  setClickedUser(n.sender._id);
                  localStorage.setItem("userId", n.sender._id);
                  console.log(
                    "Navigating to profile of:",
                    n.sender._id,
                    n.sender.firstname
                  );
                  navigate(`/profile`);
                }}
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
        {request?.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p>No friend request at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;

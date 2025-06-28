import React from "react";

// Mock friend data
const friends = [
  {
    name: "Sarah James",
    mutual: 12,
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Mark Vane",
    mutual: 8,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Emily Chen",
    mutual: 5,
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Fiona Bell",
    mutual: 10,
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    name: "Daniel Stone",
    mutual: 6,
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Lina Park",
    mutual: 3,
    image: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    name: "George Smith",
    mutual: 7,
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Maria Gomez",
    mutual: 9,
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
];

const AllFriends = () => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">All Friends</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {friends.map((friend, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition"
          >
            <img
              src={friend.image}
              alt={friend.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {friend.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {friend.mutual} mutual friends
            </p>
            <button className="text-sm text-blue-600 hover:underline">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFriends;

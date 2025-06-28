import React from "react";
import FriendCard from "../../components/friendCard";

const FriendRequest = () => {
  const suggestions = [
    {
      name: "Daniel Stone",
      mutual: 2,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Lina Park",
      mutual: 4,
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "George Smith",
      mutual: 1,
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
  ];

  const requests = [
    {
      name: "Sarah James",
      mutual: 8,
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Mark Vane",
      mutual: 3,
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Emily Chen",
      mutual: 5,
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Fiona Bell",
      mutual: 6,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
  ];
  return (
    <div>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Friend Requests</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  pb-2">
          {requests.map((user, index) => (
            <FriendCard key={index} {...user} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">People You May Know</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {suggestions.map((user, index) => (
            <FriendCard
              key={index}
              {...user}
              buttonText="Add Friend"
              secondary="Remove"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FriendRequest;

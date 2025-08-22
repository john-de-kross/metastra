import React, { useEffect, useState } from "react";
import FriendCard from "../../components/friendCard";
import axios from "axios";
import { useUserContext } from "../../context/userContext";

// Mock suggestion data
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
    name: "Tony Alvarez",
    mutual: 5,
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    name: "Maria Gomez",
    mutual: 3,
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

const Suggestions = () => {
  const { mock, refreshUser, clickedUser, setClickedUser } = useUserContext();

  useEffect(() => {
    console.log(mock);
  }, []);

  return (
    <div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mock.users.map((user) => (
            <FriendCard
              key={user._id}
              id={user._id}
              name={`${user.firstname} ${user.surname}`}
              image={user.profilePics}
              mutual={Math.floor(Math.random() * 10)}
              primaryButton={{
                label: "Add Friend",
                onClick: () => console.log("Add friend:", user._id),
              }}
              secondaryButton={{
                label: "Delete",
                onClick: () => console.log("Delete:", user._id),
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Suggestions;

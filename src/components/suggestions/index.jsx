import React from "react";
import FriendCard from "../../components/friendCard";

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
  return (
    <div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {suggestions.map((user, index) => (
            <FriendCard
              key={index}
              name={user.name}
              image={user.image}
              mutual={user.mutual}
              buttonText="Add Friend"
              secondary="Remove"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Suggestions;

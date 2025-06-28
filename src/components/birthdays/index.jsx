import React from "react";
import { MdCake } from "react-icons/md";

// Sample data
const todayBirthdays = [
  {
    name: "Sarah James",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Mark Vane",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const upcomingBirthdays = [
  {
    name: "Emily Chen",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    date: "Jun 30",
  },
  {
    name: "Daniel Stone",
    image: "https://randomuser.me/api/portraits/men/26.jpg",
    date: "Jul 1",
  },
  {
    name: "Lina Park",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    date: "Jul 2",
  },
];

const Birthdays = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Birthdays</h2>
      <div className="p-4 max-w-2xl mx-auto">
        {/* Today’s Birthdays */}
        <section className="bg-white rounded-md shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎉 Today's Birthdays
          </h3>
          {todayBirthdays.length > 0 ? (
            <ul className="space-y-4">
              {todayBirthdays.map((person, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{person.name}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <MdCake className="text-pink-500 mr-1" />
                        <span>Birthday today</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-700">
                    Send Message
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No birthdays today.</p>
          )}
        </section>

        {/* Upcoming Birthdays */}
        <section className="bg-white rounded-md shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📅 Upcoming Birthdays
          </h3>
          {upcomingBirthdays.length > 0 ? (
            <ul className="space-y-4">
              {upcomingBirthdays.map((person, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No upcoming birthdays.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Birthdays;

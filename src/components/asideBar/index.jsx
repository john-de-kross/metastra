import React from "react";
import {
  ChatIcon,
  VideoCameraIcon,
//   DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import dp from "../../assets/img/user.png";
import ads from "../../assets/img/ads.jpg";
const Aside = () => {
  // Mock data for contacts 
  const contacts = [
    {
      id: 1,
      name: "Alice Smith",
      profileImage: dp,
      online: true,
    },
    {
      id: 2,
      name: "Bob Johnson",
      profileImage: dp,
      online: false,
    },
    {
      id: 3,
      name: "Carol Williams",
      profileImage: dp,
      online: true,
    },
    {
      id: 4,
      name: "David Brown",
      profileImage: dp,
      online: false,
    },
  ];

  // Mock data for pages 
  const pages = [
    {
      id: 1,
      name: "Metastra Community",
      profileImage: dp,
    },
  ];

  return (
    <div className="hidden md:block w-80  border-l border-gray-200 fixed top-14 right-0 h-[calc(100vh-3.5rem)] overflow-y-auto z-0">
      <div className="flex flex-col p-4 space-y-4">
        {/* Your Pages Section (Optional) */}
        {pages.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-gray-500 text-sm font-semibold px-2">
              Your Pages
            </h3>
            {pages.map((page) => (
              <Link
                key={page.id}
                to={`/page/${page.id}`}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={page.profileImage}
                  alt={page.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-800 text-sm font-medium">
                  {page.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Contacts Section */}
        <div className="space-y-2">
          <h3 className="text-gray-500 text-sm font-semibold px-2">Contacts</h3>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
            >
              <Link
                to={`/profile/${contact.id}`}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <img
                    src={contact.profileImage}
                    alt={contact.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <span className="text-gray-800 text-sm font-medium">
                  {contact.name}
                </span>
              </Link>
              <div className="flex space-x-1">
                <button className="p-1 rounded-full hover:bg-gray-200">
                  <ChatIcon className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-200">
                  <VideoCameraIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsored Section */}
        <div className="space-y-2">
          <h3 className="text-gray-500 text-sm font-semibold px-2">
            Sponsored
          </h3>
          <div className="p-2">
            <div className="bg-gray-100 rounded-lg p-3">
              <img
                src={ads}
                alt="Ad"
                className="w-full h-20 object-cover rounded-md mb-2"
              />
              <h4 className="text-gray-800 text-sm font-semibold">Shopify</h4>
              <p className="text-gray-600 text-xs">Build with the best here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;

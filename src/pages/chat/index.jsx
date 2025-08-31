import React, { useState } from "react";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import Navbar from "../../components/navBar";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);

  const conversations = [
    {
      id: 1,
      name: "Jane Doe",
      lastMessage: "Hey! How are you?",
      profile: "https://via.placeholder.com/40",
      messages: [
        { from: "Jane", text: "Hey! How are you?" },
        { from: "Me", text: "I’m good, you?" },
      ],
    },
    {
      id: 2,
      name: "John Smith",
      lastMessage: "Let’s meet tomorrow",
      profile: "https://via.placeholder.com/40",
      messages: [
        { from: "John", text: "Let’s meet tomorrow" },
        { from: "Me", text: "Sure! What time?" },
      ],
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 mt-16 bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            activeChat ? "hidden md:block" : "block"
          } w-full md:w-1/3 lg:w-1/4 bg-white border-r overflow-y-auto`}
        >
          <div className="p-4 ">
            <h2 className="text-xl font-bold">Chats</h2>
          </div>
          <div>
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
                  activeChat?.id === chat.id ? "bg-gray-200" : ""
                }`}
              >
                <img
                  src={chat.profile}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{chat.name}</p>
                  <p className="text-sm text-gray-500 truncate w-40">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`${
            activeChat ? "flex" : "hidden md:flex"
          } flex-1 flex-col mt-10`}
        >
          {/* Top bar */}
          <div className="p-4 bg-white  flex items-center gap-3">
            {activeChat ? (
              <>
                {/* Back button only on mobile */}
                <button
                  onClick={() => setActiveChat(null)}
                  className="md:hidden text-gray-600"
                >
                  <FaArrowLeft />
                </button>
                <img
                  src={activeChat.profile}
                  alt={activeChat.name}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-lg font-semibold">{activeChat.name}</h2>
              </>
            ) : (
              <h2 className="text-lg font-semibold">Messages</h2>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeChat ? (
              activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 flex ${
                    msg.from === "Me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.from === "Me"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-20 hidden md:block">
                Select a conversation to start chatting.
              </p>
            )}
          </div>

          {/* Input */}
          {activeChat && (
            <div className="p-4 bg-white border-t flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <FaPaperPlane /> Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

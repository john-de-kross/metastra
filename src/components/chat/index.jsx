import React, { useState } from "react";
import ChatWindow from "../chatWindow";
import { useUserContext } from "../../context/userContext";

const Chat = () => {
  const { chatActive } = useUserContext();
  const [openChats, setOpenChats] = useState([]);

  const friends = JSON.parse(localStorage.getItem("friends")) || [];

  const openChat = (user) => {
    const normalizedUser = {
      ...user,
      id: user._id,
      name: `${user.firstname} ${user.surname}`,
      profile: user.profilePics,
    };

    setOpenChats((prev) => {
      const exists = prev.find((c) => c.id === normalizedUser.id);
      const others = prev.filter((c) => c.id !== normalizedUser.id);

      if (exists) {
        return [...others, { ...exists, minimized: false }];
      }
      return [...others, { ...normalizedUser, minimized: false }];
    });
  };

  const toggleMinimize = (id) => {
    setOpenChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, minimized: !c.minimized } : c))
    );
  };

  const closeChat = (id) => {
    setOpenChats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      {chatActive && (
        <div
          className="absolute top-12 right-4 z-[100] w-[400px] h-[calc(100vh-60px)]
          bg-gradient-to-b from-[#f0f7ff] via-white to-[#f9fbff] shadow-2xl 
          rounded-2xl border border-gray-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center px-5 py-3 
          bg-gradient-to-r from-[#0866FF] to-[#0aa4f6] text-white"
          >
            <h2 className="font-semibold text-lg">💬 Chats</h2>
            <button className="hover:scale-110 transition">⋮</button>
          </div>

          {/* Search */}
          <div className="px-4 py-3 bg-gray-50 border-b">
            <input
              type="text"
              placeholder="Search messages"
              className="rounded-full px-4 py-2 w-full text-sm bg-white 
              border border-gray-200 focus:border-[#0866FF] focus:ring-1 
              focus:ring-[#0866FF] transition outline-none shadow-sm"
            />
          </div>

          {/* Friends list */}
          <div
            className="flex-1 overflow-y-auto px-2 pb-3 space-y-2"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {friends.map((chat, index) => (
              <div
                key={chat._id}
                onClick={() => {
                  openChat(chat);
                  localStorage.setItem("userId", chat._id);
                }}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer
                hover:scale-[1.02] transition transform
                ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-[#e0f2ff] to-[#f0faff]"
                    : "bg-gradient-to-r from-[#fef6e4] to-[#fff8f0]"
                }`}
              >
                {/* Profile */}
                <div className="relative">
                  <img
                    src={chat?.profilePics}
                    alt={chat?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  {chat?.isOnline && (
                    <span
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 
                    bg-green-500 border-2 border-white rounded-full shadow-sm"
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {`${chat?.firstname} ${chat?.surname}`}
                  </div>
                  <div className="text-sm text-gray-600 truncate italic">
                    {chat?.lastMessage || "No chat yet"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat dock */}
      <div className="hidden md:block fixed bottom-4 right-4 z-[200]">
        <div className="flex items-end gap-3 max-w-[calc(100vw-96px)] overflow-x-auto pr-2">
          {openChats.map((chat) => (
            <ChatWindow
              key={chat.id}
              id={chat.id}
              chat={chat}
              onClose={closeChat}
              onToggleMinimize={toggleMinimize}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chat;

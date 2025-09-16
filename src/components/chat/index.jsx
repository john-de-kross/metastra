import React, { useState } from "react";
import ChatWindow from "../ChatWindow";
import { useUserContext } from "../../context/userContext";

const Chat = () => {
  const { chatActive } = useUserContext();
  const [openChats, setOpenChats] = useState([]);

  // const conversations = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     profile: "https://via.placeholder.com/40",
  //     lastMessage: "Hey, how are you?",
  //     isOnline: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     profile: "https://via.placeholder.com/40",
  //     lastMessage: "See you tomorrow!",
  //     isOnline: false,
  //   },
  //   // add more users as needed
  // ];

  const friends = JSON.parse(localStorage.getItem("friends")) || [];

  // Open chat (if exists bring to front and expand; otherwise add)
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
          className={`absolute p-4 top-12 right-0 z-[100] w-[380px] h-[calc(100vh-48px)] bg-white shadow-lg rounded-xl`}
        >
          <div className="w-full flex justify-between items-center font-bold text-lg">
            <div>Chats</div>
            <div>...</div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search messages"
              className="rounded-full p-4 w-full mt-2 outline-none bg-gray-100 focus:bg-white focus:ring-1 focus:ring-[#0866FF]"
            />
          </div>

          <div
            className="divide-y mt-4 overflow-auto"
            style={{ maxHeight: "calc(100vh - 220px)" }}
          >
            {friends.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  openChat(chat);
                  console.log(chat._id);
                  localStorage.setItem('userId', chat._id)
                }}
                className="flex items-center gap-3 p-4 bg-gray-100 cursor-pointer mb-2 "
              >
                <div className="relative">
                  <img
                    src={chat?.profilePics}
                    alt={chat?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {chat?.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{`${chat?.firstname} ${chat?.surname} `}</div>
                  <div className="text-sm text-gray-500">
                    {chat?.lastMessage || "no chat"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat dock: hidden on small screens, visible md+ */}
      <div className="hidden md:block fixed bottom-4 right-4 z-[200]">
        {/* horizontal scrolling container so many windows don't overflow off-screen */}
        <div className="flex items-end gap-3 max-w-[calc(100vw-96px)] overflow-x-auto pr-2">
          {openChats.map((chat) => (
            <ChatWindow
              key={chat.id}
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

import React, { useEffect, useState } from "react";
import { FaMinus, FaTimes } from "react-icons/fa";
import { useUserContext } from "../../context/userContext";
import axios from "axios";
import toastAlert from "../ALERT";

const ChatWindow = ({ id, chat, onClose, onToggleMinimize }) => {
  const { socketRef } = useUserContext();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("userId");
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    socketRef.current.on("receive_message", (message) => {
      console.log("📩 Message received via socket:", message);
      setMessages((prev) => [...prev, message]); // ✅ add received message
    });

    return () => {
      socketRef.current.off("receive_message");
    };
  }, [socketRef]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const messageData = {
      userId: userId,
      message: text,
      senderId: loggedInUser,
    };

    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/message",
        messageData,
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toastAlert.success("Message sent");
      }

      socketRef.current.emit("send_message", messageData);

      setMessages((prev) => [...prev, messageData]); // ✅ show sent message immediately
      setText(""); // clear input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      className="w-80 bg-white shadow-lg rounded-t-lg border flex flex-col"
      style={{ minWidth: 320 }}
      onClick={() => {
        localStorage.setItem("userId", id);
        console.log("newId", id);
      }}
    >
      {/* Header */}
      <div
        onClick={() => onToggleMinimize(chat.id)}
        className="flex justify-between items-center p-2 bg-slate-800 text-slate-100 rounded-t-lg cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <img
            src={chat.profilePics}
            alt={chat.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold text-sm truncate">
            {`${chat.firstname} ${chat.surname}`}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMinimize(chat.id);
            }}
            className="p-1 rounded hover:bg-slate-700/40"
            title={chat.minimized ? "Expand" : "Minimize"}
          >
            <FaMinus size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(chat.id);
            }}
            className="p-1 rounded hover:bg-red-600/70"
            title="Close"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      {!chat.minimized && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 text-sm text-gray-700">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 ${
                  msg.senderId === loggedInUser ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-3 py-1 rounded-lg ${
                    msg.senderId === loggedInUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t relative">
            <input
              type="text"
              value={text}
              placeholder="Type a message..."
              className="w-full border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0866FF]"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="absolute top-0 right-0 p-2 rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700/40"
              onClick={sendMessage}
            >
              send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;

import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa"; // ✅ add this at top
import {
  FaMinus,
  FaTimes,
  FaPhoneAlt,
  FaVideo,
  FaInfoCircle,
  FaPaperPlane,
  FaSmile,
} from "react-icons/fa";
import { useUserContext } from "../../context/userContext";
import axios from "axios";
import toastAlert from "../ALERT";

const ChatWindow = ({ id, chat, onClose, onToggleMinimize }) => {
  const { socketRef } = useUserContext();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const readReceiptRef = useRef(null)

  const userId = localStorage.getItem("userId");
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    socketRef.current.on("receive_message", (message) => {
      console.log("📩 Message received via socket:", message);
      toastAlert.success("new message:", message.message);
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("typing", (data) => {
      if (data.senderId === userId) {
        setIsTyping(true);
        // clear typing after 2s
        setTimeout(() => setIsTyping(false), 5000);
      }
    });

    socketRef.current.on("messageSeen", ({ messageId, userId, senderId}) => {
      console.log("Message seen:", messageId, userId, senderId);
      setMessages((prevMessages) => (
        prevMessages.map((msg) => (
          msg.id === messageId ? {...msg, seen: true} : msg
        ))
      ) )
    })

    return () => {
      socketRef.current.off("receive_message");
      socketRef.current.off("typing");
    };
  }, [socketRef, userId]);

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        console.log("fetching messages for id:", id);
        const response = await axios.get(
          `https://metastra-server.onrender.com/api/v1/users/chats/${id}`,
          { withCredentials: true }
        );

        if (response.data?.success === true) {
          setMessages(response.data.data.chatHistory || []);
        }
        console.log("Fetched messages:", response.data.data.chatHistory);
        console.log("messages:", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id]);


  const sendMessage = async () => {
    if (!text.trim()) return;

    const messageData = {
      userId,
      message: text,
      senderId: loggedInUser,
      timestamp: new Date().toISOString(),
      seen: false,
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

      setMessages((prev) => [...prev, messageData]);
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!messages.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          console.log("Message seen:", messages[messages.length - 1])
          const lastMsg = messages[messages.length - 1];
          if (lastMsg.senderId === loggedInUser) return;
          console.log("lastMsg", lastMsg._id, id, loggedInUser)
          socketRef.current.emit("markAsSeen", {
            messageId: lastMsg._id,
            userId: id,
            senderId: loggedInUser
          })
        }
      },
      { threshold: 0.5 }
    );
    if (readReceiptRef.current) {
      observer.observe(readReceiptRef.current)
    }
    return () => {
      if (readReceiptRef.current) {
        observer.unobserve(readReceiptRef.current);
      }
      observer.disconnect();
    }
  }, [messages]);

  return (
    <div
      className="relative w-80 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col  max-h-[350px] overflow-y-scroll"
      style={{ minWidth: 320 }}
      onClick={() => {
        localStorage.setItem("userId", id);
        console.log("newId", id);
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gray-100 border-b z-10">
        {/* Left: Profile + name */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onToggleMinimize(chat.id)}
        >
          <img
            src={chat.profilePics}
            alt={chat.name}
            className="w-9 h-9 rounded-full object-cover border"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-sm text-gray-800 truncate">
              {`${chat.firstname} ${chat.surname}`}
            </span>
            <span className="text-xs text-gray-500">Active now</span>
          </div>
        </div>

        {/* Center/Right: 3 main action icons */}
        <div className="flex items-center gap-3 ml-auto ">
          <button
            className="p-1 rounded-full hover:bg-gray-200"
            title="Voice Call"
          >
            <FaPhoneAlt size={18} />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200"
            title="Video Call"
          >
            <FaVideo size={18} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200" title="Info">
            <FaInfoCircle size={18} />
          </button>
        </div>
      </div>
      {/*  Right: Minimize & Close  */}
      <div className="absolute right-2 top-[-2] flex gap-1 z-50">
        <button
          onClick={() => onToggleMinimize(chat.id)}
          className="p-1 rounded hover:bg-gray-200 bg-gray-400"
          title={chat.minimized ? "Expand" : "Minimize"}
        >
          <FaMinus size={13} />
        </button>
        <button
          onClick={() => onClose(chat.id)}
          className="p-1 rounded hover:bg-red-100 text-white bg-red-400"
          title="Close"
        >
          <FaTimes size={13} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col bg-white pt-[60px] pb-[60px] overflow-y-auto">
        {!chat.minimized && (
          <div className="flex-1 p-3 text-sm overflow-y-auto">
            {messages.map((msg, idx) => {
              const sender = msg.sender || msg.senderId;
              const text = msg.content || msg.message;
              const time = msg.timestamp || msg.sentAt || msg.createdAt;
              const seen = msg.seen || false;

              return (
                <div
                  key={idx}
                  ref={idx === messages.length - 1 ? readReceiptRef : null}
                  className={`mb-2 flex ${
                    sender === loggedInUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                      sender === loggedInUser
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div>{text}</div>

                    {time && (
                      <div
                        className={`flex items-center gap-1 text-[10px] mt-1 ${
                          sender === loggedInUser
                            ? "justify-end text-gray-200"
                            : "justify-start text-gray-500"
                        }`}
                      >
                        <span>
                          {new Date(time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {/* ✅ checkmark only for own messages */}
                        {sender === loggedInUser && (
                          <div className="ml-1 flex">
                            {/* Sent (default) */}
                            {!seen && (
                              <FaCheck size={10} className="text-gray-300" />
                            )}

                            {/* Seen (blue double checks) */}
                            {seen && (
                              <>
                                <FaCheck size={10} className="text-white" />
                                <FaCheck
                                  size={10}
                                  className="text-white -ml-1"
                                />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="text-xs italic text-gray-500 px-3 py-1">
                {`${chat.firstname} is typing...`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t bg-gray-50 flex items-center gap-2 z-10">
        <button className="text-gray-500 hover:text-blue-500">
          <FaSmile size={18} />
        </button>
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setText(e.target.value);
            socketRef.current.emit("typing", {
              senderId: loggedInUser,
              receiverId: userId,
            });
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={sendMessage}
          title="Send"
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

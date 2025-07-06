import React, { useState } from "react";
import { FaThumbsUp, FaRegCommentAlt, FaShare } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import Navbar from "../navBar";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import toastAlert from "../../components/ALERT";

const PostDetail = () => {
  const { socketRef } = useUserContext();
  const [commentText, setCommentText] = useState("");
  const postDetail = JSON.parse(localStorage.getItem("clickedPostDetails"));
  const post = localStorage.getItem("clickedPost");

  const [commentInfo, setCommentInfo] = useState({
    postId: "",
    comment: "",
    imageUrl: "",
  });

  const handlePostComment = async (id) => {
    if (!commentInfo.comment.trim()) return;

    const payload = {
      comment: commentInfo.comment,
      postId: id,
      imageUrl: "",
    };

    try {
      console.log("Posting to server with ID:", id);
      const resp = await axios.post(
        `https://metastra-server.onrender.com/api/v1/users/comment-on-post/${id}`,
        payload,
        { withCredentials: true }
      );

      console.log("Response from server:", resp.data);
      socketRef.current?.emit("newComment", payload);
      toastAlert.success("Comment posted successfully");

      // Clear input
      setCommentInfo((prev) => ({ ...prev, comment: "" }));
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-fb-gray py-6 ">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto mt-18 md:mt-12 px-4">
        <aside className="hidden md:inline-block fixed top-[80px] lg:left-4 lg:w-[320px] space-y-6 z-10">
          <div>
            <h3 className="text-lg font-semibold text-[#050505] mb-3">
              Your Shortcuts
            </h3>
            <div className="space-y-2">
              <a
                href="/home"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                Home
              </a>
              <a
                href="/friends"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                Friends
              </a>
              <a
                href="/groups"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                Groups
              </a>
              <a
                href="/events"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                Events
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#050505] mb-3">
              Groups You Might Like
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-3">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-ffd391d2a931"
                  alt="Tech Enthusiasts Group"
                  className="w-12 h-12 rounded-full object-cover mb-2"
                />
                <p className="text-sm font-semibold text-[#050505]">
                  Tech Enthusiasts
                </p>
                <p className="text-xs text-gray-500">12K members</p>
                <button className="mt-2 bg-[#1B74E4] text-white text-xs py-1 px-3 rounded-md hover:bg-[#1A68D0]">
                  Join Group
                </button>
              </div>
              <div className="bg-white rounded-lg shadow p-3">
                <img
                  src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
                  alt="Travel Lovers Group"
                  className="w-12 h-12 rounded-full object-cover mb-2"
                />
                <p className="text-sm font-semibold text-[#050505]">
                  Travel Lovers
                </p>
                <p className="text-xs text-gray-500">8K members</p>
                <button className="mt-2 bg-[#1B74E4] text-white text-xs py-1 px-3 rounded-md hover:bg-[#1A68D0]">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="max-w-xl w-full mt-10 mx-auto bg-white rounded-lg shadow md:ml-[340px] lg:mr-[340px]">
          <div className="flex items-center gap-3 p-4">
            <img
              src={postDetail?.author?.profilePics || "/default-avatar.png"}
              className="w-10 h-10 rounded-full object-cover"
              alt="Author"
            />
            <div>
              <p className="text-gray-800 font-semibold">
                {postDetail?.author?.firstname} {postDetail?.author?.surname}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(postDetail?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {postDetail?.postText && (
            <p className="px-4 pb-2 text-gray-800 text-[15px] leading-snug">
              {postDetail?.postText}
            </p>
          )}
          {postDetail?.imageUrl && (
            <div className="w-full max-h-[600px] m-auto overflow-hidden max-w-lg">
              <img
                src={postDetail.imageUrl}
                alt="Post"
                className="w-full h-full object-contain border-2"
              />
            </div>
          )}
          <div className="px-4 text-sm text-gray-500 mt-2 border-b pb-2">
            <span>135 Likes</span> · <span>29 Comments</span>
          </div>
          <div className="flex justify-around text-gray-600 border-b text-sm font-medium">
            <button className="py-3 flex items-center gap-2 hover:text-fb-blue">
              <FaThumbsUp /> Like
            </button>
            <button className="py-3 flex items-center gap-2 hover:text-fb-blue">
              <FaRegCommentAlt /> Comment
            </button>
            <button className="py-3 flex items-center gap-2 hover:text-fb-blue">
              <FaShare /> Share
            </button>
          </div>
          <div className="max-w-lg flex items-center gap-3 px-4 py-3">
            <img
              src={postDetail.author?.profilePics}
              className="w-9 h-9 rounded-full object-cover"
              alt="You"
            />
            <div className="flex-grow bg-gray-100 rounded-full px-3 py-2 flex items-center">
              <input
                type="text"
                value={commentInfo.comment}
                onChange={(e) => {
                  setCommentInfo({
                    postId: post,
                    comment: e.target.value,
                    imageUrl: "",
                  });
                  console.log(commentInfo);
                }}
                placeholder="Write a comment..."
                className="bg-transparent w-full text-sm outline-none"
              />
              <AiOutlineSend
                onClick={() => {
                  handlePostComment(post);
                }}
                className="text-fb-blue cursor-pointer"
              />
            </div>
          </div>
          <div className="max-w-lg px-4 py-3 space-y-4">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex gap-3">
                <img
                  src="/default-avatar.png"
                  className="w-8 h-8 rounded-full object-cover"
                  alt="User"
                />
                <div className="bg-gray-100 rounded-xl px-4 py-2 w-full">
                  <p className="text-sm font-semibold text-gray-800">
                    Jane Doe
                  </p>
                  <p className="text-sm text-gray-700">Nice post!</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden lg:inline-block fixed top-[80px] right-4 w-[320px] space-y-6 z-10">
          <div>
            <h3 className="text-lg font-semibold text-[#050505] mb-3">
              Sponsored
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                  alt="Premium Headphones Ad"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h4 className="text-sm font-semibold text-[#050505]">
                  Amazing Product
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  Discover the best deals today!
                </p>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1B74E4] text-white text-sm py-1 px-3 rounded-md hover:bg-[#1A68D0]"
                >
                  Learn More
                </a>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <img
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
                  alt="Trendy Fashion Ad"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h4 className="text-sm font-semibold text-[#050505]">
                  Exclusive Offer
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  Limited time discount!
                </p>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1B74E4] text-white text-sm py-1 px-3 rounded-md hover:bg-[#1A68D0]"
                >
                  Shop Now
                </a>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <img
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
                  alt="Morning Coffee Ad"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h4 className="text-sm font-semibold text-[#050505]">
                  New Arrivals
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  Check out our latest collection!
                </p>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1B74E4] text-white text-sm py-1 px-3 rounded-md hover:bg-[#1A68D0]"
                >
                  Explore Now
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#050505] mb-3">
              Trending Topics
            </h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                #TechNews
              </a>
              <a
                href="#"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                #TravelVibes
              </a>
              <a
                href="#"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                #Foodie
              </a>
              <a
                href="#"
                className="block p-2 text-[15px] font-medium text-[#050505] hover:bg-[#F0F2F5] rounded-md"
              >
                #FitnessGoals
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;

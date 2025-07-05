import React from "react";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";


const PostDetail = () => {
  return (
    <div className="w-full min-h-screen bg-fb-gray py-6 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-4">
        {/* Post Author */}
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-500">June 25, 2025</p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 mb-2">
            Just had a fantastic time at the beach! 🏖️ Loving this weather.
          </p>
          <img
            src="https://via.placeholder.com/600x300"
            alt="Post"
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Reactions */}
        <div className="flex justify-between items-center text-sm text-gray-600 border-b pb-2 mb-4">
          <span>120 Likes</span>
          <span>42 Comments</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around text-gray-600 text-sm font-medium border-b pb-2 mb-4">
          <button className="flex items-center gap-2 hover:text-fb-blue">
            <FaRegThumbsUp />
            Like
          </button>
          <button className="flex items-center gap-2 hover:text-fb-blue">
            <FaRegCommentDots />
            Comment
          </button>
          <button className="flex items-center gap-2 hover:text-fb-blue">
            <FaShare />
            Share
          </button>
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src="https://via.placeholder.com/35"
            alt="You"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex-grow flex items-center bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent w-full text-sm outline-none"
            />
            <AiOutlineSend className="text-fb-blue cursor-pointer" />
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {[1, 2, 3].map((comment) => (
            <div key={comment} className="flex items-start gap-3">
              <img
                src="https://via.placeholder.com/32"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-gray-100 p-3 rounded-xl w-full">
                <p className="text-sm font-semibold text-gray-800">
                  Jane Smith
                </p>
                <p className="text-sm text-gray-700">That's awesome!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

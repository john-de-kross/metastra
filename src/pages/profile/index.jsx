import React, { useState, useEffect } from "react";
import db from "../../assets/img/user.png";
import Navbar from "../../components/navBar";
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import { AiOutlinePlus } from "react-icons/ai";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tajrjpnn");
  // formData.append("cloud_name", "dg3kuzhgf");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dg3kuzhgf/image/upload",
      formData
    );
    return response.data.secure_url; // cloudinary url
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Timeline");
  const [about, setAbout] = useState({
    work: "",
    education: "",
    location: "",
    relationship: "",
    joined: "",
  });
  const [dpOption, setDpOption] = useState(false);
  const {
    userName,
    setUserName,
    profilePic,
    setProfilePic,
    coverPic,
    setCoverPic,
    bio,
    setBio,
    isLoading,
    setIsAuthenticated,
    // isAuthenticated,
  } = useUserContext();
  const dp =
    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740";

  const cp = "https://www.bing.com/8389c9d1-7b99-4e88-ade9-8ada6089e8a8";
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Just had a great day at the beach! 🏖️",
      date: "June 4, 2025",
      likes: 15,
      comments: 3,
    },
    {
      id: 2,
      content: "Loving my new job! #WorkHard",
      date: "June 3, 2025",
      likes: 10,
      comments: 1,
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ userName, bio, ...about });
  const [photos, setPhotos] = useState([
    "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
    "https://i.pinimg.com/736x/f0/eb/8b/f0eb8b6ed8975277054aecc4d2327f6d.jpg",
    "https://i.pinimg.com/736x/ce/05/28/ce05280419168eac1d02091c515b7de5.jpg",
    "https://i.pinimg.com/736x/3d/d9/cf/3dd9cf87ef0dee10d228c35871dfef9d.jpg",
    "https://i.pinimg.com/736x/2e/13/f8/2e13f818fa7e830e9ff084b97d67aabd.jpg",
  ]);

  // Placeholder data
  const friends = [
    { id: 1, name: "Jane Smith", pic: dp },
    { id: 2, name: "Mike Johnson", pic: dp },
    { id: 3, name: "Sarah Lee", pic: dp },
    { id: 4, name: "Tom Brown", pic: dp },
  ];
  const lifeEvents = [
    { year: 2023, event: "Started working at Tech Corp" },
    { year: 2020, event: "Graduated from XYZ University" },
  ];

  // Handle photo uploads
  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      console.error("Invalid file for profile pic");
      return;
    }

    const url = await uploadToCloudinary(file);

    if (url) {
      setProfilePic(url);

      // send to backend
      try {
        await axios.put(
          "https://metastra-server.onrender.com/api/v1/users/update-profile-pic",
          { profilePic: url },
          { withCredentials: true }
        );
      } catch (err) {
        if (err.response) {
          // Server responded with a status outside 2xx
          console.error("Backend update error (response):", {
            status: err.response.status,
            data: err.response.data,
            message: err.response.data?.message || "Unknown server error",
          });
          //user might not be logged in
          if (err.response.status === 401) {
            console.error("Unauthorized. User may need to log in again.");
            setIsAuthenticated(false);
            navigate("/");
          } else if (err.response.status === 500) {
            console.error("Internal server error. Please try again later.");
          }
        } else if (err.request) {
          // Request was made but no response received
          console.error("No response from backend:", err.request);
        } else {
          // Something else went wrong in setting up the request
          console.error("Unexpected Axios error:", err.message);
        }
      }
    }
  };

  const handleCoverPicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      console.error("Invalid file for cover pic");
      return;
    }

    const url = await uploadToCloudinary(file);
    if (url) {
      setCoverPic(url);

      //send to backend
      try {
        await axios.put(
          "https://metastra-server.onrender.com/api/v1/users/update-cover-pic",
          { coverPic: url },
          { withCredentials: true }
        );
      } catch (err) {
        if (err.response) {
          // Server responded with a status outside 2xx
          console.error("Backend update error (response):", {
            status: err.response.status,
            data: err.response.data,
            message: err.response.data?.message || "Unknown server error",
          });
          //user might not be logged in
          if (err.response.status === 401) {
            console.error("Unauthorized. User may need to log in again.");
            setIsAuthenticated(false);
            navigate("/");
          } else if (err.response.status === 500) {
            console.error("Internal server error. Please try again later.");
          }
        } else if (err.request) {
          // Request was made but no response received
          console.error("No response from backend:", err.request);
        } else {
          // Something else went wrong in setting up the request
          console.error("Unexpected Axios error:", err.message);
        }
      }
    }
  };

  // Handle adding photos to Photos section
  const handleAddPhotos = async (event) => {
    const files = Array.from(event.target.files);
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        console.error("Invalid photo file");
        continue;
      }

      const url = await uploadToCloudinary(file);
      if (url) {
        setPhotos((prev) => [url, ...prev]);
      }
    }
  };

  // Handle post creation
  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          content: newPost,
          date: new Date().toLocaleDateString(),
          likes: 0,
          comments: 0,
        },
        ...posts,
      ]);
      setNewPost("");
    }
  };

  // Handle profile editing
  const handleEditOpen = () => {
    setEditForm({ userName, bio, ...about });
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    setUserName(editForm.userName);
    setBio(editForm.bio);
    setAbout({
      work: editForm.work,
      education: editForm.education,
      location: editForm.location,
      relationship: editForm.relationship,
      joined: editForm.joined,
    });
    setIsEditing(false);
    // try {
    //   const profileRes = await axios.put(
    //     "https://metastra-server.onrender.com/api/v1/users/user-profile",
    //     { bio: bio },
    //     { withCredentials: true }
    //   );
    // } catch (error) {
    //   console.log("Refresh failed:", error);
    // }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  // Render tab content
  const renderContent = () => {
    switch (activeTab) {
      case "Timeline":
        return (
          <div>
            {/* Friends Preview */}
            <div className="bg-white p-4 shadow-sm rounded-lg">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Friends ({friends.length})
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="text-center flex flex-col justify-center items-center"
                  >
                    <img
                      src={friend.pic}
                      alt={friend.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <p className="text-sm text-fb-text-gray font-semibold mt-1 leading-5">
                      {friend.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Photos Preview */}
            <div className="bg-white p-4 shadow-sm rounded-lg">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Photos
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 9).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="User photo"
                    className="w-20 h-20 rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="bg-white p-4 mb-4 shadow rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <textarea
                  className="w-full p-2 h-10 rounded-full bg-gray-100  resize-none"
                  placeholder={`What's on your mind, ${userName}?`}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </div>
              <button
                className="w-50 flex justify-center items-center mx-auto bg-fb-blue text-white px-4 py-2 rounded-md bg-blue-700 disabled:opacity-50"
                onClick={handlePostSubmit}
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 mb-4 shadow rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-semibold">{userName}</p>
                    <p className="text-gray-600 text-sm">{post.date}</p>
                  </div>
                </div>
                <p className="mb-2">{post.content}</p>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t">
                  <button className="text-gray-600 hover:text-fb-blue">
                    Like
                  </button>
                  <button className="text-gray-600 hover:text-fb-blue">
                    Comment
                  </button>
                  <button className="text-gray-600 hover:text-fb-blue">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case "About":
        return (
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="mb-4">
              <h3 className="font-semibold">Overview</h3>
              <div className="flex items-center">
                <FaBriefcase
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p className=" flex items-center">
                  <strong>Work:</strong>&nbsp; {about.work}
                </p>
              </div>
              <div className="flex items-center">
                <IoMdSchool
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Education:</strong> {about.education}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Location:</strong> {about.location}
                </p>
              </div>
              <div className="flex items-center">
                <FaHandHoldingHeart
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Relationship:</strong> {about.relationship}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Joined:</strong> {about.joined}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Life Events</h3>
              {lifeEvents.map((event, index) => (
                <p key={index} className="text-gray-600">
                  <strong>{event.year}:</strong> {event.event}
                </p>
              ))}
            </div>
          </div>
        );
      case "Friends":
        return (
          <div className="bg-white p-4 shadow rounded-lg ">
            <h2 className="text-xl font-semibold mb-4 ">
              Friends ({friends.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <div key={friend.id} className="text-center">
                  <img
                    src={friend.pic}
                    alt={friend.name}
                    className="w-full h-32 rounded-md object-cover"
                  />
                  <p className="mt-2 font-semibold">{friend.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Photos":
        return (
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Photos</h2>
            <div className="mb-4">
              <label
                className="bg-fb-blue text-white px-4 py-2 rounded-md cursor-pointer bg-blue-700"
                aria-label="Add photos"
              >
                Add Photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddPhotos}
                />
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt="User photo"
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-gray-600">Select a tab to view content.</div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-fb-gray">
        <div className="text-xl font-semibold text-fb-blue">Loading...</div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-fb-gray">
      <Navbar />
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-sm">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  value={editForm.userName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, userName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-sm">Bio</label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none text-sm"
                  rows="3"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-sm">Work</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  value={editForm.work}
                  onChange={(e) =>
                    setEditForm({ ...editForm, work: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-sm">Education</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  value={editForm.education}
                  onChange={(e) =>
                    setEditForm({ ...editForm, education: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-sm">Location</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-sm">
                  Relationship
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  value={editForm.relationship}
                  onChange={(e) =>
                    setEditForm({ ...editForm, relationship: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md hover:bg-gray-300"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
              <button
                className="bg-fb-blue text-white px-4 py-1 rounded-md bg-blue-700"
                onClick={handleEditConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white shadow-lg p-2">
        <div className="w-full max-w-5xl mx-auto bg-white">
          {/* Cover Photo */}
          <div className="relative">
            <img
              src={coverPic || cp}
              alt="Cover"
              className="w-full h-60 sm:h-80 md:h-96 object-cover"
            />
            <label
              className="absolute top-28 md:top-14 right-3 bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2"
              aria-label="Upload cover photo"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 16a2 2 0 0 1-2-2v-2a1 1 0 1 1 2 0v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H4zm6-2a1 1 0 0 1-1-1V7.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L11 7.41V13a1 1 0 0 1-1 1z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverPicUpload}
              />
            </label>
          </div>

          {/* Profile Picture and Info */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end px-4 sm:px-6 -mt-16 sm:-mt-20 md:-mt-14">
            <div className="relative">
              <img
                src={profilePic || dp}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border-4 border-white object-cover"
              />
              <label
                className="absolute bottom-0 right-2 text-white p-2 rounded-full cursor-pointer bg-blue-700"
                aria-label="Upload profile picture"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 16a2 2 0 0 1-2-2v-2a1 1 0 1 1 2 0v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H4zm6-2a1 1 0 0 1-1-1V7.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L11 7.41V13a1 1 0 0 1-1 1z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
              </label>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                {userName}
              </h1>
              <p className="text-gray-600">{bio}</p>
              <div className="mt-2 flex flex-row sm:flex-row gap-2 text-lg">
                <button
                  className="bg-fb-blue flex items-center  text-white px-5 py-2 rounded-md bg-blue-700 font-semibold text-base"
                  aria-label="Add to story"
                >
                  <AiOutlinePlus />
                  <p>Add to Story</p>
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 font-semibold text-base"
                  onClick={handleEditOpen}
                >
                  Edit Profile
                </button>{" "}
                <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 font-semibold text-base">
                  ...
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t mt-4 pt-2 px-4 sm:px-6">
            <ul className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
              {["Timeline", "About", "Friends", "Photos"].map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer px-2 py-2 text-sm sm:text-base ${
                    activeTab === tab
                      ? "text-fb-blue font-semibold border-b-2 border-fb-blue"
                      : "text-gray-600 hover:text-fb-blue"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-100 p-2">
        <div className="w-full max-w-5xl mx-auto mt-4 flex flex-col sm:flex-row gap-4 px-4 sm:px-0 bg-gray-100">
          {/* Left Sidebar */}
          <div className="w-full sm:w-2/5 flex flex-col gap-4">
            {/* Intro Card */}
            <div className="bg-white p-4 shadow-sm rounded-lg hidden md:block">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Intro
              </h2>
              {bio && (
                <p className="text-sm text-fb-text-gray mb-4 text-center leading-5">
                  {bio}
                </p>
              )}
              {about.location && (
                <div className="flex items-center mb-3">
                  <FaMapMarkerAlt
                    className="w-4 h-4 text-gray-500 mr-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-fb-text-gray leading-5">
                    <strong>Lives in</strong> {about.location}
                  </p>
                </div>
              )}
              {about.work && (
                <div className="flex items-center mb-3">
                  <FaBriefcase
                    className="w-4 h-4 text-gray-500 mr-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-fb-text-gray leading-5">
                    <strong>Works at</strong> {about.work}
                  </p>
                </div>
              )}
              {about.joined && (
                <div className="flex items-center mb-4">
                  <FaCalendarAlt
                    className="w-4 h-4 text-gray-500 mr-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-fb-text-gray leading-5">
                    <strong>Joined</strong> {about.joined}
                  </p>
                </div>
              )}
              <button
                className="w-full bg-fb-button-gray text-fb-text-gray px-4 py-1.5 rounded-md hover:bg-gray-300 text-sm font-medium transition-colors mt-3"
                onClick={handleEditOpen}
              >
                Edit Details
              </button>
            </div>
            {/* Life Events */}
            <div className="bg-white p-4 shadow-sm rounded-lg hidden md:block">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Life Events
              </h2>
              {lifeEvents.map((event, index) => (
                <div key={index} className="flex items-center mb-3">
                  <FaCalendarAlt
                    className="w-4 h-4 text-gray-500 mr-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-fb-text-gray leading-5">
                    <strong>{event.year}:</strong> {event.event}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full sm:w-3/5">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

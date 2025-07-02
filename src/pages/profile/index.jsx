import React, { useState, useEffect } from "react";
import db from "../../assets/img/user.png";
import Navbar from "../../components/navBar";
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import { AiOutlinePlus } from "react-icons/ai";
import Loader from "../../components/loadingIndicator";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tajrjpnn");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dg3kuzhgf/image/upload",
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Timeline");
  const [activeTabb, setActiveTabb] = useState("Posts");
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
    setIsLoading,
    setIsAuthenticated,
    myData,
    setMyData,
    about,
    setAbout,
    editForm,
    setEditForm,
    refreshUser,
    loggedInUser,
    clickedUser,
    setClickedUser,
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
  const [photos, setPhotos] = useState([
    "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
    "https://i.pinimg.com/736x/f0/eb/8b/f0eb8b6ed8975277054aecc4d2327f6d.jpg",
    "https://i.pinimg.com/736x/ce/05/28/ce05280419168eac1d02091c515b7de5.jpg",
    "https://i.pinimg.com/736x/3d/d9/cf/3dd9cf87ef0dee10d228c35871dfef9d.jpg",
    "https://i.pinimg.com/736x/2e/13/f8/2e13f818fa7e830e9ff084b97d67aabd.jpg",
  ]);

  const [localLoading, setLocalLoading] = useState(false);

  const [otherProfile, setOtherProfile] = useState({});

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

  // const isOwnProfile = userId === logged;

  // photo uploads
  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      console.error("Invalid file for profile pic");
      return;
    }
    const url = await uploadToCloudinary(file);
    if (url) {
      setProfilePic(url);
      try {
        await axios.put(
          "https://metastra-server.onrender.com/api/v1/users/update-profile-pic",
          { profilePic: url },
          { withCredentials: true }
        );
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setIsAuthenticated(false);
            navigate("/");
          }
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
      try {
        await axios.put(
          "https://metastra-server.onrender.com/api/v1/users/update-cover-pic",
          { coverPic: url },
          { withCredentials: true }
        );
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setIsAuthenticated(false);
            navigate("/");
          }
        }
      }
    }
  };

  // adding photos to Photos section
  const handleAddPhotos = async (event) => {
    const files = Array.from(event.target.files);
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const url = await uploadToCloudinary(file);
      if (url) setPhotos((prev) => [url, ...prev]);
    }
  };

  //  post creation
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

  //  profile editing
  const handleEditOpen = () => {
    setEditForm({ userName, bio, ...about });
    setIsEditing(true);
  };

  const handleEditConfirm = async () => {
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
    try {
      await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/create-about-profile",
        {
          bio: editForm.bio,
          work: editForm.work,
          education: editForm.education,
          location: editForm.location,
          relationship: editForm.relationship,
        },
        { withCredentials: true }
      );
      await refreshUser();
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    const handleOtherUserProfile = async () => {
      setLocalLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const resp = await axios.get(
          `https://metastra-server.onrender.com/api/v1/users/view-user-profile/${userId}`,
          { withCredentials: true }
        );
        console.log(clickedUser);
        console.log(resp.data.data);
        localStorage.setItem("userDetails", JSON.stringify(resp.data.data));
        setOtherProfile(resp.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLocalLoading(false);
      }
    };
    handleOtherUserProfile();
  }, [clickedUser]);

  const handleEditCancel = () => setIsEditing(false);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = localStorage.getItem("userId");
  const logged = localStorage.getItem("loggedInUser");

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
                    <p className="font-semibold capitalize">{userName}</p>
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
                  <strong>Work:</strong>&nbsp; {myData.work}
                </p>
              </div>
              <div className="flex items-center">
                <IoMdSchool
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Education:</strong> {myData.education}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Location:</strong> {myData.location}
                </p>
              </div>
              <div className="flex items-center">
                <FaHandHoldingHeart
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Relationship:</strong> {myData.relationship}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Joined:</strong> {myData.joined}
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

  const renderContentt = () => {
    switch (activeTabb) {
      case "Posts":
        return (
          <div>
            {/* Friends Preview */}
            <div className="bg-white p-4 shadow-sm rounded-lg">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Friends ({userDetails.friends.length})
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {userDetails?.friends && userDetails.friends.length > 0 ? (
                  userDetails.friends.map((friend) => (
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
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-400">
                    No friends to show.
                  </p>
                )}
              </div>
            </div>
            {/* Photos Preview */}
            <div className="bg-white p-4 shadow-sm rounded-lg">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Photos
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {userDetails?.photos && userDetails?.photos.length > 0 ? (
                  userDetails.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="User photo"
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-400">
                    No photos to show.
                  </p>
                )}
              </div>
            </div>

            <div>
              {userDetails?.posts && userDetails.posts.length > 0 ? (
                userDetails.posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white p-4 mb-4 shadow rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={userDetails.profile.profilePics}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-semibold capitalize">{`${userDetails.profile.firstname} ${userDetails.profile.surname}`}</p>
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
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-400 mt-10">
                  No posts to show.
                </p>
              )}
            </div>
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
                  <strong>Work:</strong>&nbsp; {userDetails.about.work}
                </p>
              </div>
              <div className="flex items-center">
                <IoMdSchool
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Education:</strong> {userDetails.about.education}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Location:</strong> {userDetails.about.location}
                </p>
              </div>
              <div className="flex items-center">
                <FaHandHoldingHeart
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Relationship:</strong>{" "}
                  {userDetails.about.relationship}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt
                  className="w-4 h-4 text-gray-500 mr-2"
                  aria-hidden="true"
                />
                <p>
                  <strong>Joined:</strong> {userDetails.about.joined}
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
              Friends ({userDetails?.friends?.length || 0})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {userDetails?.friends && userDetails.friends.length > 0 ? (
                userDetails.friends.map((friend) => (
                  <div key={friend.id} className="text-center">
                    <img
                      src={friend.pic}
                      alt={friend.name}
                      className="w-full h-32 rounded-md object-cover"
                    />
                    <p className="mt-2 font-semibold">{friend.name}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-400">
                  No friends to show.
                </p>
              )}
            </div>
          </div>
        );
      case "Photos":
        return (
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Photos</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {userDetails?.photos && userDetails.photos.length > 0 ? (
                photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="User photo"
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-400">
                  No photos to show.
                </p>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-gray-600">Select a tab to view content.</div>
        );
    }
  };

  if (isLoading || localLoading) {
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in">
            {/* Close button (optional) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              onClick={handleEditCancel}
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Profile Icon */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={profilePic || dp}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-blue-100 shadow mb-2 object-cover"
              />
              <h2 className="text-2xl font-bold text-fb-blue mb-1">
                Edit Profile
              </h2>
              <p className="text-gray-500 text-sm">
                Update your information below
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Bio
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none text-sm focus:ring-2 focus:ring-fb-blue focus:border-fb-blue transition"
                  rows="3"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-sm mb-1 text-gray-700">
                    Work
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-fb-blue focus:border-fb-blue transition"
                    value={editForm.work}
                    onChange={(e) =>
                      setEditForm({ ...editForm, work: e.target.value })
                    }
                    placeholder="Where do you work?"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1 text-gray-700">
                    Education
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-fb-blue focus:border-fb-blue transition"
                    value={editForm.education}
                    onChange={(e) =>
                      setEditForm({ ...editForm, education: e.target.value })
                    }
                    placeholder="Your education"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1 text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-fb-blue focus:border-fb-blue transition"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    placeholder="Where do you live?"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1 text-gray-700">
                    Relationship
                  </label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-fb-blue focus:border-fb-blue transition bg-white"
                    value={editForm.relationship}
                    onChange={(e) =>
                      setEditForm({ ...editForm, relationship: e.target.value })
                    }
                  >
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a relationship</option>
                    <option value="Engaged">Engaged</option>
                    <option value="Married">Married</option>
                    <option value="It's complicated">It's complicated</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                  onClick={handleEditCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-fb-blue text-white font-semibold bg-blue-800 transition shadow"
                  onClick={handleEditConfirm}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white shadow-lg p-2">
        <div className="w-full max-w-5xl mx-auto bg-white">
          {/* Cover Photo */}
          {userId === logged ? (
            <div className="relative">
              <img
                src={coverPic || dp}
                alt="Cover"
                className="w-full h-60 sm:h-80 md:h-96 object-cover"
              />
              <label
                className="absolute top-28 md:top-14 right-3 bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2"
                aria-label="Upload cover photo"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 16a2 2 0 0 1-2-2v-2a1 1 0 1 1 2 0v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H4zm6-2a1 1 0 0 1-1-1V7.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L11 7.41V13a1 1 0 0 1-1 1z" />
                </svg>
                <p>Add cover photo</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverPicUpload}
                />
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={otherProfile.profile?.coverPics || dp}
                alt="Cover"
                className="w-full h-60 sm:h-80 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Profile Picture and Info */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end px-4 sm:px-6 -mt-16 sm:-mt-20 md:-mt-14">
            <div className="relative">
              <img
                src={
                  userId === logged
                    ? profilePic || dp
                    : otherProfile.profile?.profilePics || dp
                }
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border-4 border-white object-cover"
              />
              {userId === logged && (
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
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              {logged === userId ? (
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl capitalize font-bold text-gray-800">
                    {userName}
                  </h1>
                  <p className="text-gray-600">{myData.bio}</p>
                  <div className="mt-2 flex flex-row sm:flex-row gap-2 text-lg">
                    <button
                      className="bg-fb-blue flex items-center text-white px-5 py-2 rounded-md bg-blue-700 font-semibold text-base"
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
                    </button>
                    <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 font-semibold text-base">
                      ...
                    </button>
                  </div>
                </div>
              ) : otherProfile.profile ? (
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl capitalize font-bold text-gray-800">
                    {`${otherProfile.profile.firstname} ${otherProfile.profile.surname}`}
                  </h1>
                  <p className="text-gray-600">
                    {otherProfile.about?.bio || ""}
                  </p>
                  <div className="mt-2 flex flex-row sm:flex-row gap-2 text-lg">
                    <button
                      className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 font-semibold text-base"
                      aria-label="Add friend"
                    >
                      <p>Add Friend</p>
                    </button>
                    <button className="bg-fb-blue flex items-center text-white px-5 py-2 rounded-md bg-blue-700 font-semibold text-base">
                      Message
                    </button>
                    <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 font-semibold text-base">
                      ...
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* <h1 className="text-2xl font-bold text-gray-400">
                    <Loader />
                  </h1> */}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          {logged === userId ? (
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
          ) : (
            <div className="border-t mt-4 pt-2 px-4 sm:px-6">
              <ul className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
                {["Posts", "Friends", "About", "Photos", "Videos"].map(
                  (tab) => (
                    <li
                      key={tab}
                      className={`cursor-pointer px-2 py-2 text-sm sm:text-base ${
                        activeTabb === tab
                          ? "text-fb-blue font-semibold border-b-2 border-fb-blue"
                          : "text-gray-600 hover:text-fb-blue"
                      }`}
                      onClick={() => setActiveTabb(tab)}
                    >
                      {tab}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-100 p-2">
        <div className="w-full max-w-5xl mx-auto mt-4 flex flex-col sm:flex-row gap-4 px-4 sm:px-0 bg-gray-100">
          {/* Left Sidebar */}
          <div className="w-full sm:w-2/5 flex flex-col gap-4">
            {/* Intro Card */}
            {userId === logged ? (
              <div className="bg-white p-4 shadow-sm rounded-lg hidden md:block">
                <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                  Intro
                </h2>
                {myData.bio && (
                  <p className="text-sm text-fb-text-gray mb-4 text-center leading-5">
                    {myData.bio}
                  </p>
                )}
                {myData.location && (
                  <div className="flex items-center mb-3">
                    <FaMapMarkerAlt
                      className="w-4 h-4 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-fb-text-gray leading-5">
                      <strong>Lives in</strong> {myData.location}
                    </p>
                  </div>
                )}
                {myData.work && (
                  <div className="flex items-center mb-3">
                    <FaBriefcase
                      className="w-4 h-4 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-fb-text-gray leading-5">
                      <strong>Works at</strong> {myData.work}
                    </p>
                  </div>
                )}
                {myData.joined && (
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt
                      className="w-4 h-4 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-fb-text-gray leading-5">
                      <strong>Joined</strong> {myData.joined}
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
            ) : (
              <div className="bg-white p-4 shadow-sm rounded-lg hidden md:block">
                <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                  Intro
                </h2>
                {otherProfile.about && (
                  <p className="text-sm text-fb-text-gray mb-4 text-center leading-5">
                    {otherProfile.about.bio}
                  </p>
                )}
                {otherProfile.about && (
                  <div className="flex items-center mb-3">
                    <FaMapMarkerAlt
                      className="w-4 h-4 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-fb-text-gray leading-5">
                      <strong>Lives in: </strong> {otherProfile.about.location}
                    </p>
                  </div>
                )}
                {otherProfile.about && (
                  <div className="flex items-center mb-3">
                    <FaBriefcase
                      className="w-4 h-4 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-fb-text-gray leading-5">
                      <strong>Works at: </strong> {otherProfile.about.work}
                    </p>
                  </div>
                )}
                {otherProfile.about && (
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt
                      className="w-4 h-4 text-gray-500 mr-2"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-fb-text-gray leading-5">
                      <strong>Joined: </strong> {otherProfile.about.joined}
                    </p>
                  </div>
                )}
              </div>
            )}
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
          <div className="w-full sm:w-3/5">
            {logged === userId ? renderContent() : renderContentt()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

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
import { BsThreeDots } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import toastAlert from "../../components/ALERT";
import { SiPodcastindex } from "react-icons/si";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostDetail from "../../components/postDetail";

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
    otherProfile,
    setOtherProfile,
    socketRef,
    clickedPost,
    setClickedPost,
    showPost,
    setShowPost,
    presentUser,
  } = useUserContext();
  const dp =
    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740";
  const cp = "https://www.bing.com/8389c9d1-7b99-4e88-ade9-8ada6089e8a8";
  // const [newPost, setNewPost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [photos, setPhotos] = useState([
    "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
    "https://i.pinimg.com/736x/f0/eb/8b/f0eb8b6ed8975277054aecc4d2327f6d.jpg",
    "https://i.pinimg.com/736x/ce/05/28/ce05280419168eac1d02091c515b7de5.jpg",
    "https://i.pinimg.com/736x/3d/d9/cf/3dd9cf87ef0dee10d228c35871dfef9d.jpg",
    "https://i.pinimg.com/736x/2e/13/f8/2e13f818fa7e830e9ff084b97d67aabd.jpg",
  ]);

  const navigate = useNavigate();

  const [localLoading, setLocalLoading] = useState(false);

  const postsDetails = JSON.parse(localStorage.getItem("userDetails"));
  const viewedPost = localStorage.getItem("clickedPost");
  const [clickedPostDetails, setClickedPostDetails] = useState({});

  useEffect(() => {
    console.log("pd:", postsDetails);
  }, [postsDetails]);

  const handleClickedPost = (id) => {
    if (!Array.isArray(postsDetails?.posts)) {
      console.error("postsDetails.posts is undefined or not an array");
      return;
    }

    postsDetails.posts.map((post) => {
      if (post._id === viewedPost) {
        setClickedPostDetails(post);
        console.log("found");
        // localStorage.setItem("clickedPostDetails", JSON.stringify(post));
        console.log("clickedPostDetails:", clickedPostDetails);
      } else {
        console.log("No post found with this ID");
        return;
      }
    });
  };

  // const handleClickedPost = (id) => {
  //   if (!postsDetails?.posts) return;

  //   postsDetails.posts.forEach((post) => {
  //     if (post._id === id) {
  //       setClickedPostDetails(post);
  //       localStorage.setItem("clickedPostDetails", JSON.stringify(post));
  //       console.log("clickedPostDetails:", post);
  //     }
  //   });
  // };

  const [commentInfo, setCommentInfo] = useState({
    postId: "",
    comment: "",
    imageUrl: "",
  });

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

  // useEffect(() => {
  //   if (!socketRef.current || !presentUser) return;

  // const handleNewComment = (data) => {
  //   // ✅ Don't alert if the logged-in user is the one who commented
  //   if (data.commenterId === presentUser) return;

  //   // ✅ Alert only if the comment is on a post owned by the logged-in user
  //   if (data.postOwnerId === presentUser) {
  //     console.log("🔔 New comment received on your post:", data);
  //     alert("💬 New comment received on your post!");
  //     setCommentInfo(data);
  //   }
  // };
  //   socketRef.current.on("newComment", handleNewComment);

  //   return () => {
  //     socketRef.current.off("newComment", handleNewComment);
  //   };
  // }, [presentUser]);

  //realone
  //   useEffect(() => {
  //   if (!socketRef.current) return;

  //   const handleNewComment = (data) => {
  //     console.log("🔔 Comment on your post:", data);
  //     alert("💬 Someone commented on your post!");
  //     setCommentInfo(data);
  //   };

  //   socketRef.current.on("newComment", handleNewComment);

  //   return () => {
  //     socketRef.current.off("newComment", handleNewComment);
  //   };
  // }, []);

  //convert timestampto readable time function
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
      return "1s";
    }

    const minute = Math.floor(seconds / 60);

    if (minute < 60) {
      return `${minute}m`;
    }

    const hour = Math.floor(minute / 60);

    if (minute < 24) {
      return `${hour}h`;
    }

    const days = Math.floor(hour / 24);

    if (days < 7) {
      return `${days}d`;
    }

    const week = Math.floor(days / 7);

    if (week < 4) {
      return `${week}w`;
    }

    const month = Math.floor(days / 30);

    if (month < 12) {
      return `${month}m`;
    }

    const years = Math.floor(days / 365);

    return `${years}y`;
  };

  const handlePostComment = async (post) => {
    if (!commentInfo.comment.trim()) return;

    const payload = {
      comment: commentInfo.comment,
      postId: post?._id,
      imageUrl: "",
    };

    try {
      console.log("Posting to server with ID:", post._id);
      const resp = await axios.post(
        `https://metastra-server.onrender.com/api/v1/users/comment-on-post/${post._id}`,
        payload,
        { withCredentials: true }
      );

      console.log("Response from server:", resp.data);

      // ✅ Emit socket event with post owner and commenter info
      socketRef.current?.emit("newComment", {
        ...payload,
        postOwnerId: postsDetails?.post?.author?._id,
        commenterId: presentUser,
      });

      toastAlert.success("Comment posted successfully");

      // ✅ Clear input
      setCommentInfo((prev) => ({ ...prev, comment: "" }));
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

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
        toastAlert.success("Profile picture updated successfully");
        await refreshUser();
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
        toastAlert.success("Cover photo updated successfully");
        await refreshUser();
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

  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  useEffect(() => {
    console.log(postImage);
  }, [postImage]);
  //  post creation
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (postImage) {
      if (!postImage.type.startsWith("image/")) {
        console.log("Invalid file for this post");
        return;
      }
      imageUrl = await uploadToCloudinary(postImage);
    }
    try {
      await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/post-content",
        { text: newPost, imageUrl: imageUrl },
        { withCredentials: true }
      );
      toastAlert.success("Post created successfully");
      await refreshUser();
      setNewPost("");
      setPostImage(null);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setIsAuthenticated(false);
          navigate("/");
        }
      }
    }
  };

  //Handle user online
  const [online, setOnline] = useState(false);
  const [lastSeenAt, setLastSeenAt] = useState(null);

  useEffect(() => {
    if (!socketRef.current) return;

    //request user status when component mounts
    socketRef.current.emit("get-user-status", clickedUser, (status) => {
      console.log("User status received:", status);
      setOnline(status.isOnline);
      if (!status.isOnline && status.lastSeen) {
        setLastSeenAt(timeAgo(new Date(status.lastSeen)));
      } else {
        setLastSeenAt(null);
      }
      
    })
  

    const handleUserOnline = (userId) => {
       console.log("user-online event received:", userId, clickedUser);
      if (userId === clickedUser) {
        setOnline(true);
        setLastSeenAt(null);
      }
    };

    const handleUserOffline = ({ userId, lastSeen }) => {
       console.log("user-offline event received:", userId, clickedUser, lastSeen);
      if (userId === clickedUser) {
        setOnline(false);
        if (lastSeen) {
          setLastSeenAt(timeAgo(new Date(lastSeen)));
        }
      }
    };

    socketRef.current.on("user-online", handleUserOnline);
    socketRef.current.on("user-offline", handleUserOffline);

    return () => {
      socketRef.current.off("user-online", handleUserOnline);
      socketRef.current.off("user-offline", handleUserOffline);
    };
  }, [clickedUser, socketRef]);

  // adding photos to Photos section
  const handleAddPhotos = async (event) => {
    const files = Array.from(event.target.files);
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const url = await uploadToCloudinary(file);
      if (url) setPhotos((prev) => [url, ...prev]);
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
      console.log(error);
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
  const [openOptions, setOpenOptions] = useState(null);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = localStorage.getItem("userId");
  const logged = localStorage.getItem("loggedInUser");
  const [liked, setLiked] = useState(false);
  const [drpOptions, setDrpOptions] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDeletePost = async (id) => {
    console.log("Deleting post with ID:", id);
    try {
      await axios.delete(
        `https://metastra-server.onrender.com/api/v1/users/delete-post/${id}`,
        { withCredentials: true }
      );
      setOpenOptions(null);
      console.log("Post deleted successfully");
      toastAlert.success("Post deleted successfully");
      await refreshUser();
    } catch (err) {
      console.error("Error deleting post:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setIsAuthenticated(false);
          navigate("/");
        }
      }
    }
  };
  // Render tab content
  const renderContent = () => {
    switch (activeTab) {
      case "Timeline":
        return (
          <div>
            {/* <div className="bg-white p-4 shadow-sm rounded-lg hidden md:block">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Friends ({userDetails?.friends?.length || 0})
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
                  <p>No friends yet </p>
                )}
              </div>
            </div>
          
            <div className="bg-white p-4 shadow-sm mt-4 rounded-lg hidden md:block">
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
            </div> */}
            <div className="bg-white p-4 mb-4 mt-4 shadow rounded-lg">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-center mb-2">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />{" "}
                  <textarea
                    className="w-full p-2 h-10 rounded-full bg-gray-100  resize-none"
                    placeholder={`What's on your mind, ${userName}?`}
                    value={newPost}
                    onChange={(e) => {
                      setNewPost(e.target.value);
                      console.log(newPost);
                    }}
                  />
                  <label>
                    <MdAddPhotoAlternate className="text-blue-500 text-4xl" />

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {postImage && (
                  <div className="mt-4 w-full">
                    <img
                      src={URL.createObjectURL(postImage)}
                      alt="img"
                      className="w-30 h-30 object-contain shadow-lg shadow-blue-200 rounded-md"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-50 flex justify-center items-center mx-auto bg-fb-blue text-white px-4 py-2 rounded-md bg-blue-700 disabled:opacity-50"
                >
                  Post
                </button>
              </form>
            </div>
            {userDetails?.posts && userDetails.posts.length > 0 ? (
              userDetails.posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white p-4 mb-4 shadow rounded-lg"
                >
                  <div
                    onClick={() => {
                      setClickedPost(post._id);
                      localStorage.setItem("clickedPost", post._id);
                      handleClickedPost(post._id);
                      setShowPost(true);
                      // console.log(showPost)
                      // navigate("/viewPost");
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center mb-2">
                        <img
                          src={profilePic}
                          alt="Profile"
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                          <div className="flex items-center">
                            <p>
                              <span className="font-semibold capitalize">
                                {userName}
                              </span>{" "}
                              <span className="font-normal lowercase">
                                {post?.content}
                              </span>
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : "Unknown date"}
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-3xl font-bold"
                        onClick={() => {
                          setOpenOptions(
                            openOptions === post._id ? null : post._id
                          );
                        }}
                      >
                        <BsThreeDots />
                      </button>
                      {openOptions === post._id && (
                        <div className="absolute right-0 md:right-26 mt-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                            onClick={() => {
                              setOpenOptions(null);
                              handleDeletePost(post._id);
                            }}
                          >
                            Delete Post
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                            onClick={() => {
                              setOpenOptions(null);
                            }}
                          >
                            Hide post
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                            onClick={() => setOpenOptions(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      {post.postText && (
                        <p className="text-gray-600 text-md">{post.postText}</p>
                      )}
                    </div>
                    <div>
                      {post.imageUrl && (
                        <div className="mt-2 w-full border-2">
                          <img
                            src={post.imageUrl}
                            alt="post"
                            className="w-full object-cover h-110 object-top"
                          />
                        </div>
                      )}
                    </div>
                    {/* xxxxxxx */}
                    <div className="flex justify-between mt-3 text-gray-600 text-sm">
                      <div>
                        {postsDetails?.posts?.map((postDetail, index) => {
                          if (postDetail._id === post._id) {
                            return (
                              <div key={index}>
                                <span>{postDetail.likes || 0} Likes</span>
                                <span>
                                  {postDetail.comments?.length || 0} Comments
                                </span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-b border-gray-300 p-2 text-2xl mb-4">
                    <button
                      className="text-gray-600 hover:text-fb-blue"
                      onClick={handleLike}
                    >
                      <SlLike
                        className={`${
                          liked ? "text-blue-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                    <button
                      className="text-gray-600 hover:text-fb-blue"
                      onClick={() => {
                        setShowCommentBox(
                          showCommentBox === post._id ? null : post._id
                        );

                        console.log("postId", post._id);
                      }}
                    >
                      <FaRegComment />
                    </button>
                    <button className="text-gray-600 hover:text-fb-blue">
                      <RiShareForwardLine />
                    </button>
                  </div>
                  {showCommentBox === post._id && (
                    <div className={`flex items-center gap-4 mb-2`}>
                      <input
                        type="text"
                        value={commentInfo.comment}
                        placeholder={`Comment as ${userName}`}
                        className="w-full p-2 h-10 rounded-md bg-gray-100  resize-none"
                        onChange={(e) => {
                          setCommentInfo({
                            postId: post._id,
                            comment: e.target.value,
                            imageUrl: "",
                          });
                          console.log(commentInfo);
                        }}
                      />
                      <button
                        className="bg-fb-blue text-white px-4 py-2 rounded-md bg-blue-700 disabled:opacity-50"
                        onClick={() => {
                          handlePostComment(post);
                        }}
                      >
                        <IoSend />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400 mt-10">
                No posts yet
              </p>
            )}
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
            {/* <div className="bg-white p-4 shadow-sm rounded-lg hidden md:block">
              <h2 className="text-base font-semibold text-fb-text-gray mb-3 leading-6">
                Friends ({userDetails?.friends?.length})
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
            
            <div className="bg-white p-4 shadow-sm mt-4 rounded-lg hidden md:block">
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
            </div> */}

            <div className="mt-4">
              {userDetails?.posts && userDetails.posts.length > 0 ? (
                userDetails.posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white p-4 mb-4 shadow rounded-lg"
                  >
                    <div
                      onClick={() => {
                        setClickedPost(post._id);
                        localStorage.setItem("clickedPost", post._id);
                        handleClickedPost(post._id);
                        setShowPost(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center mb-2">
                          <img
                            src={userDetails.profile.profilePics}
                            alt="Profile"
                            className="w-10 h-10 rounded-full mr-2"
                          />
                          <div>
                            <div className="flex items-center">
                              {" "}
                              <p className="font-semibold capitalize">{`${userDetails.profile.firstname} ${userDetails.profile.surname} ${post.content}`}</p>{" "}
                            </div>

                            <p className="text-gray-600 text-sm">
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <button
                          className="text-3xl font-bold"
                          onClick={() => {
                            setDrpOptions(
                              drpOptions === post._id ? null : post._id
                            );
                            console.log("postId", post._id);
                          }}
                        >
                          <BsThreeDots />
                        </button>
                        {drpOptions === post._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                              onClick={() => {
                                setDrpOptions(null);
                              }}
                            >
                              Report post
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                              onClick={() => {
                                setDrpOptions(null);
                              }}
                            >
                              Hide post
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                              onClick={() => setDrpOptions(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>{" "}
                      <div>
                        {post.postText && (
                          <p className="text-gray-600 text-md">
                            {post.postText}
                          </p>
                        )}
                      </div>
                      <div>
                        {post.imageUrl && (
                          <div className="mt-2 w-full border-2">
                            <img
                              src={post.imageUrl}
                              alt="post"
                              className="w-full  object-cover "
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between text-gray-600 mt-2 text-sm">
                        <span>{post.likes} Likes</span>
                        <span>
                          {postsDetails?.postComment?.length} Comments
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 pt-2  text-2xl mb-4">
                      <button
                        className="text-gray-600 hover:text-fb-blue"
                        onClick={handleLike}
                      >
                        <SlLike
                          className={`${
                            liked ? "text-blue-500" : "text-gray-600"
                          }`}
                        />
                      </button>
                      <button
                        className="text-gray-600 hover:text-fb-blue"
                        onClick={() => {
                          setShowCommentBox(
                            showCommentBox === post._id ? null : post._id
                          );
                        }}
                      >
                        <FaRegComment />
                      </button>
                      <button className="text-gray-600 hover:text-fb-blue">
                        <RiShareForwardLine />
                      </button>
                    </div>
                    {showCommentBox === post._id && (
                      <div className={`flex items-center gap-4 mb-2`}>
                        <input
                          type="text"
                          value={commentInfo.comment}
                          placeholder={`Comment as ${userName}`}
                          className="w-full p-2 h-10 rounded-md bg-gray-100  resize-none"
                          onChange={(e) => {
                            setCommentInfo({
                              postId: post._id,
                              comment: e.target.value,
                              imageUrl: "",
                            });
                            console.log(commentInfo);
                          }}
                        />
                        <button
                          className="bg-fb-blue text-white px-4 py-2 rounded-md bg-blue-700 disabled:opacity-50"
                          onClick={() => {
                            handlePostComment(post);
                          }}
                        >
                          <IoSend />
                        </button>
                      </div>
                    )}
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
        <div className="text-xl font-semibold text-fb-blue">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`w-full min-h-screen bg-fb-gray ${
          showPost ? "fixed" : "block"
        }`}
      >
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
                        setEditForm({
                          ...editForm,
                          relationship: e.target.value,
                        })
                      }
                    >
                      <option value="">Select status</option>
                      <option value="Single">Single</option>
                      <option value="In a relationship">
                        In a relationship
                      </option>
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
                  className="w-full h-60 sm:h-80 md:h-96 object-cover object-top"
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
                    className="hidden "
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
                {online ? (
                  <div className="online absolute w-4 h-4 top-27 right-7 sm:h-5 sm:w-5 md:w-5 md:h-5 rounded-full md:top-38 md:right-8 z-50 bg-green-500"></div>
                ) : (
                  <div className="absolute flex justify-center items-center top-27 right-7 sm:top-36 border-2 border-white bg-gray-300 h-5 w-6 md:h-6 md:w-8 rounded-2xl text-xs md:top-35 md:text-sm  text-green-400">{lastSeenAt}</div>
                )}

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
        <div className="bg-gray-100 p-2 relative">
          <div className="w-full max-w-5xl mx-auto mt-4 flex flex-col sm:flex-row gap-4 px-4 sm:px-0 bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-full sm:w-2/5 flex flex-col gap-4">
              {/* Intro Card */}
              {userId === logged ? (
                <div className="bg-white p-6 shadow rounded-xl hidden md:block">
                  <h2 className="text-lg font-bold text-fb-blue mb-4 tracking-wide">
                    Intro
                  </h2>
                  {myData.bio && (
                    <p className="text-base text-gray-700 mb-5 text-center italic">
                      "{myData.bio}"
                    </p>
                  )}
                  <div className="space-y-3">
                    {myData.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">
                          <strong>Lives in</strong> {myData.location}
                        </span>
                      </div>
                    )}
                    {myData.work && (
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">
                          <strong>Works at</strong> {myData.work}
                        </span>
                      </div>
                    )}
                    {myData.joined && (
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">
                          <strong>Joined</strong> {myData.joined}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="w-full mt-6 bg-fb-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                    onClick={handleEditOpen}
                  >
                    Edit Details
                  </button>
                </div>
              ) : (
                <div className="bg-white p-6 shadow rounded-xl hidden md:block">
                  <h2 className="text-lg font-bold text-fb-blue mb-4 tracking-wide">
                    Intro
                  </h2>
                  {otherProfile.about?.bio && (
                    <p className="text-base text-gray-700 mb-5 text-center italic">
                      "{otherProfile.about.bio}"
                    </p>
                  )}
                  <div className="space-y-3">
                    {otherProfile.about?.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">
                          <strong>Lives in</strong>{" "}
                          {otherProfile.about.location}
                        </span>
                      </div>
                    )}
                    {otherProfile.about?.work && (
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">
                          <strong>Works at</strong> {otherProfile.about.work}
                        </span>
                      </div>
                    )}
                    {otherProfile.about?.joined && (
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600 flex items-center">
                          <strong>Joined</strong> &nbsp;
                          <p className="text-gray-600 text-sm">
                            {new Date(
                              otherProfile.about.joined
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </span>
                      </div>
                    )}
                  </div>
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
      {showPost && (
        <div className="fixed inset-0 z-50  overflow-y-scroll bg-opacity-30 backdrop-blur-sm flex items-center justify-center ">
          <PostDetail />
        </div>
      )}
    </div>
  );
};

export default Profile;

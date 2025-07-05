import React, { useState, useEffect } from "react";
import { ThumbUpIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout";
import dp from "../../assets/img/user.png";
import { IoVideocam } from "react-icons/io5";
import { useUserContext } from "../../context/userContext";
import Loader from "../../components/loadingIndicator";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [photos, setPhotos] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { userName, profilePic, clickedUser, setClickedUser, loggedInUser } =
    useUserContext();

  const postsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`
        );
        const newPosts = postsResponse.data;

        if (Object.keys(users).length === 0) {
          const usersResponse = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          const usersMap = usersResponse.data.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {});
          setUsers(usersMap);
        }

        const photoIds = newPosts.map(
          (_, index) => (page - 1) * postsPerPage + index + 1
        );
        const photosResponse = await Promise.all(
          photoIds.map((id) =>
            axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
          )
        );
        const photosMap = photosResponse.reduce((acc, response, index) => {
          acc[newPosts[index].id] = response.data.thumbnailUrl;
          return acc;
        }, {});

        setPosts((prev) => [...prev, ...newPosts]);
        setPhotos((prev) => ({ ...prev, ...photosMap }));
        setHasMore(newPosts.length === postsPerPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Layout>
      {/* <div className="w-full max-w-2xl px-4 sm:px-6 mx-auto mt-25  lg:mt-14 overflow-x-hidden"> */}
      <div className="w-full max-w-2xl mx-auto mt-25 lg:mt-14 px-2 sm:px-4 overflow-x-hidden">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-6 mb-6">
          <div
            className="flex items-center space-x-3"
            onClick={() => {
              setClickedUser(loggedInUser);

              console.log("Clicked user:", clickedUser);
              console.log("loggedin:", loggedInUser);
            }}
          >
            <img
              src={profilePic}
              alt={userName}
              className="w-10 rounded-full max-w-full h-auto"
            />
            <input
              type="text"
              placeholder={`What's on your mind, ${userName}?`}
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0866FF]"
            />
          </div>
          <div className="hidden md:flex md:flex-wrap md:justify-between gap-2 mt-3 border-t border-gray-200 pt-3">
            <button className="flex items-center space-x-1 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded text-sm">
              <span className="text-red-500">
                <IoVideocam />
              </span>
              <span>Live Video</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded text-sm">
              <span className="text-yellow-500">📷</span>
              <span>Photo/Video</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded text-sm">
              <span className="text-yellow-500">😊</span>
              <span>Feeling/Activity</span>
            </button>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post) => {
          const user = users[post.userId] || { name: "Unknown User" };
          const photo = photos[post.id];

          return (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Link to={`/profile/${post.userId}`}>
                  <img
                    src="https://via.placeholder.com/40"
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
                <div>
                  <Link
                    to={`/profile/${post.userId}`}
                    className="text-gray-800 font-semibold text-sm hover:underline"
                  >
                    {user.name}
                  </Link>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800 text-sm sm:text-base mb-3">
                {post.body}
              </p>
              {photo && (
                <img
                  src={photo}
                  alt="Post"
                  className="w-full h-auto max-h-[500px] rounded-lg object-cover mb-3 max-w-full"
                />
              )}
              {/* <div className="grid grid-cols-[20%_20%_20%] md:flex md:flex-wrap justify-around gap-2 border-t border-gray-200 pt-3"> */}
              <div className="flex flex-row flex-wrap justify-between gap-2 border-t border-gray-200 pt-3 w-full">
                <button className="flex-1 min-w-0 flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 px-2 py-2 rounded text-sm">
                  <ThumbUpIcon className="w-5 h-5" />
                  <span>Like</span>
                </button>
                <button className="flex-1 min-w-0 flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 px-2 py-2 rounded text-sm">
                  <ChatIcon className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                <button className="flex-1 min-w-0 flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 px-2 py-2 rounded text-sm">
                  <ShareIcon className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mb-6">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`  text-white rounded-lg text-sm font-medium hover:bg-[#0756e6] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <Loader /> : "Load More"}
            </button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center text-gray-500 text-sm mb-6">
            No more posts to load.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Home;

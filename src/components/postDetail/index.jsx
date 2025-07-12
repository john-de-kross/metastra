import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaRegCommentAlt, FaShare } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import Navbar from "../navBar";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import toastAlert from "../../components/ALERT";
import Loader from "../loadingIndicator";
import { format, register } from "timeago.js";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const { socketRef, clickedPost, showPost, setShowPost } = useUserContext();
  const [commentText, setCommentText] = useState("");
  // const postDetail = JSON.parse(localStorage.getItem("clickedPostDetails"));
  // const post = localStorage.getItem("clickedPost");
  const [post] = useState(() => localStorage.getItem("clickedPost"));
  const [postDetail, setPostDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const [commentInfo, setCommentInfo] = useState({
    postId: "",
    comment: "",
    imageUrl: "",
  });
  // custom short strings
  const customStrings = {
    justNow: "just now",
    seconds: "just now",
    minute: "1 min ago",
    minutes: (n) => `${n} mins ago`,
    hour: "1 hr ago",
    hours: (n) => `${n} hrs ago`,
    day: "1 day ago",
    days: (n) => `${n} days ago`,
    week: "1 wk ago",
    weeks: (n) => `${n} wks ago`,
    month: "1 mo ago",
    months: (n) => `${n} mos ago`,
    year: "1 yr ago",
    years: (n) => `${n} yrs ago`,
  };

  //  custom locale
  register("short-en", (number, index) => {
    const mapping = [
      [customStrings.justNow, customStrings.justNow], // 0: < 1s
      [customStrings.seconds, customStrings.seconds], // 1: < 1m
      [customStrings.minute, customStrings.minutes(number)], // 2: < 2m
      [customStrings.minutes(number), customStrings.minutes(number)], // 3: < 1h
      [customStrings.hour, customStrings.hour], // 4: < 2h
      [customStrings.hours(number), customStrings.hours(number)], // 5: < 1d
      [customStrings.day, customStrings.day], // 6: < 2d
      [customStrings.days(number), customStrings.days(number)], // 7: < 1w
      [customStrings.week, customStrings.week], // 8: < 2w
      [customStrings.weeks(number), customStrings.weeks(number)], // 9: < 1mo
      [customStrings.month, customStrings.month], // 10: < 2mo
      [customStrings.months(number), customStrings.months(number)], // 11: < 1y
      [customStrings.year, customStrings.year], // 12: < 2y
      [customStrings.years(number), customStrings.years(number)], // 13+: > 2y
    ];
    return mapping[index];
  });

  // useEffect(() => {
  //   if (!post) return;

  //   const fetchComments = async () => {
  //     setIsLoading(true);
  //     try {
  //       const resp = await axios.get(
  //         `https://metastra-server.onrender.com/api/v1/users/get-comments/${post}`,
  //         { withCredentials: true }
  //       );
  //       console.log("pos", resp.data.data);
  //       setPostDetail(resp.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchComments();
  // }, []);

  useEffect(() => {
    console.log("post:", post);

    const fetchComments = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(
          `https://metastra-server.onrender.com/api/v1/users/get-comments/${post}`,
          { withCredentials: true }
        );
        console.log("pos", resp.data.data);
        setPostDetail(resp.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    console.log("show:", showPost);
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

  useEffect(() => {
    if (showPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [showPost]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full  bg-gray-100">
      <div className="w-full md:max-w-2xl bg-white rounded-lg shadow-lg p-4 relative">
        <div className="flex items-center justify-around mx-auto border-b-1 border-gray-300  p-2 sticky top-0 left-0  right-0 bg-white z-10">
          <FiArrowLeft
            size={24}
            onClick={() => {
              setShowPost(false);
            }}
          />
          <p className="text-lg font-semibold text-[#050505] capitalize">
            {postDetail?.post?.author?.firstname}{" "}
            {postDetail?.post?.author?.surname}'s Post
          </p>
          <FaShare size={24} className="" />
        </div>
        <div className=" flex justify-center items-center overflow-scroll">
          <div className="max-w-xl w-full  mx-auto bg-white rounded-lg md:shadow ">
            <div className="flex items-center gap-3 p-4 ">
              <img
                src={postDetail?.author?.profilePics || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt="Author"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  {postDetail?.post?.author?.firstname}{" "}
                  {postDetail?.post?.author?.surname}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(postDetail?.post?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {postDetail?.post?.postText && (
              <p className="px-4 pb-2 text-gray-800 text-[15px] leading-snug">
                {postDetail?.post.postText}
              </p>
            )}
            {postDetail?.post?.imageUrl && (
              <div className="w-full max-h-[600px] m-auto overflow-hidden max-w-lg">
                <img
                  src={postDetail?.post.imageUrl}
                  alt="Post"
                  className="w-full h-full object-contain border-2"
                />
              </div>
            )}
            <div className="px-4 text-sm text-gray-500 mt-2 border-b pb-2">
              <span>135 Likes</span> ·{" "}
              <span>{postDetail?.postComment?.length} comments</span>
            </div>
            <div className="flex justify-between px-4 text-gray-600 border-b text-sm font-medium">
              <button className="py-3 flex items-center gap-2 hover:text-fb-blue ">
                <FaThumbsUp /> Like
              </button>
              {/* <button className="py-3 flex items-center gap-2 hover:text-fb-blue">
              <FaRegCommentAlt /> Comment
            </button> */}
              <button className="py-3 flex items-center gap-2 hover:text-fb-blue ">
                <FaShare /> Share
              </button>
            </div>
            <div className="max-w-lg flex items-center gap-3 px-4 py-3">
              <img
                src={postDetail?.author?.profilePics}
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
            <div className="max-w-lg px-4 py-3 ">
              {postDetail?.postComment?.map((post, index) => (
                <div>
                  <div key={index} className="flex gap-3">
                    <img
                      src={post?.user?.profilePics}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="User"
                    />
                    <div className="bg-gray-100 rounded-xl px-4 py-2 w-full">
                      <p className="text-sm font-semibold text-gray-800">
                        {post?.user?.firstname} {post?.user?.surname}
                      </p>
                      <p className="text-sm text-gray-700">{post?.comment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 ml-15 text-gray-500">
                    <p className="text-xs text-gray-500">
                      {format(post?.createdAt)}
                    </p>
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

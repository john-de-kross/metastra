import React from "react";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FriendCard = ({
  id,
  name,
  mutual,
  image,
  primaryButton,
  secondaryButton,
}) => {
  const { clickedUser, setClickedUser } = useUserContext();
  const navigate = useNavigate();

  const handleProfileLink = (e) => {
    e.preventDefault();
    setClickedUser(id);
    localStorage.setItem("userId", id);
    navigate(`/profile`);
    console.log(`Navigating to ${id}'s profile`);
  };

  const handleFriendRequest = async () => {
    try {
      const response = await axios.post(
        "https://metastra-server.onrender.com/api/v1/users/create-friend-request",
        id,
        { withCredentials: true }
      );
      console.log("sending friend request to:", id);
      console.log("fr response:", response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow rounded-md p-4 w-full max-w-[220px]">
      <img
        onClick={handleProfileLink}
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h4 className="font-semibold text-sm text-gray-900">{name}</h4>
      <p className="text-xs text-gray-500 mb-3">{mutual} mutual friends</p>
      <div className="gap-2">
        {primaryButton && (
          <button
            className="bg-blue-600 text-white text-sm px-4 py-1 mb-2 rounded-md hover:bg-blue-700 w-full"
            onClick={() => {
              primaryButton.onClick(id);
              handleFriendRequest();
            }}
          >
            {primaryButton.label}
          </button>
        )}

        {secondaryButton && (
          <button
            className="bg-gray-200 text-gray-700 text-sm px-4 py-1 rounded-md hover:bg-gray-300 w-full"
            onClick={() => secondaryButton.onClick(id)}
          >
            {secondaryButton.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;

import React from "react";

const FriendCard = ({
  name,
  mutual,
  image,
  buttonText = "Confirm",
  secondary = "Delete",
}) => {
  return (
    <div className="bg-white shadow rounded-md p-4 w-full max-w-[220px]">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h4 className="font-semibold text-sm text-gray-900">{name}</h4>
      <p className="text-xs text-gray-500 mb-3">{mutual} mutual friends</p>
      <div className="gap-2">
        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 w-full">
          {buttonText}
        </button>
        <button className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-300 w-full">
          {secondary}
        </button>
      </div>
    </div>
  );
};

export default FriendCard;

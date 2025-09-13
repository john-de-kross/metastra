import React from "react";

const friends = JSON.parse(localStorage.getItem("friends")) || [];

const handleProfileLink = async (id) => {
  // Don't navigate if clicking on the same profile
  if (id === loggedInUser || id === clickedUser) return;

  try {
    // Update state and localStorage
    setClickedUser(id);
    localStorage.setItem("userId", id);

    const resp = await axios.get(
      `https://metastra-server.onrender.com/api/v1/users/get-all-friends/${id}`,
      { withCredentials: true }
    );
    localStorage.setItem("friends", JSON.stringify(resp.data.data.friendList));
    // Navigate to profile page
    navigate(`/profile`);

    // Optionally log for debugging
    console.log(`Navigating to profile: ${id}`);
  } catch (error) {
    console.error("Error navigating to profile:", error);
    toastAlert.error("Could not load profile");
  }
};

const AllFriends = () => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">
        Friends{` (${friends.length})`}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div
              onClick={() => {
                handleProfileLink(friend._id);
              }}
              key={friend._id}
              className="text-center bg-white py-4 px-0 rounded-lg"
            >
              <div className="flex items-center justify-center">
                <img
                  src={friend.profilePics}
                  alt={friend.name}
                  className="w-20 h-20 rounded-full object-cover "
                />
              </div>

              <p className="mt-2 capitalize font-bold">{`${friend.firstname} ${friend.surname} `}</p>
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
};

export default AllFriends;

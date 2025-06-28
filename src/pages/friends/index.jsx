import React from "react";
import FSidebar from "../../components/fsidebar";
import Navbar from "../../components/navBar";
import { useUserContext } from "../../context/userContext";
import FriendRequest from "../../components/friendRequest";
import Suggestions from "../../components/suggestions";
import AllFriends from "../../components/allFriends";
import Birthdays from "../../components/birthdays";

const FriendsPage = () => {
  const { active } = useUserContext();
  return (
    <div>
      <Navbar />
      <div className="flex mt-28 md:mt-15">
        <FSidebar />

        <main className="flex-1 p-4 md:ml-64  bg-gray-100 min-h-screen">
          {active === "requests" && <FriendRequest />}
          {active === "suggestions" && <Suggestions />}
          {active === "all" && <AllFriends />}
          {active === "birthdays" && <Birthdays />}
        </main>
      </div>
    </div>
  );
};

export default FriendsPage;

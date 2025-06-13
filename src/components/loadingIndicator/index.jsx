import React from "react";

const Loader = () => {
  return (
    <div>
      {/* <div class="flex justify-center items-center h-screen">
        <div class="relative inline-flex">
          <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div> 

      </div>*/}
      <div class="border-gray-300 h-4 w-4 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  );
};

export default Loader;

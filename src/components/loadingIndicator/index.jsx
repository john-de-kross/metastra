import React from "react";
import logo from "../../assets/img/logo.jpeg";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="loader" className="w-12 h-12 animate-bounce rounded-full" />
    </div>
  );
};

export default Loader;

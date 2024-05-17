import React from "react";
import logo from "../logo-no-background.png";
function Logo({ width = "100px" }) {
  return (
    <div className="flex justify-center items-center">
      <img src={logo} className="w-32 p-1 " alt="" />
    </div>
  );
}

export default Logo;

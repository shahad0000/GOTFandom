import React from "react";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <div className="bg-[#1a1a1a] text-[#f5f5f5]">
      <nav className="flex w-screen p-4 lg:px-11 justify-between items-center">
        <div
          className="lg:text-4xl font-bold"
          style={{ fontFamily: "cursive" }}
        >
          GOT Fandom
        </div>
        <div className="flex gap-5 lg:text-2xl">
          <Link to="/"
            className="bg-[#7c0d23] hover:bg-[#7c0d23c7] cursor-pointer py-2 px-4 rounded-md"
           
          >
            Explore as Guest
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

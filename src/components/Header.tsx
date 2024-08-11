import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between bg-cyan-100  items-center w-[100%] px-10 h-[5rem]">
      <h1 className="text-lg">Welcome to the Finance App</h1>
      <a className="text-lg" href={"/dashboard"}>
        Dashboard
      </a>
    </div>
  );
}

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = ({ loggedUser }) => {
  return (
    <nav className="w-screen">
      <div className="flex justify-between items-center bg-slate-200 px-8">
        <h1>Blog</h1>

        <ul className="flex gap-4">
          <NavLink to={"/"}>
            <li>Home</li>
          </NavLink>
          <li>about us</li>
        </ul>
        {loggedUser ? (
          <ul className="flex p-2">
            <li className="bg-green-500 p-2">Logout</li>
            <li className="p-2 mx-2">{loggedUser.name}</li>
          </ul>
        ) : (
          <ul className="flex gap-4 ">
            <NavLink to={"/signup"}>
              <li className="bg-blue-300 p-2 hover:text-yellow-500 ">
                Sign up
              </li>
            </NavLink>
            <NavLink to={"/login"}>
              <li className="bg-black rounded-md border-2 text-white p-2 hover:rounded-xl  hover:bg-white hover:text-black">
                Login
              </li>
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

import { Avatar, Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export const NavBar = ({
  loggedUser,
  isLoading,
  setLoading,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (loggedUser) {
      setLoading(false);
    }
  }, [loggedUser, setLoading]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/v1/users/logout");
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <nav className="w-screen">
      <div className="flex justify-between items-center bg-slate-200 px-8">
        <h1>Blog</h1>

        <ul className="flex gap-4">
          <NavLink to={"/"}>
            <li>Home</li>
          </NavLink>
          <li>Categories</li>
          <li>About us</li>
        </ul>
        {isAuthenticated ? (
          <ul className="flex p-2">
            <Link to={"/"} onClick={handleLogout}>
              <li className="bg-green-500 p-2">Logout</li>
            </Link>
            <Link to={"/profile"}>
              <li className="p-2 mx-2">
                <Chip
                  avatar={<Avatar>{loggedUser.name[0]}</Avatar>}
                  label={loggedUser.name}
                />
              </li>
            </Link>
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

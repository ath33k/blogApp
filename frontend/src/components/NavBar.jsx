import { Avatar, Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLoggedUser } from "../context/UserProvider";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const storage = getStorage();

export const NavBar = () => {
  const { loggedUser, isAuthenticated, isLoading } = useLoggedUser();
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    const fetchAvatar = async () => {
      const imageRef = ref(storage, `user-images/${loggedUser.image}`);

      const url = await getDownloadURL(imageRef);
      setAvatarUrl(url);
    };
    if (loggedUser) {
      fetchAvatar();
    }
  }, [loggedUser]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`,
        {
          withCredentials: true,
        }
      );
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <nav className="w-full">
      <div className="flex justify-between items-center bg-slate-200 px-8">
        <h1>Blog</h1>

        <ul className="flex gap-4">
          <NavLink to={"/"}>
            <li>Home</li>
          </NavLink>
          <li>About us</li>
        </ul>
        {isAuthenticated ? (
          <ul className="flex p-2">
            <Link to={"/"} onClick={handleLogout}>
              <li className="bg-green-500 p-2">Logout</li>
            </Link>
            <Link to={"/profile"}>
              <li className="p-2">
                <Chip
                  sx={{
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  className=" "
                  variant="outlined"
                  avatar={<Avatar src={avatarUrl}>{loggedUser.name[0]}</Avatar>}
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

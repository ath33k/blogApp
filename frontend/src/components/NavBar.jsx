import { Avatar, Button, Chip, IconButton, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLoggedUser } from "../context/UserProvider";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import AddIcon from "@mui/icons-material/Add";
import UserDropMenu from "./UserDropMenu";

const storage = getStorage();

export const NavBar = () => {
  const { loggedUser, isAuthenticated, isLoading } = useLoggedUser();
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    const fetchAvatar = async () => {
      const imageRef = ref(storage, `user-images/${loggedUser.image}`);

      const url = await getDownloadURL(imageRef);
      setTimeout(() => {
        setAvatarUrl(url);
      }, 1000);
    };
    if (loggedUser) {
      fetchAvatar();
    }
  }, [loggedUser]);

  // if (!avatarUrl) {
  //   return <div>loading...</div>;
  // }

  return (
    <nav className="w-full sticky top-0 z-50 bg-white drop-shadow-md md:px-8 px-4 p-1">
      <div className="flex justify-between items-center">
        <NavLink to={"/"}>
          <h2 className="text-xl lg:text-2xl tracking-wider">Blogz</h2>
        </NavLink>

        {isAuthenticated ? (
          <ul className="flex items-center ">
            <Link to={"/createPost"}>
              <Button sx={{ color: "black" }} startIcon={<AddIcon />}>
                Write
              </Button>
            </Link>

            <li className="">
              {avatarUrl ? (
                <UserDropMenu loggedUser={loggedUser} avatarUrl={avatarUrl} />
              ) : (
                <div className="ml-4 p-1">
                  <Skeleton variant="circular" width={34} height={34} />
                </div>
              )}
            </li>
          </ul>
        ) : (
          <ul className="flex gap-4 items-center ">
            <NavLink to={"/signup"}>
              <li
                className="bg-white text-black border-2 border-black border-opacity-0 rounded-lg
              hover:border-opacity-100 duration-200 p-1 px-3 pb-2  "
              >
                Sign up
              </li>
            </NavLink>
            <NavLink to={"/login"}>
              <li className="bg-black rounded-lg border-2 text-white  duration-200 p-1 px-3 pb-2 hover:bg-green-500">
                Sign in
              </li>
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

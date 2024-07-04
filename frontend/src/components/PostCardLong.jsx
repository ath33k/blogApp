import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/ss.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import axios, { all } from "axios";
import Like from "./Like";
import { useLoggedUser } from "../context/UserProvider";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const PostCardLong = ({
  post,
  postId,
  setselectedId,
  // loggedUser,
}) => {
  const { loggedUser, isAuthenticated, isLoading } = useLoggedUser();
  const [coverImg, setCoverImg] = useState();

  const handlePostClick = () => {
    setselectedId(postId);
    localStorage.setItem("postId", postId);
  };

  useEffect(() => {
    const fetchCoverImg = async () => {
      const imageRef = ref(storage, `cover-images/${post.coverImage}`);

      const url = await getDownloadURL(imageRef);
      setCoverImg(url);
    };
    fetchCoverImg();
  }, [post]);

  return (
    <div className="flex hover:rounded-md gap-4 p-4 bg-white border-b-2 justify-between items-center filter  hover:drop-shadow-lg duration-300 transition-all ">
      <div className="flex flex-col items-start">
        <Link to={`/post/${postId}`} onClick={handlePostClick}>
          {post.category.map((el) => (
            <span key={el._id} className="text-xs md:text-sm">
              {el.className}
            </span>
          ))}

          <h2 className="text-xl md:text-2xl font-bold">{post.heading}</h2>
          <p className="text-sm md:text-base">{post.description}</p>
        </Link>
        <Like loggedUser={loggedUser} postId={postId} />
      </div>
      <img
        src={coverImg}
        className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] "
      />
    </div>
  );
};

export default PostCardLong;

// className="md:w-1/6 h-32 sm:w-1/4 sm:h-28 bg-gray-400 text-center"

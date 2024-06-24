import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/ss.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import axios from "axios";

const PostCardLong = ({
  heading,
  content,
  postId,
  setselectedId,
  loggedUser,
}) => {
  const [isLiked, setIsliked] = useState(false);
  const [likeId, setLikeId] = useState("");

  const handlePostClick = () => {
    setselectedId(postId);
    localStorage.setItem("postId", postId);
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked && likeId) {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes/${likeId}`
        );
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes`,
          {
            post: postId,
            user: loggedUser._id,
          }
        );
        console.log(response);
      }
      setIsliked((val) => !val);
      console.log(isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${postId}`
      );
      const allLikes = response.data.data.likes;
      allLikes.forEach((like) => {
        if (like.user._id == loggedUser._id) {
          console.log(like.user._id);
          setLikeId(like._id);
          setIsliked(true);
        }
      });
      // setIsliked(false);
      // console.log(like);
      // if (likeId) {
      //   console.log(likeId);
      // }
      // setLikeId(like._id);
      // setIsliked(true);
    };
    if (loggedUser) {
      fetchLikes();
    }
  }, [postId, loggedUser]);

  return (
    <div className="flex hover:rounded-md gap-4 p-4 bg-white border-b-2 justify-between items-center filter  hover:drop-shadow-lg duration-300 transition-all ">
      <div className="flex flex-col items-start">
        <Link to={`/post/${postId}`} onClick={handlePostClick}>
          <span className="text-xs md:text-sm">category</span>
          <h2 className="text-xl md:text-2xl font-bold">{heading}</h2>
          <p className="text-sm md:text-base">{content}</p>
        </Link>
        <IconButton aria-label="like" onClick={handleLikeClick}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <img
        src={logo}
        className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] "
      />
    </div>
  );
};

export default PostCardLong;

// className="md:w-1/6 h-32 sm:w-1/4 sm:h-28 bg-gray-400 text-center"

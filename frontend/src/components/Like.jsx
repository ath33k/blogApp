import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, IconButton } from "@mui/material";
import axios, { all } from "axios";

function Like({ postId, loggedUser }) {
  const [isLiked, setIsliked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const handleLikeClick = async () => {
    try {
      if (isLiked && likeId) {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes/${likeId}`,
          { withCredentials: true }
        );
        setLikeId("");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes`,
          {
            post: postId,
            user: loggedUser._id,
          },
          { withCredentials: true }
        );
        console.log(response);
        setLikeId(response.data.data.like._id);
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
      console.log(allLikes.length);
      setLikeCount(allLikes.length);
      allLikes.forEach((like) => {
        if (like.user._id == loggedUser._id) {
          console.log(like.user._id);
          setLikeId(like._id);
          setIsliked(true);
        }
      });
    };
    if (loggedUser) {
      fetchLikes();
    }
  }, [postId, loggedUser, likeId]);

  return (
    <div>
      <IconButton aria-label="like" onClick={handleLikeClick}>
        {isLiked ? (
          <FavoriteIcon
            // sx={{
            //   color: "red",
            //   "&:hover": {
            //     scale: "2rem",
            //   },
            // }}
            className=" text-red-500 "
          />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
      <span>{likeCount}&nbsp;likes</span>
    </div>
  );
}

export default Like;

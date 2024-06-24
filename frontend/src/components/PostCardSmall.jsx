import React from "react";
import svg from "./../assets/ss.png";
import { Link } from "react-router-dom";

const PostCardSmall = ({ heading, content, postId, setselectedId }) => {
  const handlePostClick = () => {
    setselectedId(postId);
    localStorage.setItem("postId", postId);
  };
  return (
    <Link to={`/post/${postId}`} onClick={handlePostClick}>
      <div className="flex rounded-md gap-2 bg-white">
        <div className="md:w-5/6 sm:w-3/4">
          <span className="text-xs">Category</span>
          <h2 className="text-base font-semibold">{heading}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCardSmall;

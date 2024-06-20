import React from "react";
import { Link } from "react-router-dom";
import svg from "./../assets/react.svg";

const PostCardLong = ({ heading, content, postId, setselectedId }) => {
  const handlePostClick = () => {
    setselectedId(postId);
    localStorage.setItem("postId", postId);
  };
  return (
    <Link to={`/post/${postId}`} onClick={handlePostClick}>
      <div className="flex rounded-md gap-4 p-4 bg-white">
        <img src={svg} className="md:w-1/6 h-32 sm:w-1/4 sm:h-28" />
        <div className="md:w-5/6 sm:w-3/4">
          <h2>{heading}</h2>
          <p>{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCardLong;

// className="md:w-1/6 h-32 sm:w-1/4 sm:h-28 bg-gray-400 text-center"

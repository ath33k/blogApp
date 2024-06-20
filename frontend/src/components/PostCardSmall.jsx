import React from "react";
import svg from "./../assets/react.svg";
import { Link } from "react-router-dom";

const PostCardSmall = ({ heading, content, postId, setselectedId }) => {
  const handlePostClick = () => {
    setselectedId(postId);
    localStorage.setItem("postId", postId);
  };
  return (
    <Link to={`/post/${postId}`} onClick={handlePostClick}>
      <div className="flex rounded-md gap-4 p-4 bg-white">
        <img src={svg} />
        <div className="md:w-5/6 sm:w-3/4">
          <h2>{heading}</h2>
          <p>{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCardSmall;

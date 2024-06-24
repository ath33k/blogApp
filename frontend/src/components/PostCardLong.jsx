import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/ss.png";

const PostCardLong = ({ heading, content, postId, setselectedId }) => {
  const handlePostClick = () => {
    setselectedId(postId);
    localStorage.setItem("postId", postId);
  };
  return (
    <Link to={`/post/${postId}`} onClick={handlePostClick}>
      <div className="flex hover:rounded-md gap-4 p-4 bg-white border-b-2 justify-between items-center filter  hover:drop-shadow-lg duration-300 transition-all ">
        <div className="flex flex-col items-start">
          <span className="text-xs md:text-sm">category</span>
          <h2 className="text-xl md:text-2xl font-bold">{heading}</h2>
          <p className="text-sm md:text-base">{content}</p>
        </div>
        <img
          src={logo}
          className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] "
        />
      </div>
    </Link>
  );
};

export default PostCardLong;

// className="md:w-1/6 h-32 sm:w-1/4 sm:h-28 bg-gray-400 text-center"

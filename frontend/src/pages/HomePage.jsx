import { Box, Grid, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCardLong";
import PostCardSmall from "../components/PostCardSmall";
import PostCardLong from "../components/PostCardLong";
import HeaderCarousel from "../components/HeaderCarousel";
import HomeTabs from "../components/HomeTabs";
import { useLoggedUser } from "../context/UserProvider";
import PostContainer from "../components/PostContainer";

export default function HomePage({ setselectedId }) {
  const [tabSelection, setTabSelection] = useState("recents");
  return (
    <div className="home-grid-container">
      <div className="grid-1 w-full">
        <HeaderCarousel />
      </div>
      <div className="grid-2 bg-white">
        <HomeTabs
          tabSelection={tabSelection}
          setTabSelection={setTabSelection}
        />
      </div>
      <div className="grid-3">
        <div className="grid-3-container gap-4 p-2 ">
          <PostContainer
            setselectedId={setselectedId}
            tabSelection={tabSelection}
          />
        </div>
      </div>
      <div className="grid-4 border-l-4 rounded-md pl-8 ">
        <h3 className=" italic">Trending</h3>
        <div className="pt-6 flex flex-col gap-2">
          {/* {data.map((el) => (
            <PostCardSmall
              key={el._id}
              postId={el._id}
              heading={el.heading}
              setselectedId={setselectedId}
            />
          ))} */}
          sidebar
        </div>
      </div>
    </div>
  );
}

{
  /* <>
      <div>
        <div className="grid-container gap-8 md:gap-10 sm:p-8 md:px-24">
          <div className=" rounded-xl flex flex-col gap-4 p-2 bg-blue-900">
            {data.map((el) => (
              <PostCardLong
                key={el._id}
                postId={el._id}
                heading={el.heading}
                content={el.content}
                setselectedId={setselectedId}
              />
            ))}
            <Pagination
              className="bg-white rounded-xl p-2"
              count={pageCount}
              page={page}
              onChange={(e, pageNumber) => setPage(pageNumber)}
              color="primary"
            ></Pagination>
          </div>
          <div className="border-2 border-black">
            <div>
              <h3>Trending</h3>
            </div>
            <PostCardSmall />
          </div>
        </div>
      </div>
    </> */
}

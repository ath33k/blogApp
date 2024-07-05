import { Box, Button, Grid, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCardLong";
import PostCardSmall from "../components/PostCardSmall";
import PostCardLong from "../components/PostCardLong";
import HeaderCarousel from "../components/HeaderCarousel";
import HomeTabs from "../components/HomeTabs";
import PostContainer from "../components/PostContainer";
import { ErrorBoundary } from "react-error-boundary";

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
          <ErrorBoundary fallbackRender={PostContainerErrFallBack}>
            <PostContainer
              setselectedId={setselectedId}
              tabSelection={tabSelection}
            />
          </ErrorBoundary>
        </div>
      </div>
      <div className="grid-4 border-l-4 rounded-md pl-8 ">
        <h3 className=" italic">Most Liked</h3>
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

function PostContainerErrFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col w-full justify-center items-center p-4 gap-2">
      <div>{error.message}</div>
      <Button variant="outlined">Try Again</Button>
    </div>
  );
}

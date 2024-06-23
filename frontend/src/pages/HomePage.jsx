import { Box, Grid, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCardLong";
import PostCardSmall from "../components/PostCardSmall";
import PostCardLong from "../components/PostCardLong";

export default function HomePage({
  loggedUser,
  setLoggedUser,
  isLoading,
  setLoading,
  setselectedId,
}) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [data, setData] = useState([]);

  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/posts?page=${page}&limit=5`
        );

        setData(response.data.data);
        setPageCount(response.data.totalPages);
        // setLoggedUser(response.data.user);
        console.log(response.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }

      setLoading(false);
    };
    fetchPosts();
  }, [page, setLoggedUser, setLoading]);

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <>
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
    </>
  );
}

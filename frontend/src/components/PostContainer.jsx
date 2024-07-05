import React, { useEffect, useState } from "react";
import PostCardLong from "./PostCardLong";
import { Pagination, Skeleton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useLoggedUser } from "../context/UserProvider";
import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";

const PostContainer = ({ setselectedId, tabSelection }) => {
  const { showBoundary } = useErrorBoundary();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [data, setData] = useState([]);
  const { loggedUser, isAuthenticated, isLoading } = useLoggedUser();
  const [postLoading, setPostLoading] = useState(true);

  const fetchAllPost = `${
    import.meta.env.VITE_BACKEND_URL
  }/api/v1/posts?page=${page}&limit=5`;

  const fetchByCategory = `${
    import.meta.env.VITE_BACKEND_URL
  }/api/v1/posts?categoryId=${tabSelection}&limit=5`;

  console.log(tabSelection);
  useEffect(() => {
    const fetchPosts = async () => {
      setPostLoading(true);
      try {
        let response;
        if (tabSelection === "recents") {
          response = await axios.get(fetchAllPost);
        } else {
          response = await axios.get(fetchByCategory);
        }

        setData(response.data.data);
        setPageCount(response.data.totalPages);
        // setLoggedUser(response.data.user);
        console.log(response.data);
      } catch (err) {
        showBoundary(err);
      }
      // setTimeout(() => {
      setPostLoading(false);
      // }, 1000);
    };
    fetchPosts();
  }, [
    page,
    setPostLoading,
    tabSelection,
    fetchAllPost,
    fetchByCategory,
    showBoundary,
  ]);

  if (postLoading) {
    return <PostSkeleton />;
  }

  console.log(data);
  return (
    <div className="rounded-xl flex flex-col justify-between gap-4 p-2 min-h-[80vh] w-full">
      {/* {!data.length > 0 && <NoPost />} */}
      <div className="flex flex-col gap-2 ">
        {!data.length > 0 ? (
          <NoPost />
        ) : (
          data.map((el) => (
            <PostCardLong
              key={el._id}
              // loggedUser={loggedUser}
              postId={el._id}
              post={el}
              setselectedId={setselectedId}
            />
          ))
        )}
      </div>

      <Pagination
        className="bg-white rounded-xl p-2"
        count={pageCount}
        page={page}
        onChange={(e, pageNumber) => setPage(pageNumber)}
        color="primary"
      ></Pagination>
    </div>
  );
};

export default PostContainer;

function NoPost() {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full">
      <div>
        <ErrorIcon fontSize="medium" />
      </div>
      <div className="md:text-lg">No post have been found</div>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="flex rounded-md gap-4 p-4 bg-white border-b-2 justify-between items-center filter  hover:drop-shadow-lg duration-300 transition-all">
      <div className="flex flex-col items-start w-full">
        <Skeleton variant="text" width={"95%"} sx={{ fontSize: "3rem" }} />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"80%"}
          className="w-full"
        />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={"65%"} />
      </div>
      <Skeleton
        variant="rectangular"
        width={200}
        height={80}
        animation="wave"
      />
    </div>
  );
}

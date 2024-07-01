import React, { useEffect, useState } from "react";
import PostCardLong from "./PostCardLong";
import { Pagination } from "antd";
import { useLoggedUser } from "../context/UserProvider";
import axios from "axios";

const PostContainer = ({ setselectedId, tabSelection }) => {
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
        setPostLoading(false);
        console.log(err);
      }

      setPostLoading(false);
    };
    fetchPosts();
  }, [page, setPostLoading, tabSelection, fetchAllPost, fetchByCategory]);

  if (postLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="rounded-xl flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-2">
        {data.map((el) => (
          <PostCardLong
            key={el._id}
            // loggedUser={loggedUser}
            postId={el._id}
            post={el}
            setselectedId={setselectedId}
          />
        ))}
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

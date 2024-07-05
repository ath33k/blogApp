import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import logo from "./../assets/ss.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import CarouselItem from "./CarouselItem";
import { Skeleton } from "@mui/material";

const storage = getStorage();

const HeaderCarousel = ({ postId }) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts?random=5`,
          { withCredentials: true }
        );

        setData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[360px] md:h-[440px] lg:h-[460px] xl:h-[480px] ">
        <CarouselSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {data ? (
          <>
            <div className="flex justify-start absolute z-10 top-0 left-0 right-0 p-6  md:px-10 bg-gradient-to-b from-black">
              <div className="font-thin  text-sm lg:text-lg text-white">
                Random
              </div>
            </div>

            <Carousel arrows autoplay pauseOnHover={false}>
              {data?.map((el) => (
                <CarouselItem key={el._id} post={el} />
              ))}
            </Carousel>
            <br />
          </>
        ) : (
          <div className="w-full h-[360px] md:h-[420px] lg:h-[460px] gray bg-black bg-opacity-50">
            {/* <CarouselSkeleton /> */}
            <div className="absolute flex justify-center items-center z-10 top-0 left-0 right-0 bottom-0 text-xl text-white">
              No posts found
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderCarousel;

function NoCarouselItem() {
  return (
    <div className="flex justify-center items-center bg-black w-full h-[360px] md:h-[420px] lg:h-[460px] xl:h-[480px] ">
      <div className="text-white text-xl">No Post</div>
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"70%"}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width={"95%"}
        sx={{ fontSize: "2rem" }}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width={"85%"}
        sx={{ fontSize: "1rem" }}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width={"50%"}
        sx={{ fontSize: "1rem" }}
        animation="wave"
      />
    </>
  );
}

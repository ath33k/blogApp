import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import logo from "./../assets/ss.png";
import axios from "axios";
import { Link } from "react-router-dom";

const HeaderCarousel = ({ postId }) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts?random=5`,
          { withCredentials: true }
        );

        setData(response.data.data);
        // setPageCount(response.data.totalPages);
        // setLoggedUser(response.data.user);
        console.log(response.data.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }

      setLoading(false);
    };
    fetchPosts();
  }, []);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <>
      <Carousel arrows autoplay pauseOnHover={false}>
        {data.map((el) => (
          <div key={el._id}>
            <div className="relative">
              <div className="absolute flex flex-col justify-between text-white left-0 top-0 right-0 bottom-0 bg-black bg-opacity-20 gap-2 p-10">
                <h3>FOR YOU</h3>
                <div className="flex flex-col sm:items-start p-1">
                  <div className="text-xs text-blue-600 ">Category</div>
                  <h2 className="text-2xl lg:text-3xl font-semibold  uppercase">
                    {el.heading}
                  </h2>

                  <div className="pb-2">
                    <p className="text-sm md:text-base lg:text-lg font-light">
                      {el.content}
                    </p>
                  </div>
                  <Link to={`/post/${el._id}`}>
                    <button className="bg-blue-500 text-white p-1 pb-2 px-4 md:px-6 rounded-xl text-xs lg:text-sm">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
              <img
                src={logo}
                className="w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] xl:h-[480px] "
                alt=""
              />
            </div>
          </div>
        ))}
      </Carousel>
      <br />
    </>
  );
};

export default HeaderCarousel;

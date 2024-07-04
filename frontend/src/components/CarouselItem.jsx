import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const CarouselItem = ({ post }) => {
  const [coverImg, setCoverImg] = useState();
  useEffect(() => {
    const fetchCoverImg = async () => {
      const imageRef = ref(storage, `cover-images/${post.coverImage}`);

      const url = await getDownloadURL(imageRef);
      setCoverImg(url);
    };
    fetchCoverImg();
  }, [post]);

  console.log(post);

  return (
    <div>
      <div className="relative">
        <div className="group absolute flex flex-col justify-end text-white left-0 top-0 right-0 bottom-0 bg-black bg-opacity-25 hover:bg-opacity-60 gap-2 p-10 duration-300 hover:ease-out hover:scale-105 ease-in">
          <div className="flex flex-col sm:items-start p-1">
            <div className="flex">
              {post.category.map((cat) => (
                <div
                  key={cat._id}
                  className="text-xs capitalize bg-blue-200 bg-opacity-25 p-1 px-3 rounded-md filter backdrop-blur-md "
                >
                  {cat.name}
                </div>
              ))}
            </div>
            <h2 className="text-2xl lg:text-3xl font-semibold  uppercase">
              {post.heading}
            </h2>

            <div className="pb-2">
              <p className="text-sm md:text-base lg:text-lg font-light">
                {post.description}
              </p>
            </div>
            <Link to={`/post/${post._id}`}>
              <button className="bg-blue-500 text-white p-1 pb-2 px-4 md:px-6 rounded-xl text-xs lg:text-sm">
                Read More
              </button>
            </Link>
          </div>
        </div>
        <img
          src={coverImg}
          className="w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] xl:h-[480px] "
          alt=""
        />
      </div>
    </div>
  );
};

export default CarouselItem;

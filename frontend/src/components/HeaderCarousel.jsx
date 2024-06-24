import React from "react";
import { Carousel } from "antd";
import logo from "./../assets/ss.png";

const HeaderCarousel = () => {
  return (
    <>
      <Carousel arrows autoplay>
        <div>
          <div className="relative ">
            <div className="absolute flex flex-col justify-between text-white left-0 top-0 right-0 bottom-0 bg-black bg-opacity-20 gap-2 p-4">
              <h2>FOR YOU</h2>
              <div className="flex flex-col gap-1 sm:items-start p-1">
                <div className="text-xs text-blue-600 ">Category</div>
                <h2 className="text-xl lg:text-2xl font-semibold">
                  The Title Here
                </h2>

                <div className="pb-2">
                  <p className="text-xs md:text-sm lg:text-base font-light">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                    quas aspernatur temporibus fugit voluptatum eveniet
                    excepturi quod labore autem delectus.
                  </p>
                </div>
                <button className="bg-blue-500 text-white p-1 pb-2 px-4 md:px-6 rounded-xl text-xs md:text-sm lg:text-base">
                  Read More
                </button>
              </div>
            </div>
            <img src={logo} className="w-full h-[500px] " alt="" />
          </div>
        </div>
      </Carousel>
      <br />
    </>
  );
};

export default HeaderCarousel;

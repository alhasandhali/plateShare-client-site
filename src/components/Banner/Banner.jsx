import React from "react";
import { Link } from "react-router";
import "./Banner.css";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="hero flex items-center justify-center py-20 sm:py-28 md:py-36 lg:py-44 text-center text-white">
      <div className="max-w-5xl px-4 sm:px-6 md:px-8">
        <h1 className="montserrat font-bold text-2xl sm:text-3xl md:text-5xl mb-4 leading-snug text-balance wrap-break-word">
          <span className="block sm:inline">Share a meal, </span>
          <TypeAnimation
            sequence={[
              "change a life",
              1500,
              "spread hope",
              1500,
              "fight hunger",
              1500,
              "build community",
              1500,
              "make a difference",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
            wrapper="span"
            className="block sm:inline"
          />
        </h1>
        <p className="montserrat font-normal text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto px-2">
          Connect with your community to reduce food waste and help those in
          need.
        </p>
        <div className="flex justify-center">
          <Link to="/available-foods" className="themeBtn w-fit border-2">
            <span className="w-auto px-6 py-3 font-semibold">Search Food</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

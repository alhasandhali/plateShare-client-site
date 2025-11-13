import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import NotFoundImg from "../../assets/404.webp";

const ErrorPage = () => {
  usePageTitle("404 - Page Not Found");

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  const buttonHover = {
    scale: 1.08,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eaeef2] p-6">
      <Motion.div
        className="relative w-full max-w-3xl flex justify-center"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Motion.img
          src={NotFoundImg}
          alt="404 Not Found"
          className="w-full max-w-lg mx-auto opacity-80 mb-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <Motion.div
          className="absolute bottom-10 md:bottom-20 text-center px-4"
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-prime drop-shadow-md">
            Page Not Found
          </h2>
          <p className="text-gray-700 max-w-md mx-auto mt-3 text-sm sm:text-base">
            The page you’re looking for might have been removed, renamed, or is
            temporarily unavailable.
          </p>
          <Motion.div whileHover={buttonHover} className="inline-block mt-6">
            <Link to="/" className="themeBtn">
              <span>Back to Home</span>
            </Link>
          </Motion.div>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default ErrorPage;

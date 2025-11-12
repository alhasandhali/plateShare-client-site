import React from "react";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const ErrorPage = ({ code = 404, message = "Page Not Found" }) => {
  usePageTitle(`${code} - ${message}`);
  const navigate = useNavigate();

  const codeVariant = {
    hidden: { rotateY: 0, opacity: 0, scale: 0 },
    visible: {
      rotateY: [0, 10, -10, 5, -5, 0],
      scale: [0, 1, 1.05, 1, 1.02, 1],
      opacity: [0, 0.8, 1],
      transition: {
        duration: 4,
        ease: "linear",
      },
    },
  };

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6 relative overflow-hidden">
      <Motion.div
        className="text-center space-y-6 z-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Motion.h1
          className="text-8xl sm:text-9xl font-extrabold text-gradient"
          variants={codeVariant}
          initial="hidden"
          animate="visible"
        >
          {code}
        </Motion.h1>
        <Motion.h2
          className="text-2xl sm:text-4xl font-semibold text-prime"
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          {message}
        </Motion.h2>
        <Motion.p
          className="text-gray-600 max-w-md mx-auto text-center text-sm sm:text-base"
          variants={textVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Please check the URL or
          navigate back.
        </Motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Motion.div whileHover={buttonHover} className="inline-block">
            <Link to="/" className="themeBtn">
              <span>Go Home</span>
            </Link>
          </Motion.div>
          <Motion.button
            onClick={() => navigate(-1)}
            className="themeBtn"
            whileHover={buttonHover}
          >
            <span>Go Back</span>
          </Motion.button>
        </div>
      </Motion.div>
    </div>
  );
};

export default ErrorPage;

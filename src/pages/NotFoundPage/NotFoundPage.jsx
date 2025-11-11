import React from "react";
import { Link } from "react-router";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const NotFoundPage = () => {
  usePageTitle("404 Page Not Found");

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-9xl font-bold text-alt mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-second mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="themeBtn w-fit">
          <span className="w-auto">Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

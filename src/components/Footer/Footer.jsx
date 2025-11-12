import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="montserrat bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-20">
        <div className="flex-1 min-w-64">
          <Link to="/" className="flex items-center mb-3">
            <img className="w-10 h-12" src={logo} alt="PlateShare Logo" />
            <div className="ml-2">
              <p className="poppins font-extrabold text-second text-xl tracking-widest">
                Plate<span className="text-prime">Share</span>
              </p>
              <p className="montserrat font-light text-prime text-[10px]">
                Share a meal, Change a life
              </p>
            </div>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed md:pr-10 xl:pr-0 text-justify wrap-break-words max-w-full">
            <span className="poppins font-bold text-second">
              Plate<span className="text-prime">Share</span>
            </span>{" "}
            is a community-driven platform dedicated to reducing food waste and
            helping those in need. Our mission is simple: connect people with
            surplus food to those who can use it.
          </p>
        </div>
        <div className="flex-1 min-w-40">
          <h6 className="footer-title text-second font-semibold mb-3">
            Company
          </h6>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-prime transition">About Us</a>
            </li>
            <li>
              <a className="hover:text-prime transition">Contact</a>
            </li>
            <li>
              <a className="hover:text-prime transition">Careers</a>
            </li>
            <li>
              <a className="hover:text-prime transition">Press Kit</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-40">
          <h6 className="footer-title text-second font-semibold mb-3">
            Services
          </h6>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-prime transition">
                Donate Food
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-prime transition">
                Browse Food
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-prime transition">
                Volunteer
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-prime transition">
                Partnerships
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-40">
          <h6 className="footer-title text-second font-semibold mb-3">
            Follow Us
          </h6>
          <div className="flex gap-5 mt-2">
            <Link
              to="https://x.com"
              target="_blank"
              className="hover:text-prime transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2H21l-6.707 7.748L21.944 22H16.08l-4.68-6.766L6.1 22H3.341l7.17-8.273L2.5 2h5.99l4.243 6.154L18.244 2zm-2.07 17.8h1.44L7.828 4.09H6.3l9.874 15.71z" />
              </svg>
            </Link>
            <Link
              to="https://youtube.com"
              target="_blank"
              className="hover:text-prime transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 15.999v-8l8 3.993-8 4.007z" />
              </svg>
            </Link>
            <Link
              to="https://facebook.com"
              target="_blank"
              className="hover:text-prime transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5h2.885V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-prime text-white py-4">
        <p className="text-center text-sm sm:text-base px-2">
          © {new Date().getFullYear()} PlateShare — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

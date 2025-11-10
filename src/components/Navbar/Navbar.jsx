import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  const navLinkStyle =
    "montserrat text-sm md:text-[16px] text-prime rounded-none";
  const navBtn = "ps-btn px-3.5 py-2.5 rounded-sm montserrat text-center";
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar md:w-11/12 m-auto">
        <div className="navbar-start">
          <Link to="/" className="flex items-center ml-2">
            <img className="w-12 h-12" src={logo} alt="PlateShare Logo" />
            <div className="flex flex-col ml-2">
              <p className="poppins font-extrabold text-prime text-xl tracking-widest">
                Plate<span className="text-second">Share</span>
              </p>
              <p className="montserrat font-extralight text-second text-[10px]">
                Share a meal, Change a life
              </p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/available-foods" className={navLinkStyle}>
                Available Foods
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-food" className={navLinkStyle}>
                Create New Food
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-base-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-100 right-0 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className={navLinkStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/available-foods" className={navLinkStyle}>
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink to="/available-foods" className={navLinkStyle}>
                  Our Mission
                </NavLink>
              </li>
              <li>
                <NavLink to="/available-foods" className={navLinkStyle}>
                  Available Foods
                </NavLink>
              </li>
              <li>
                <NavLink to="/create-food" className={navLinkStyle}>
                  Create New Food
                </NavLink>
              </li>
              <li>
                <div className="flex flex-col-reverse">
                  <Link to="/register" className={`${navBtn} w-full`}>
                    Registration
                  </Link>
                  <Link to="/login" className={`${navBtn} w-full`}>
                    Login
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex gap-3">
            <NavLink to="/register" className="themeBtn w-fit">
              <span className="w-auto">Registration</span>
            </NavLink>
            <NavLink to="/login" className="themeBtn w-fit">
              <span className="w-auto">Login</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

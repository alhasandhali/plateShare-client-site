import React, { use } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut, loading } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout successful!"))
      .catch((err) => {
        console.error("Logout error:", err);
        toast.error(err.message || "Failed to logout");
      });
  };

  const navLinkStyle =
    "montserrat text-sm md:text-[16px] text-prime rounded-none";

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
              {user && (
                <li>
                  <div className="flex flex-col">
                    {user.photoURL && (
                      <div className="cursor-pointer flex items-center gap-2">
                        <img
                          src={user?.photoURL}
                          alt={user?.displayName}
                          tabIndex={0}
                          role="button"
                          className="w-10 h-10 rounded-full border-2 border-[#5dae61]"
                        />
                        <p className={`${navLinkStyle} font-bold`}>
                          {user?.displayName}
                        </p>
                      </div>
                    )}
                    <ul className="pl-2">
                      <li>
                        <NavLink to="/create-food" className={navLinkStyle}>
                          Add Food
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/manage-my-foods" className={navLinkStyle}>
                          Manage My Foods
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/my-food-requests"
                          className={navLinkStyle}
                        >
                          My Food Requests
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
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
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn montserrat text-sm text-white bg-gradian mt-3"
                >
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn montserrat text-sm text-white bg-gradian mt-3"
                >
                  Login
                </Link>
              )}
            </ul>
          </div>
          {loading ? (
            <div className="hidden lg:flex justify-between items-center gap-3 dropdown dropdown-bottom dropdown-end">
              <span className="loading loading-spinner loading-md text-prime w-10 h-10 rounded-full border-2 border-[#5dae61] cursor-pointer"></span>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-100 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to="/create-food" className={navLinkStyle}>
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manage-my-foods" className={navLinkStyle}>
                    Manage My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-food-requests" className={navLinkStyle}>
                    My Food Requests
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="themeBtn mt-3">
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : user ? (
            <div className="hidden lg:flex justify-between items-center gap-3 dropdown dropdown-bottom dropdown-end">
              {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  tabIndex={0}
                  role="button"
                  className="w-10 h-10 rounded-full border-2 border-[#5dae61] cursor-pointer"
                />
              )}
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-100 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to="/create-food" className={navLinkStyle}>
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manage-my-foods" className={navLinkStyle}>
                    Manage My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-food-requests" className={navLinkStyle}>
                    My Food Requests
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="themeBtn py-0 mt-3">
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-3">
              <Link to="/login" className="themeBtn w-fit">
                <span className="w-auto">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

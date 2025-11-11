import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ToastContainer />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;

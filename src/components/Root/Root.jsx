import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import CustomLoader from "../CustomLoader/CustomLoader";

const Root = () => {
  const navigation = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout;

    if (navigation.state === "loading") {
      setShowLoader(true);
    } else if (navigation.state === "idle" && showLoader) {
      timeout = setTimeout(() => setShowLoader(false), 100);
    }

    return () => clearTimeout(timeout);
  }, [navigation.state, showLoader]);
  return (
    <div>
      <Navbar></Navbar>
      <ToastContainer />
      {showLoader ? <CustomLoader /> : <Outlet />}
      <Footer></Footer>
    </div>
  );
};

export default Root;

import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <CustomLoader />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;

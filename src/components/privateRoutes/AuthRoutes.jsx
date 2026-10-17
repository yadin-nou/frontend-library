import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

//This AuthRoutes wrapp all children, is user avaiable in Redux, it will show , otherwise to login

const AuthRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  const location = useLocation();
  const isAuth = Boolean(user?._id);
  return isAuth ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: location.pathname + location.search }}
      replace
    />
  );
};

export default AuthRoutes;

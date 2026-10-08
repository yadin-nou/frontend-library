import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//This AuthRoutes wrapp all children, is user avaiable in Redux, it will show , otherwise to login

const AuthRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  const isAuth = Boolean(user?._id);
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default AuthRoutes;

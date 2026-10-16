import React from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
  const userInfo = useSelector((state) => state.userInfo.user);
  // console.log(userInfo, "userProfile");
  return <div>User Page</div>;
};

export default UserPage;

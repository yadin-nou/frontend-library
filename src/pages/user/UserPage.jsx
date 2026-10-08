import React from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
  const userInfo = useSelector((state) => state.userInfo.user);
  console.log(userInfo, "userProfile");
  return <div>User Profile</div>;
};

export default UserPage;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.userInfo);
  return <UserProfile user={user} changePasswordPath="/forget-password" />;
};

export default ProfilePage;

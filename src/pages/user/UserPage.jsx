import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../features/user/userAction";

const UserPage = () => {
  const allUsers = useSelector((state) => state.userInfo.allUsers);
  // console.log(userInfo, "userProfile");
  const dispatch = useDispatch();
  console.log(allUsers);
  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  return <div>{allUsers.map((user) => user.fName)}</div>;
};

export default UserPage;

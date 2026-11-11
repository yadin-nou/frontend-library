import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../features/user/userAction";
import UsersTable from "./UsersTable";

const UserPage = () => {
  const allUsers = useSelector((state) => state.userInfo.allUsers);
  // console.log(userInfo, "userProfile");
  const dispatch = useDispatch();
  //console.log(allUsers);
  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  const handleDeleteUser = async (_id) => {
    // call your delete API, then refresh or update the list
  };

  return (
    <div>
      <UsersTable users={allUsers} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UserPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../features/user/userAction";
import UsersTable from "./UsersTable";
import { Button } from "react-bootstrap";

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
      <div className="d-flex  flex-column gap-2">
        <div className="d-flex justify-content-between">
          <h4>All Users</h4>
          <Button style={{ width: "150px" }}>+ Add users</Button>
        </div>

        <UsersTable users={allUsers} onDelete={handleDeleteUser} />
      </div>
    </div>
  );
};

export default UserPage;

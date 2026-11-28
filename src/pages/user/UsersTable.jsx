import { Table, Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserAction,
  setUserStatusAction,
} from "../../features/user/userAction";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

const UsersTable = ({ users = [], onDelete }) => {
  const logInUser = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const handleDelete = (user) => {
    const ok = window.confirm(
      `Are you sure you want to delete ${user.fName} ${user.lName}?`,
    );
    if (ok) onDelete(user._id);
  };
  const handleStatus = async (data, _id) => {
    await dispatch(setUserStatusAction({ status: data, _id }));
    dispatch(getAllUserAction());
  };
  return (
    <div className="border rounded-3 overflow-hidden">
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle fs-6 text-center"
        style={{ minWidth: "450px" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={user.role === "admin" ? "primary" : "secondary"}>
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Badge
                    bg={user.status === "active" ? "success" : "danger"}
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleStatus(
                        user.status === "active" ? "inactive" : "active",
                        user._id,
                      )
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td className="text-center">
                  {user.email === "nouyadin007@gmail.com" ||
                  user.email === logInUser?.email ? (
                    "-"
                  ) : (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;

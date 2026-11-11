import { Table, Badge, Button } from "react-bootstrap";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

const UsersTable = ({ users = [], onDelete }) => {
  const handleDelete = (user) => {
    const ok = window.confirm(
      `Are you sure you want to delete ${user.fName} ${user.lName}?`,
    );
    if (ok) onDelete(user._id);
  };

  return (
    <div>
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle text-center table-spaced"
        style={{ minWidth: "450px" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date joined</th>
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
                  <Badge bg={user.status === "active" ? "success" : "danger"}>
                    {user.status}
                  </Badge>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td className="text-center">
                  {user.email === "nouyadin007@gmail.com" ? (
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

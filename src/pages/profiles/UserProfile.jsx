import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

const Field = ({ label, children }) => (
  <div className="d-flex flex-column flex-sm-row py-2 border-bottom">
    <div className="text-muted fw-semibold" style={{ minWidth: 140 }}>
      {label}
    </div>
    <div className="flex-grow-1 text-break">{children}</div>
  </div>
);

const UserProfile = ({ user, changePasswordPath = "/forget-password" }) => {
  if (!user) return null;

  const initials = `${user.fName?.[0] || ""}${user.lName?.[0] || ""}`;

  return (
    <Card className="mx-auto" style={{ maxWidth: 800 }}>
      <Card.Body>
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            class="avatar"
            src="https://via.placeholder.com/90"
            alt="User avatar"
          />
          <div>
            <h4 className="mb-0">
              {user.fName} {user.lName}
            </h4>
            <small className="text-muted">{user.role}</small>
          </div>
        </div>

        <Field label="First name">{user.fName}</Field>
        <Field label="Last name">{user.lName}</Field>
        <Field label="Phone">{user.phone || "-"}</Field>
        <Field label="Email">{user.email}</Field>
        <Field label="Member since">{formatDate(user.createdAt)}</Field>
        <Field label="Password">
          <span className="me-2">••••••••</span>
          <Link to={changePasswordPath}>Change</Link>
        </Field>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;

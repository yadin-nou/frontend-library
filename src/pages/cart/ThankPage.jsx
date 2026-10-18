import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ThankPage = () => {
  return (
    <div className="d-flex justify-content-center flex-column">
      <Alert variant="success" style={{ margin: "0 auto" }}>
        <h2>Thank you.</h2>
      </Alert>{" "}
      <br />
      <Alert variant="success" style={{ margin: "0 auto" }}>
        <h5>Thank you for borrow book from the library.</h5>{" "}
        <Link to="/my-borrow">My Borrow</Link>
      </Alert>
    </div>
  );
};

export default ThankPage;

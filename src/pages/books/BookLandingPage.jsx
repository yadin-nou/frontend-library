import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const BookLandingPage = () => {
  return (
    <>
      <Row className="align-items-center g-2 flex-wrap">
        <Col xs="auto" className="ps-md-5">
          <div>Book Loading</div>
        </Col>
        <Col xs="auto" className="ms-auto">
          <Button variant="success">+ Add Book...</Button>
        </Col>
      </Row>
    </>
  );
};

export default BookLandingPage;

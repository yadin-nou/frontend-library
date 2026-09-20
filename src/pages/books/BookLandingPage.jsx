import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import BookTable from "./BookTable";

const BookLandingPage = () => {
  return (
    <>
      <Row className="align-items-center g-2 flex-wrap">
        <Col xs="auto" className="ms-auto">
          <Button variant="success">+ Add Book...</Button>
        </Col>
      </Row>
      <Row className="align-items-center g-2 flex-wrap pt-2">
        <Col xs="12" className="ps-md-5">
          <div>
            <BookTable />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BookLandingPage;

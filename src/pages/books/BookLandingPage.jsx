import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import BookTable from "./BookTable";
import { PlusLg, Search } from "react-bootstrap-icons";

const BookLandingPage = () => {
  return (
    <div>
      <Row className="align-items-center g-2 flex-wrap pt-2 wi">
        <Col className="ps-md-5">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search />
            </InputGroup.Text>
            <Form.Control placeholder="Search by title, author, or ISBN" />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Form.Select>
            <option>All genres</option>
            <option>Fantasy</option>
            <option>Fiction</option>
            <option>Non-fiction</option>
            <option>Sci-fi</option>
            <option>Dystopian</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button variant="success">
            <PlusLg className="me-2" />
            Add book
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center g-2 flex-wrap pt-2">
        <Col xs="12" className="ps-md-5">
          <div>
            <BookTable />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookLandingPage;

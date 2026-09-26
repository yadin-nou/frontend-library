import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SearchBookGlobal = () => {
  return (
    <>
      <Row className="align-items-center g-2 flex-wrap pt-2 wi">
        <Col className="ps-md-5" xs={10}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search />
            </InputGroup.Text>
            <Form.Control placeholder="Search by title, author, or ISBN" />
          </InputGroup>
        </Col>
        <Col>
          <Button variant="success">Search</Button>
        </Col>
      </Row>
    </>
  );
};

export default SearchBookGlobal;

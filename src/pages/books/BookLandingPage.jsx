import React, { useState } from "react";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";

const BookLandingPage = () => {
  return (
    <>
      <Row>
        <Col xs={3}></Col>
        <Col xl={9} md={8}>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              maxWidth: "580px",
              height: "auto",
            }}
          >
            <Card.Img
              src="https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg"
              style={{
                width: "320px",
                height: "100%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <Card.Body className="d-flex align-items-left flex-column">
              <Card.Text>Available</Card.Text>
              <Card.Title>Hello</Card.Title>
              <Card.Text>By:J.R.R Tokien</Card.Text>
              <Card.Text>Review</Card.Text>
              <div className="d-flex justify-content-space gap-5">
                <Card.Text>Hello</Card.Text>
                <Card.Text>Hello</Card.Text>
              </div>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Text className="d-flex justify-content-center">
                <Button variant="success">Borrow now</Button>{" "}
                <Button variant="light">
                  <MdFavoriteBorder /> Save
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Nav fill variant="tabs" defaultActiveKey="/home" className="small">
          <Col xs={2}></Col>
          <Col xs={3}>
            <Nav.Item>
              <Nav.Link href="#" className="py-1 px-2">
                Review
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col xl={4}>
            <Nav.Item>
              <Nav.Link eventKey="link-1" className="py-1 px-2">
                Related Books
              </Nav.Link>
            </Nav.Item>
          </Col>
        </Nav>
      </Row>
    </>
  );
};

export default BookLandingPage;

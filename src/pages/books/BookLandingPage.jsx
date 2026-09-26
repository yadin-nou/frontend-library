import React, { useState } from "react";
import { Button, Card, Col, Row, Tabs, Tab } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";
import { Alert } from "react-bootstrap";
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
                <Button variant="success">Borrow now</Button>
                {"  "}
                <Button variant="light">
                  <MdFavoriteBorder /> Save
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col xs={3}></Col>
        <Col xs={4}>
          <Tabs
            defaultActiveKey="review"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="review" title="Review">
              <Alert variant="light" className="border-start border-4">
                <div className="d-flex justify-content-between mb-1">
                  <strong>Sarah M.</strong>
                  <small className="text-muted">2 days ago</small>
                </div>
                <p className="mb-0 small">
                  A timeless classic — perfect introduction to Middle-earth
                  before tackling the trilogy.
                </p>
              </Alert>
              <Alert variant="light" className="border-start border-4">
                <div className="d-flex justify-content-between mb-1">
                  <strong>James T.</strong>
                  <small className="text-muted">1 week ago</small>
                </div>
                <p className="mb-0 small">
                  Great condition copy, arrived fast. Highly recommend for a
                  cozy weekend read.
                </p>
              </Alert>
            </Tab>
            <Tab eventKey="related" title="Related Books">
              Tab content for related book
            </Tab>
          </Tabs>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </>
  );
};

export default BookLandingPage;

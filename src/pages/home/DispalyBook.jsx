import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { renderStars } from "../../utils/starRating";
const DispalyBook = ({ bookCollection }) => {
  return (
    <>
      <h4 className="pt-5">{bookCollection.length} book(s)</h4>
      <Row xs={2} sm={4} md={6} lg={8} xl={10} className="g-2 pt-1">
        {bookCollection.map((book, idx) => (
          <Col key={idx}>
            <Card className="book-card h-100 fs-5">
              <Card.Img
                variant="top"
                src={book.imgURL}
                className="object-fit-cover"
                style={{
                  height: "350px",
                  width: "100%",
                }}
              />
              <Card.Body>
                <Card.Title className="fs-5">{book.title}</Card.Title>
                <Card.Text className="small">
                  {" "}
                  {renderStars(book.averageRating)} {book.averageRating} <br />
                  <Badge bg={book.availability ? "success" : "danger"} pill>
                    {book.availability ? "Available" : "Borrowed"}
                  </Badge>
                </Card.Text>
                <Button
                  variant="primary"
                  size="md"
                  disabled={book.availability ? false : true}
                >
                  Borrow
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DispalyBook;

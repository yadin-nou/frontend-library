import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllBooks } from "../../axiosHelp/axiosConnected.js";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { renderStars } from "../../utils/starRating";

const HomePage = () => {
  const [bookCollection, setBookCollection] = useState([]);
  //const stars = [1, 2, 3, 4, 5];
  const handelGetAllBook = async () => {
    const getBook = await getAllBooks();
    if (getBook?.status === "success") {
      //console.log(getBook.book);
      //If getBook.book is an array of book objects
      setBookCollection(getBook.book);
    }
  };

  useEffect(() => {
    handelGetAllBook();
  }, []);

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
                  <div>
                    {" "}
                    <div>
                      {renderStars(book.averageRating)} {book.averageRating}
                    </div>
                    <Badge bg={book.availability ? "success" : "danger"} pill>
                      {book.availability ? "Available" : "Borrowed"}
                    </Badge>
                  </div>
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

export default HomePage;

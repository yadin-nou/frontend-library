import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tabs, Tab, Badge } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";
import { Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import { getAllBooks } from "../../axiosHelp/axiosConnected";
import { toast } from "react-toastify";
import { renderStars } from "../../utils/starRating";
import { getAllBooksAction } from "../../features/book/bookAction";
import { useSelector } from "react-redux";
const BookLandingPage = () => {
  const { id } = useParams();
  const bookDetail = useSelector((state) =>
    state.bookInfo.bookCollection.find((bid) => bid._id === id),
  );
  //const [bookDetail, setBookDetail] = useState(null);
  // const getBookDetails = async () => {
  //   const pendingResp = getAllBooksAction({ _id: id });
  //   toast.promise(pendingResp, { pending: "Please wait...." });
  //   const books = await pendingResp;
  //   setBookDetail(books.book[0]);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    // getBookDetails();
  }, []);

  if (!bookDetail) return <p>Loading...</p>;

  const {
    title,
    author,
    availability,
    averageRating,
    description,
    genre,
    imgURL,
    isbn,
  } = bookDetail;

  return (
    <>
      <Row>
        <Col xs={2}>
          <Link
            to="/books"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            &lt;&lt; back
          </Link>
        </Col>
        <Col xl={8} md={8}>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              // maxWidth: "750px",
              height: "auto",
            }}
          >
            <Card.Img
              src={imgURL}
              style={{
                width: "320px",
                height: "100%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <Card.Body className="d-flex align-items-left flex-column">
              <Card.Text>{availability}</Card.Text>
              <Card.Title>
                <h2>{title}</h2>
              </Card.Title>
              <Card.Text>by {author}</Card.Text>
              <Card.Text>
                {" "}
                {renderStars(averageRating)} {averageRating} <br />
                <Badge bg={averageRating ? "success" : "danger"} pill>
                  {averageRating ? "Available" : "Borrowed"}
                </Badge>
              </Card.Text>
              <div className="d-flex justify-content-space gap-5">
                <Card.Text>
                  <span style={{ color: "gray" }}>Genre:</span>
                  <br />
                  {genre}
                </Card.Text>
                <Card.Text>
                  <span style={{ color: "gray" }}>ISBN</span>
                  <br />
                  {isbn}
                </Card.Text>
              </div>
              <Card.Text style={{ maxWidth: "400px" }}>{description}</Card.Text>
              <Card.Text className="d-flex justify-content-left">
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
        <Col xs={12} md={12}>
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

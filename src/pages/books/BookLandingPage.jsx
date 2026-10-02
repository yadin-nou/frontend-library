import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Tabs,
  Tab,
  Badge,
  Container,
} from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";
import { Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { getAllBooks } from "../../axiosHelp/axiosConnected";
import { toast } from "react-toastify";
import { renderStars } from "../../utils/starRating";
import { getAllBooksAction } from "../../features/book/bookAction";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/book/bookSlice";
const BookLandingPage = () => {
  const { id } = useParams();
  const bookDetail = useSelector((state) =>
    state.bookInfo.bookCollection.find((bid) => bid._id === id),
  );
  const relatedBook = useSelector((state) =>
    state.bookInfo.bookCollection.slice(5, 10),
  );

  const carts = useSelector((state) => state.bookInfo.cart);
  const dispatch = useDispatch();
  //const [bookDetail, setBookDetail] = useState(null);
  // const getBookDetails = async () => {
  //   const pendingResp = getAllBooksAction({ _id: id });
  //   toast.promise(pendingResp, { pending: "Please wait...." });
  //   const books = await pendingResp;
  //   setBookDetail(books.book[0]);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    // bookDetail not exist or refresh page
    if (!bookDetail) {
      dispatch(getAllBooksAction({ _id: id }));
    }
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

  const handleAddToCart = () => {
    //console.log(carts);
    let isInclude = false;
    carts.map((book) => {
      if (book._id.includes(id)) {
        toast.warning("This book has already in your Carts!");
        isInclude = true;
        return;
      }
    });
    !isInclude && dispatch(setCart(bookDetail)) && toast.success("Cart added");
  };

  const navi = useNavigate();
  const handleBookDetails = (id) => {
    navi("/books/details/" + id);
  };

  return (
    <>
      <Container>
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
                <Card.Text style={{ maxWidth: "400px" }}>
                  {description}
                </Card.Text>
                <Card.Text className="d-flex justify-content-left">
                  <Button
                    variant="success"
                    onClick={handleAddToCart}
                    disabled={availability ? false : true}
                  >
                    Borrow now
                  </Button>
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
              defaultActiveKey="related"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="related" title="Related Books">
                <Row xs={3} sm={5} md={6} lg={8} xl={10} className="g-2 pt-1">
                  {relatedBook.map((book, idx) => (
                    <Col key={idx}>
                      <Card
                        className="book-card h-100"
                        onClick={(e) => handleBookDetails(book._id)}
                      >
                        <Card.Img
                          variant="top"
                          src={book.imgURL}
                          className="object-fit-cover"
                          style={{
                            height: "180px",
                            width: "100%",
                          }}
                        />
                        <Card.Body className="p-2">
                          <Card.Title className="fs-6 text-truncate">
                            {book.title}
                          </Card.Title>
                          <Card.Text className="small mb-1">
                            {/* {renderStars(book.averageRating)}{" "}
                            {book.averageRating} <br /> */}
                            <Badge
                              bg={book.availability ? "success" : "danger"}
                              pill
                              className="small"
                            >
                              {book.availability ? "Available" : "Borrowed"}
                            </Badge>
                          </Card.Text>
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={!book.availability}
                          >
                            Borrow
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab>
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
            </Tabs>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </>
  );
};

export default BookLandingPage;

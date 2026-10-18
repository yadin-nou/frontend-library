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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { getAllBooks } from "../../axiosHelp/axiosConnected";
import { toast } from "react-toastify";
import { renderStars } from "../../utils/starRating";
import { getAllBooksAction } from "../../features/book/bookAction";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/cart/cartSlice";

const BookLandingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [preLocate, setPreLocate] = useState("");
  const location = useLocation();
  const bookDetail = useSelector((state) =>
    state.bookInfo.bookCollection.find((bid) => bid._id === id),
  );

  const relatedBook = useSelector((state) =>
    state.bookInfo.bookCollection.slice(5, 10),
  );

  const carts = useSelector((state) => state.cartInfo.cart);

  //const [bookDetail, setBookDetail] = useState(null);
  // const getBookDetails = async () => {
  //   const pendingResp = getAllBooksAction({ _id: id });
  //   toast.promise(pendingResp, { pending: "Please wait...." });
  //   const books = await pendingResp;
  //   setBookDetail(books.book[0]);
  // };
  const from = location.state?.from || "/books";
  useEffect(() => {
    window.scrollTo(0, 0);
    // bookDetail not exist or refresh page

    // if (!bookDetail) {
    //   dispatch(getAllBooksAction({ _id: id }));
    // }
    if (!relatedBook.lenth) {
      dispatch(getAllBooksAction());
    }
    // getBookDetails();
    setPreLocate(from);
  }, [id]);

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

  const handleBookDetails = (id) => {
    navi(`/books/details/${id}`, { state: { from: from } });
  };

  // const from = location.pathname + location.search;
  return (
    <>
      <Container>
        <Row className="g-3 pt-5">
          <Col xs={2} md={2}>
            <Link to={from} style={{ textDecoration: "none", color: "white" }}>
              &lt;&lt; Back
            </Link>
          </Col>
          <Col xs={12} md={10} xl={8}>
            <Card className="d-flex flex-column flex-lg-row h-auto">
              <Card.Img
                src={imgURL}
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
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
                  <Badge bg={availability ? "success" : "danger"} pill>
                    {availability ? "Available" : "Borrowed"}
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
                <Row xs={1} sm={2} md={3} lg={4} className="g-3 pt-1">
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
                            aspectRatio: "1/2",
                            objectFit: "contain",
                            maxHeight: "350px",
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

import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import BookTable from "./BookTable";
import { PlusLg, Search } from "react-bootstrap-icons";
import AddBook from "./AddBook";
import ImportBook from "./ImportBook";
import { useDispatch, useSelector } from "react-redux";
// import { deleteBook, getAllBooks } from "../../axiosHelp/axiosConnected";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  deleteBookAction,
  getAllBooksAction,
} from "../../features/book/bookAction";

const BookList = () => {
  const bookCollection = useSelector((state) => state.bookInfo.bookCollection);
  const dispatch = useDispatch();
  //const [bookCollection, setBookCollection] = useState([]);
  const [searchBook, setSearchBook] = useState([]);
  const BookSearchList = (search) => {
    const filteredBooks = bookCollection.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setSearchBook(filteredBooks);
  };
  const BookSelected = (search) => {
    const filteredBooks = bookCollection.filter((book) => {
      if (search != "All genres") {
        return book.genre.toLowerCase().includes(search.toLowerCase());
      } else {
        return book;
      }
    });
    setSearchBook(filteredBooks);
  };
  const handelGetAllBook = async () => {
    // const getBook = await getAllBooksAction();
    // if (getBook?.status === "success") {
    //   //console.log(getBook.book);
    //   //If getBook.book is an array of book objects
    //   setBookCollection(getBook.book);
    // }
    dispatch(getAllBooksAction());
  };
  const handleDeleteBook = async (book_id) => {
    const conf = window.confirm("Are you sure want to delete this book?");

    if (conf) {
      const jsonBook_id = [book_id];

      const { status, message } = await deleteBookAction(jsonBook_id);

      if (status === "success") {
        toast.success(message);
        handelGetAllBook();
      } else {
        toast.error("Failed to delete book.!");
      }
    }
  };
  // useEffect(() => {
  //   handelGetAllBook();
  // }, [dispatch]);

  useEffect(() => {
    setSearchBook(bookCollection);
  }, [bookCollection]);

  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  return (
    <div>
      <Row className="align-items-center g-2 flex-wrap pt-2 wi">
        <Col className="ps-md-5">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search onChange={(e) => BookSearchList(e.target.value)} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => BookSearchList(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Form.Select onChange={(e) => BookSelected(e.target.value)}>
            <option value="All genres">All genres</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Classic">Classic</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Thriller">Thriller</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <ImportBook handelGetAllBook={handelGetAllBook} />
        </Col>
        <Col xs="auto">
          {/* <Button variant="success" onClick={handleAddBook}>
            <PlusLg className="me-2" />
            Add book
          </Button> */}
          <AddBook handelGetAllBook={handelGetAllBook} />
        </Col>
      </Row>
      <Row className="align-items-center g-2 flex-wrap pt-2">
        <Col xs="12" className="ps-md-5">
          <div>
            <BookTable
              searchBook={searchBook}
              bookCollection={bookCollection}
              handleDeleteBook={handleDeleteBook}
              handelGetAllBook={handelGetAllBook}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookList;

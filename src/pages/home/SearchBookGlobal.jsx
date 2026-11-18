import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";

const SearchBookGlobal = () => {
  const [searchBook, setSearchBook] = useState([]);
  const bookCollection = useSelector((state) => state.bookInfo.bookCollection);

  const BookSearchList = (search) => {
    if (search === "") {
      setSearchBook([]);
      return;
    }
    const filteredBooks = bookCollection.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });

    setSearchBook(filteredBooks);
  };
  // useEffect(() => {
  //   setSearchBook(bookCollection);
  // }, [bookCollection]);

  return (
    <>
      <Row className="align-items-center g-2 flex-wrap pt-2 wi">
        <Col className="ps-md-5" xs={10}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => BookSearchList(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col>
          <Button variant="success">Search</Button>
        </Col>
      </Row>
      <CustomCard bookCollection={searchBook} />
    </>
  );
};

export default SearchBookGlobal;

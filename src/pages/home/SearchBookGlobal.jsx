import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { useSearchParams } from "react-router-dom";
import { MdClear } from "react-icons/md";
const SearchBookGlobal = ({ setIsSearch, setFound }) => {
  const [searchBook, setSearchBook] = useState([]);
  const bookCollection = useSelector((state) => state.bookInfo.bookCollection);
  const [searchData, setSearchData] = useState("");
  const [searchParams] = useSearchParams();
  const searchPar = searchParams.get("search");
  const dt = searchParams.get("dt");
  //console.log(dt, searchPar);
  const BookSearchList = (search) => {
    setSearchData(search);
    if (search === "") {
      setSearchBook([]);
      setIsSearch(false);
      setSearchData("");
      return;
    }

    setIsSearch(true);
    const filteredBooks = bookCollection.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search?.toLowerCase()) ||
        book.author.toLowerCase().includes(search?.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search?.toLowerCase());
      setFound(true);
      return matchesSearch;
    });
    if (filteredBooks.length === 0 && search !== "") {
      setSearchBook([]);
      setIsSearch(false);
      setFound(false);
      return;
    }
    setSearchBook(filteredBooks);
  };
  useEffect(
    () => {
      if (dt) {
        searchPar === "true" && setSearchData(dt);
        BookSearchList(dt);
      } else {
        setSearchBook([]);
        setSearchData("");
        setIsSearch(false);
        setFound(true);
      }
    },
    [searchPar],
    dt,
  );
  const clearSearch = () => {
    setSearchData("");
    setSearchBook([]);
    setIsSearch(false);
    setFound(true);
  };
  return (
    <>
      <Row className="align-items-center g-2 flex-wrap pt-2 wi">
        <Col xs={12}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by title, author, or ISBN"
              value={searchData}
              onChange={(e) => BookSearchList(e.target.value)}
            />
            <InputGroup.Text className="bg-white">
              <MdClear className="fs-2 cursor-pointer" onClick={clearSearch} />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        {/* <Col>
          <Button variant="success">Search</Button>{" "}
        </Col> */}
      </Row>
      <CustomCard
        bookCollection={searchBook}
        search={true}
        searchData={searchData}
      />
    </>
  );
};

export default SearchBookGlobal;

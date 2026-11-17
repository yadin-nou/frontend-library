import React, { useEffect } from "react";
//import { useEffect, useState } from "react";
// import { getAllBooks } from "../../axiosHelp/axiosConnected.js";
import {
  BestRead,
  CustomCarousel,
  DisplayBook,
  NewArrival,
  Recommended,
  SearchBookBlobal,
} from "../index.js";
//import { getAllBooksAction } from "../../features/book/bookAction.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksAction } from "../../features/book/bookAction.js";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
  //const [bookCollection, setBookCollection] = useState([]);
  const dispatch = useDispatch();
  //const stars = [1, 2, 3, 4, 5];
  //const handelGetAllBook = () => {
  // const getBook = await getAllBooksAction();
  // if (getBook?.status === "success") {
  //   //console.log(getBook.book);
  //   //If getBook.book is an array of book objects
  //   setBookCollection(getBook.book);
  // }
  //};

  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  return (
    <>
      <SearchBookBlobal />
      <Container>
        <Row>
          <Col>
            <CustomCarousel />
            <NewArrival />
            <BestRead />
            <Recommended />
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>

      {/* New Arrival
      Best Read Section
      Recommand Section */}
      {/* <DisplayBook bookCollection={bookCollection} /> */}
    </>
  );
};

export default HomePage;

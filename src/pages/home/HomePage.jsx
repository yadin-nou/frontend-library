import React, { useEffect, useState } from "react";
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

import { getAllBooksAction } from "../../features/book/bookAction.js";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
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
            {/* <Recommended /> */}
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

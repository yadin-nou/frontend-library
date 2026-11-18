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
  const [isSearch, setIsSearch] = useState(false);
  const [found, setFound] = useState(true);
  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  return (
    <>
      <SearchBookBlobal setIsSearch={setIsSearch} setFound={setFound} />

      <Container>
        <Row>
          <div className="pt-3 d-flex justify-content-center text-danger">
            {!found && <h4>Book Not Found!</h4>}
          </div>
          {!isSearch && (
            <Col>
              <CustomCarousel />
              <NewArrival />
              <BestRead />
              {/* <Recommended /> */}
            </Col>
          )}
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

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import AuthRoutes from "../privateRoutes/AuthRoutes";
import { Col, Row } from "react-bootstrap";
import PageNav from "./PageNav";

export const DefaultLayout = () => {
  return (
    <>
      {/* <AuthRoutes> */}
      <Row style={{ height: "100px" }}>
        <Col sm={12}>
          <Header />
        </Col>
      </Row>
      <Row className="border rounded-4 shadow justify-content-center mt-2 mx-0">
        <Col xs={12} sm={11} className="d-flex justify-content-center">
          <main
            className="main w-100 d-flex flex-column justify-content-center"
            style={{ minHeight: "75vh" }}
          >
            <Outlet />
          </main>
        </Col>
      </Row>
      <Row className="mt-2 ">
        <Col
          sm={12}
          className="border rounded-4 shadow  bg-black text-white d-flex justify-content-center align-items-center"
          style={{ minHeight: "10vh" }}
        >
          <footer>
            {" "}
            <Footer />
          </footer>
        </Col>
      </Row>
      {/* </AuthRoutes> */}
    </>
  );
};

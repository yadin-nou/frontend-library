import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import PageNav from "./PageNav";

export const UserLayout = () => {
  return (
    <>
      <Row>
        <Col sm={12}>
          {" "}
          <Header />
        </Col>
      </Row>
      <Row style={{ height: "80vh" }}>
        <Col sm={1}>
          <aside>
            <PageNav />
          </aside>
        </Col>
        <Col sm={11} className="d-flex justify-content-center">
          <main className="main">
            <Outlet />
          </main>
        </Col>
      </Row>
      <Row>
        <Col
          sm={12}
          className="bg-black text-white d-flex justify-content-center align-items-center"
          style={{ minHeight: "10vh" }}
        >
          <footer>
            {" "}
            <Footer />
          </footer>
        </Col>
      </Row>
    </>
  );
};

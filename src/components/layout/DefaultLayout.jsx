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
      <AuthRoutes>
        <Row>
          <Col sm={12}>
            {" "}
            <Header />
          </Col>
        </Row>
        <Row style={{ height: "auto" }} className="border rounded-4 shadow ">
          <Col sm={11} className="d-flex justify-content-center pt-3">
            <main className="main ps-5" style={{ width: "100vw" }}>
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
      </AuthRoutes>
    </>
  );
};

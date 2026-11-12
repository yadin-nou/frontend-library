import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import PageNav from "./PageNav";
import AuthRoutes from "../privateRoutes/AuthRoutes";
export const UserLayout = () => {
  return (
    <>
      <AuthRoutes>
        <Row style={{ height: "auto" }}>
          <Col sm={12}>
            <Header />
          </Col>
        </Row>

        <Row
          style={{ height: "auto" }}
          className="border rounded-4 shadow flex-nowrap"
        >
          <Col xs="auto" className="px-0" style={{ width: 64 }}>
            <aside className="sidebar-narrow">
              <PageNav />
            </aside>
          </Col>

          {/* <Col
            className="d-flex justify-content-center pt-1"
            style={{ minWidth: 0 }}
          >
            <main
              className="main ps-2 ps-md-5 w-100 d-flex justify-content-center"
              style={{ overflow: "auto", minWidth: 0 }}
            >
              <Outlet />
            </main>
          </Col> */}
          <Col className="pt-1" style={{ minWidth: 0 }}>
            <main
              className="main ps-2 ps-md-5 w-100 d-flex"
              style={{ overflowX: "auto", minWidth: 0 }}
            >
              <div
                className="mx-auto"
                style={{ minWidth: 0, maxWidth: "100%" }}
              >
                <Outlet />
              </div>
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

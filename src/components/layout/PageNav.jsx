import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  Speedometer2,
  BookFill,
  PeopleFill,
  ShieldLockFill,
  ArrowLeftRight,
  StarFill,
  PersonCircle,
} from "react-bootstrap-icons";
const PageNav = () => {
  const urlLink = "/";
  return (
    <>
      <Nav className="flex-column p-3" variant="pills">
        {/* <Nav.Link
          as={NavLink}
          to="/dashboard"
          end
          className="sidebar-link mb-1"
        >
          <Speedometer2 className="me-2" />
          Dashboard
        </Nav.Link> */}
        <Nav.Link as={NavLink} to="books" className="sidebar-link mb-1">
          <BookFill className="me-2" size={40} />
          Books
        </Nav.Link>
        <Nav.Link as={NavLink} to="userpage" className="sidebar-link mb-1">
          <PeopleFill className="me-2" size={40} />
          Users
        </Nav.Link>
        <Nav.Link as={NavLink} to="admins" className="sidebar-link mb-1">
          <ShieldLockFill className="me-2" size={40} />
          Admins
        </Nav.Link>
        <Nav.Link as={NavLink} to="borrows" className="sidebar-link mb-1">
          <ArrowLeftRight className="me-2" size={40} />
          Borrows
        </Nav.Link>
        <Nav.Link as={NavLink} to="reviews" className="sidebar-link mb-1">
          <StarFill className="me-2" size={40} />
          Reviews
        </Nav.Link>
        <Nav.Link as={NavLink} to="profiles" className="sidebar-link mb-1">
          <PersonCircle className="me-2" size={40} />
          Profile
        </Nav.Link>
      </Nav>
    </>
  );
};

export default PageNav;

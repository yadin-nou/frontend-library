import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import {
  Speedometer2,
  BookFill,
  PeopleFill,
  ShieldLockFill,
  ArrowLeftRight,
  StarFill,
  PersonCircle,
} from "react-bootstrap-icons";
import { TbBookUpload } from "react-icons/tb";
import { useSelector } from "react-redux";
import LeftNavBar from "./LeftNavBar";
import ToolTips from "../Tooltips/ToolTips";
const PageNav = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <>
      {/* {["start"].map((placement, idx) => (
        <LeftNavBar key={idx} placement={placement} name={placement} />
      ))} */}
      <Nav className="flex-column" variant="pills">
        <Nav.Link
          as={NavLink}
          to=""
          end
          className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
        >
          <ToolTips text="Dashboard">
            <Speedometer2 className="me-2" size={40} />
          </ToolTips>
        </Nav.Link>

        {user?.role === "admin" && (
          <>
            <Nav.Link
              as={NavLink}
              to="books"
              className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
            >
              <ToolTips text="Display Books">
                {" "}
                <BookFill className="me-2" size={40} />
              </ToolTips>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="userpage"
              className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
            >
              <ToolTips text="Display Users">
                <PeopleFill className="me-2" size={40} />
              </ToolTips>
            </Nav.Link>
            {/* <Nav.Link
              as={NavLink}
              to="admins"
              className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
            >
              <ShieldLockFill className="me-2" size={40} />
              Admins
            </Nav.Link> */}
            <Nav.Link
              as={NavLink}
              to="allborrows"
              className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
            >
              <ToolTips text="All Borrows">
                <ArrowLeftRight className="me-2" size={40} />
              </ToolTips>
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="reviews"
              className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
            >
              <ToolTips text="Reviews">
                {" "}
                <StarFill className="me-2" size={40} />
              </ToolTips>
            </Nav.Link>
          </>
        )}
        <Nav.Link
          as={NavLink}
          to="my-borrow"
          className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
        >
          <ToolTips text="My Borrows">
            <TbBookUpload className="me-2" size={40} />
          </ToolTips>
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="profile"
          className="sidebar-link mb-1 d-flex justify-content-left align-items-center"
        >
          <ToolTips text="My Profile">
            <PersonCircle className="me-2" size={40} />
          </ToolTips>
        </Nav.Link>
      </Nav>
    </>
  );
};

export default PageNav;

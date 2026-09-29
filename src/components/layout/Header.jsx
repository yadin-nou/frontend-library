import React from "react";
import lmsLogo from "../../assets/images/logo.jpg";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
const Header = () => {
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center border rounded-4 shadow ">
        <div>
          <div>
            <img
              src={lmsLogo}
              width={100}
              height={100}
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="p-1">Welcome back, Yadin</div>
          {/* if login we show this */}
          {/* <div>Welcome to Yadin</div> */}
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <Nav justify variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/"
                eventKey="/home"
                className="sidebar-link mb-1"
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/signup"
                eventKey="/signup"
                className="sidebar-link mb-1"
              >
                SignUp
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="/login"
                as={NavLink}
                to="/login"
                className="sidebar-link mb-1 "
              >
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/logout"
                eventKey="/logout"
                className="sidebar-link mb-1 "
              >
                Logout
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/carts"
                eventKey="/carts"
                className="sidebar-link mb-1 position-relative"
              >
                {" "}
                <div className="position-absolute cart-count">3</div>
                <GiShoppingCart className="fs-3" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Header;

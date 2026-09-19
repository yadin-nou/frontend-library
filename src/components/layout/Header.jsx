import React from "react";
import lmsLogo from "../../assets/images/logo.jpg";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="d-flex justify-content-between align-item-center border">
        <div>
          <div>
            <img
              src={lmsLogo}
              width={150}
              height={150}
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          {/* if login we show this */}
          {/* <div>Welcome to Yadin</div> */}
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <Nav justify variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/signup"
                eventKey="/signup"
                className="sidebar-link mb-1 "
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
            {/* <Nav.Item>
              <Nav.Link as={NavLink} eventKey="/logout">
                Logout
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Header;

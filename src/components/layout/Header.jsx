import React, { useEffect } from "react";
import lmsLogo from "../../assets/images/logo.jpg";
import { Container, Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocalStorage,
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
} from "../../localStorage/storage";
import { setUser } from "../../features/user/userSlice";
import { logoutUserAPI } from "../../service/authAPI";
import { autoLoginUser } from "../../features/user/userAction";
const Header = () => {
  const carts = useSelector((state) => state.cartInfo.cart);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const handelLogoutUser = async (e) => {
    e.preventDefault();
    try {
      //call api
      await logoutUserAPI(getSessionStorage("accessJWT"));
    } catch (error) {
      console.log("Logout API failed", error);
    } finally {
      //remove session & local session
      removeLocalStorage("refreshJWT");
      removeSessionStorage("accessJWT");
      //remove user from redux
      dispatch(setUser(null));
      dispatch(setAllBorrow(null));
      dispatch(setMyBorrow(null));
      //redirect to home page
    }
  };
  useEffect(() => {
    if (getSessionStorage("accessJWT") || getLocalStorage("refreshJWT")) {
      dispatch(autoLoginUser());
    }
  }, [user?._id]);
  return (
    <>
      <header className="d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <img
              src={lmsLogo}
              width={80}
              height={80}
              style={{ mixBlendMode: "multiply" }}
            />
            {user?._id && (
              <div className="p-1">
                Welcome back, {user?.fName} ({user?.role})
              </div>
            )}
          </div>

          {/* if login we show this */}
          {/* <div>Welcome to Yadin</div> */}
        </div>
        {["xl"].map((expand) => (
          <Navbar key={expand} expand={expand} className=" mb-3">
            <Container fluid>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Library System
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="d-flex justify-content-left align-items-center gap-3">
                    <Nav justify variant="tabs" defaultActiveKey="/">
                      <Nav.Item>
                        <Nav.Link
                          as={NavLink}
                          to="/"
                          eventKey="/home"
                          className="sidebar-link mb-1 d-flex justify-content-base align-items-center gap-1"
                        >
                          <FaHome />
                          Home
                        </Nav.Link>
                      </Nav.Item>
                      {user?._id ? (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              as={NavLink}
                              to="/user"
                              eventKey="/dashboard"
                              className="sidebar-link mb-1 d-flex justify-content-center align-items-center gap-1"
                            >
                              <MdOutlineDashboard />
                              Dashboard
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              as={NavLink}
                              to="/logout"
                              eventKey="/logout"
                              className="sidebar-link mb-1 d-flex justify-content-base align-items-center gap-1 "
                              onClick={handelLogoutUser}
                            >
                              <CiLogout /> Logout
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      ) : (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              as={NavLink}
                              to="/signup"
                              eventKey="/signup"
                              className="sidebar-link mb-1 d-flex justify-content-center align-items-center gap-1"
                            >
                              <IoPersonAddOutline />
                              SignUp
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="/login"
                              as={NavLink}
                              to="/login"
                              className="sidebar-link mb-1 d-flex justify-content-base align-items-center gap-1"
                            >
                              <CiLogin /> Login
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      )}

                      <Nav.Item>
                        <Nav.Link
                          as={NavLink}
                          to="/carts"
                          eventKey="/carts"
                          className="sidebar-link mb-1 position-relative d-flex justify-content-base align-items-center gap-1"
                        >
                          {" "}
                          <div className="position-absolute cart-count">
                            {carts.length}
                          </div>
                          <GiShoppingCart className="fs-3" />
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </header>
    </>
  );
};

export default Header;

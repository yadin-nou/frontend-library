import React from "react";
import lmsLogo from "../../assets/images/logo.jpg";
import { Nav } from "react-bootstrap";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
} from "../../localStorage/storage";
import { setUser } from "../../features/user/userSlice";
import { logoutUserAPI } from "../../service/authAPI";
const Header = () => {
  const carts = useSelector((state) => state.bookInfo.cart);
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
      //redirect to home page
    }
  };
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
            {user?._id ? (
              <>
                <Nav.Item>
                  <Nav.Link
                    as={NavLink}
                    to="/user"
                    eventKey="/dashboard"
                    className="sidebar-link mb-1"
                  >
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={NavLink}
                    to="/logout"
                    eventKey="/logout"
                    className="sidebar-link mb-1 "
                    onClick={handelLogoutUser}
                  >
                    Logout
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
              </>
            )}

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/carts"
                eventKey="/carts"
                className="sidebar-link mb-1 position-relative"
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
      </header>
      <hr />
    </div>
  );
};

export default Header;

import React from "react";
import { Route, Routes } from "react-router-dom";
//we don't need to import /pages/index.js, just /pages
import {
  HomePage,
  DashboardPage,
  SignInPage,
  SignUpPage,
  ForgetPasswordPage,
  PageNotFound,
  BookLandingPage,
  UserPage,
  BorrowPage,
  Reviewspage,
  ProfilePage,
  BookList,
  CartPage,
  VerifyUser,
  ThankPage,
} from "../pages";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { UserLayout } from "../components/layout/UserLayout";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.userInfo);
  const msg = <h1>Access Deny Page</h1>;
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/books" element={<HomePage />}></Route>
          <Route
            path="/books/details/:id"
            element={<BookLandingPage />}
          ></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<SignInPage />}></Route>
          <Route path="/logout" element={<HomePage />}></Route>
          <Route path="/activate-user" element={<VerifyUser />}></Route>
          <Route path="/carts" element={<CartPage />}></Route>

          <Route
            path="/forget-password"
            element={<ForgetPasswordPage />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>

        <Route path="/user" element={<UserLayout />}>
          {/*All users*/}
          <Route index element={<DashboardPage />}></Route>
          <Route path="/user/profile" element={<ProfilePage />}></Route>
          <Route path="/user/thanks" element={<ThankPage />}></Route>
          <Route path="/user/my-borrow" element={<BorrowPage />}></Route>
          {/*Thank you page*/}
          {/*my-borrow page*/}
          {/* <Route
            path="/user/books/details"
            element={<BookLandingPage />}
          ></Route> */}
          {/*Only Admin*/}
          <Route
            path="/user/books"
            element={user?.role === "admin" ? <BookList /> : msg}
          ></Route>
          <Route
            path="/user/userpage"
            element={user?.role === "admin" ? <UserPage /> : msg}
          ></Route>
          <Route
            path="/user/allborrows"
            element={user?.role === "admin" ? <BorrowPage /> : msg}
          ></Route>
          <Route
            path="/user/reviews"
            element={user?.role === "admin" ? <Reviewspage /> : msg}
          ></Route>

          {/*Page not found*/}
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

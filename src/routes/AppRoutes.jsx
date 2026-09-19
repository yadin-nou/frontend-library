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
} from "../pages";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { UserLayout } from "../components/layout/UserLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<SignInPage />}></Route>
          <Route
            path="/forget-password"
            element={<ForgetPasswordPage />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<DashboardPage />}></Route>
          <Route path="/user/books" element={<BookLandingPage />}></Route>
          <Route path="/user/userpage" element={<UserPage />}></Route>
          <Route path="/user/borrows" element={<BorrowPage />}></Route>
          <Route path="/user/reviews" element={<Reviewspage />}></Route>
          <Route path="/user/profiles" element={<ProfilePage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

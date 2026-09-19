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
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<DashboardPage />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

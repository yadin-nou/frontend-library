import React from "react";
import { Route, Routes } from "react-router-dom";
//we don't need to import /pages/index.js, just /pages
import { HomePage, DashboardPage } from "../pages";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<DashboardPage />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

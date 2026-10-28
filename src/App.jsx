import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import bgImg from "./assets/images/jonathan-francisca-BpbkLACP64M-unsplash.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewAction } from "./features/review/reviewAction";
const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(getAllReviewAction(isAdmin));
  }, [dispatch, isAdmin]);
  return (
    <>
      <div
        className="container-m p-3"
        style={{
          background: "#e1e1e1de",
          minHeight: "220vh",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <AppRoutes />
      </div>
    </>
  );
};

export default App;

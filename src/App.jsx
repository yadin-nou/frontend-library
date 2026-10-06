import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import bgImg from "./assets/images/jonathan-francisca-BpbkLACP64M-unsplash.jpg";
const App = () => {
  return (
    <>
      <div
        className="container-m p-5"
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

import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <div
        className="container-m p-5"
        style={{
          background: "#e1e1e1de",
          maxHeight: "100vh",
          margin: "0 auto",
        }}
      >
        <AppRoutes />
      </div>
    </>
  );
};

export default App;

import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <div className="container">
        <AppRoutes />
      </div>
    </>
  );
};

export default App;

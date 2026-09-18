import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const notify = () => toast.success("Wow so easy!");
  return (
    <>
      <div onClick={notify}>Welcome to Library Management System</div>
      <ToastContainer />
    </>
  );
};

export default App;

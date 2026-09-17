import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

const App = () => {
  toasti("Wow so easy!");
  return (
    <>
      <div>Welcome to Library Management System</div>
      <ToastContainer />
    </>
  );
};

export default App;

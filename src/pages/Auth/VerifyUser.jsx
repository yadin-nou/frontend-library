import React from "react";
import useSpinner from "../../hooks/useSpinner";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const VerifyUser = () => {
  const { spinner, setSpinner } = useSpinner(true);
  const [isPending, setPending] = useState(true);

  return (
    <>
      {isPending && (
        <div className="m-auto d-flex justify-content-center align-items-center flex-column">
          <div>
            <Spinner animation="border" variant="success" />
          </div>
          <div className="text-danger">
            Please wait..... don't not close the browser!
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyUser;

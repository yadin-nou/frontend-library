import React from "react";
import useSpinner from "../../hooks/useSpinner";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { activateUserAPI } from "../../service/authAPI";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const VerifyUser = () => {
  //const { spinner, setSpinner } = useSpinner(true);
  const [isPending, setPending] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [response, setResponse] = useState({});
  const t = searchParams.get("t");
  const navi = useNavigate();
  useEffect(() => {
    const activateUser = async () => {
      const result = await activateUserAPI({ sessionId, t });
      setTimeout(() => {
        setResponse(result);
        setPending(false);
      }, 3000);
    };
    activateUser();
  }, [sessionId, t]);
  return (
    <>
      <div className="m-auto d-flex justify-content-center">
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
        {response?.message && (
          <Alert
            variant={response?.status === "success" ? "success" : "danger"}
          >
            {response?.message}
            {response?.status === "success" && (
              <Link to="/login"> Login Now</Link>
            )}
          </Alert>
        )}
      </div>
    </>
  );
};

export default VerifyUser;

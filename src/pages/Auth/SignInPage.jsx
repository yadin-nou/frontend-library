import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../../service/authAPI";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from "../../localStorage/storage.js";
import {
  autoLoginUser,
  getUserAction,
} from "../../features/user/userAction.js";
import useSpinner from "../../hooks/useSpinner.js";

const SignInPage = () => {
  const { formData, setFormData, handleOnChange } = useFormHook({});
  const { user } = useSelector((state) => state.userInfo);
  const { spinner, setSpinner } = useSpinner(false);
  const navi = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const formLogin = [
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "youremail@domain.com",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
      placeholder: "********",
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (email && password) {
      const pendingResp = loginUserAPI({ email, password });
      toast.promise(pendingResp, { pending: "Please wait..." });
      const result = await pendingResp;
      //  console.log(result);
      if (result?.status === "success") {
        toast.success("Login successfully");
        // console.log(result.payload.refreshJWT);
        setLocalStorage(result.payload.refreshJWT);
        setSessionStorage(result.payload.accessJWT);
        await dispatch(getUserAction());
        //useEffect will check user avaiable in Redux state if yes, direct to user
        return;
      }
      if (result?.status === "error") {
        toast.error(result.message);
        return;
      }
    } else {
      alert("Please file both forms!");
    }
  };
  const from = location.state?.from || "/user";
  useEffect(() => {
    // at user URL will check by AuthRoute to check user when refresh page or new tap.
    // otherwise, dispatch autologin by accessJWT to user infomation and then set to Redux again.
    if (getSessionStorage("accessJWT") || getLocalStorage("refreshJWT")) {
      setSpinner(true);
      setTimeout(() => {
        user?._id ? navi(from, { replace: true }) : dispatch(autoLoginUser());
        setSpinner(false);
      }, 1000);

      //setSpinner(false);
    } else {
      setSpinner(false);
    }
  }, [user?._id, navi]);

  return (
    <>
      {!spinner ? (
        <div
          className="bg-white p-4 rounded-4 shadow"
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "400px",
            margin: "0 auto",
          }}
        >
          <h3 className="d-flex justify-content-center">Welcome back!</h3>
          <Container fluid style={{ alignSelf: "center" }}>
            <Form onSubmit={handleOnSubmit}>
              {formLogin.map((frm) => (
                <FormTemplate
                  key={frm.name}
                  {...frm}
                  onChange={handleOnChange}
                />
              ))}
              <div className="d-grid">
                <Button type="submit" variant="success">
                  Login
                </Button>
              </div>
            </Form>
            <p className="pt-3">
              Forget Password? <Link to="/forget-password">Reset Now</Link>
            </p>
          </Container>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            margin: "0 auto",
          }}
        >
          <Spinner animation="border" variant="success"></Spinner>
        </div>
      )}
    </>
  );
};

export default SignInPage;

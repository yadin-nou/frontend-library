import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";

import useFormHook from "../../hooks/useFormHook";
import { requestPassUserAPI, resetPassUserAPI } from "../../service/authAPI";
import { toast } from "react-toastify";
import useSpinner from "../../hooks/useSpinner";
import { Link, useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  const { formData, setFormData, handleOnChange, pwdErrors, setPwdErrors } =
    useFormHook({});
  const [showForm, setShowForm] = useState(false);
  const { spinner, setSpinner } = useSpinner(false);
  const [count, setCount] = useState(0);
  const navi = useNavigate();
  const formForgetPass = [
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "youremail@domain.com",
      required: true,
      value: formData.email,
    },
  ];

  const formResetPassword = [
    {
      type: "text",
      name: "otp",
      label: "OTP Code",
      placeholder: "Code 6 Digits",
      required: true,
      value: formData.otp,
    },
    {
      type: "password",
      name: "password",
      label: "New Password",
      required: true,
      placeholder: "********",
      value: formData.password,
    },
    {
      type: "password",
      name: "cpassword",
      label: "Confirm Password",
      required: true,
      placeholder: "********",
      value: formData.cpassword,
    },
  ];

  const emptyResetForm = [
    {
      otp: "",
      password: "",
      cpassword: "",
    },
  ];
  const handleOnSendEmailSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    //  const { email } = formData.email;
    const pendingRes = requestPassUserAPI({ email: formData.email });
    toast.promise(pendingRes, { pending: "Please wait...." });
    const { status, message } = await pendingRes;
    if (status === "success") {
      setShowForm(true);
      setSpinner(false);
      toast.success(message);
      setCount(120);
      setInterval(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    if (status === "error") {
      toast.error(message);
      setSpinner(false);
    }

    //  console.log(formData);
  };
  const handleOnResetSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const pendingRes = resetPassUserAPI(formData);
    toast.promise(pendingRes, { pending: "Please wait" });
    const user = await pendingRes;
    if (user?.status === "success") {
      toast.success("Your password has been updated!");
      setTimeout(() => navi("/login"), 3000);
      setSpinner(false);
    } else {
      toast.error("Invalid OTP");
      setSpinner(false);
    }
    //console.log(formData);
  };

  return (
    <>
      <div
        className="bg-white p-4 rounded-4 shadow"
        style={{
          width: "100%",
          maxWidth: "380px",
          height: "auto",
          margin: "0 auto",
        }}
      >
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h3>Reset Password! </h3>
        </div>

        <Container fluid style={{ alignSelf: "center" }}>
          <Form onSubmit={handleOnSendEmailSubmit}>
            {formForgetPass.map((frm) => (
              <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
            ))}
            <div className="d-grid text-center">
              {!spinner ? (
                <Button
                  type="submit"
                  variant="success"
                  disabled={count === 0 ? false : true}
                >
                  Send {showForm && (count === 0 ? " " : count)}
                </Button>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" variant="success" />
                </div>
              )}
            </div>
            <p className="pt-3">
              Ready to Login <Link to="/login">Login</Link>
            </p>
          </Form>

          {showForm && (
            <>
              <Form onSubmit={handleOnResetSubmit}>
                <div>
                  <Alert>Please fill OTP code from your email:</Alert>
                  {formResetPassword.map((frm) => (
                    <FormTemplate
                      key={frm.name}
                      {...frm}
                      onChange={handleOnChange}
                    />
                  ))}
                  <div className="text-danger">
                    <ul>
                      {pwdErrors.length > 0 &&
                        pwdErrors.map((pwd) => <li key={pwd}>{pwd}</li>)}
                    </ul>
                  </div>
                  <div className="d-grid">
                    {!spinner ? (
                      <Button
                        type="submit"
                        variant="success"
                        disabled={pwdErrors.length}
                      >
                        Reset Now
                      </Button>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="success" />
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default ForgetPasswordPage;

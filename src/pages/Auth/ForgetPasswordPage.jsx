import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";

import useFormHook from "../../hooks/useFormHook";
import { requestPassUserAPI } from "../../service/authAPI";
import { toast } from "react-toastify";
import useSpinner from "../../hooks/useSpinner";
import { Link } from "react-router-dom";

const ForgetPasswordPage = () => {
  const { formData, setFormData, handleOnChange, pwdErrors, setPwdErrors } =
    useFormHook({});
  const [showForm, setShowForm] = useState(false);
  const { spinner, setSpinner } = useSpinner(false);
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
    },
    {
      type: "password",
      name: "password",
      label: "New Password",
      required: true,
      placeholder: "********",
    },
    {
      type: "password",
      name: "cpassword",
      label: "Confirm Password",
      required: true,
      placeholder: "********",
    },
  ];
  const emptyEmail = [
    {
      email: "",
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
      setFormData(emptyEmail);
    }
    if (status === "error") {
      toast.error(message);
      setSpinner(false);
    }

    //  console.log(formData);
  };
  const handleOnResetSubmit = (e) => {
    e.preventDefault();
    setFormData(emptyEmail);
    //  console.log(formData);
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
          {!showForm ? (
            <>
              <Form onSubmit={handleOnSendEmailSubmit}>
                {formForgetPass.map((frm) => (
                  <FormTemplate
                    key={frm.name}
                    {...frm}
                    onChange={handleOnChange}
                  />
                ))}
                <div className="d-grid text-center">
                  {!spinner ? (
                    <Button type="submit" variant="success">
                      Send
                    </Button>
                  ) : (
                    <Spinner animation="border" variant="success" />
                  )}
                </div>
                <p className="pt-3">
                  Ready to Login <Link to="/login">Login</Link>
                </p>
              </Form>
            </>
          ) : (
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
                    <Button
                      type="submit"
                      variant="success"
                      disabled={pwdErrors.length}
                    >
                      Reset Now
                    </Button>
                  </div>
                  <p className="pt-3">
                    Forget Password?{" "}
                    <Link to="/forget-password">Try again</Link>
                  </p>
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

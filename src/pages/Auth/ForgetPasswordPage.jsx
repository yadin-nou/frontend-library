import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";
import { Link } from "react-router-dom";
import useFormHook from "../../hooks/useFormHook";

const ForgetPasswordPage = () => {
  const { formData, setFormData, handleOnChange, pwdErrors, setPwdErrors } =
    useFormHook({});
  const [showForm, setShowForm] = useState(false);
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
      type: "password",
      name: "currentPassword",
      label: "Current Password",
      placeholder: "***",
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
  const handleOnSendEmailSubmit = (e) => {
    e.preventDefault();
    setShowForm(true);
    console.log(formData);
  };
  const handleOnResetSubmit = (e) => {
    e.preventDefault();
    setFormData(emptyEmail);
    console.log(formData);
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
                <div className="d-grid">
                  <Button type="submit" variant="success">
                    Send
                  </Button>
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
                  <Alert>Please complete the requirement below:</Alert>
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

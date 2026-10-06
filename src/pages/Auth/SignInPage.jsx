import React, { useState } from "react";
import { Button, Container, Form, Placeholder } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const { formData, setFormData, handleOnChange } = useFormHook({});
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
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
            <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
          ))}

          <Button type="submit" variant="success">
            Login
          </Button>
        </Form>
        <p className="pt-3">
          Forget Password? <Link to="/forget-password">Reset Now</Link>
        </p>
      </Container>
    </div>
  );
};

export default SignInPage;

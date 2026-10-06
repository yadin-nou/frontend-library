import React from "react";
import { Button, Container, Form, Placeholder } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";

const SignInPage = () => {
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
        <Form>
          {formLogin.map((frm) => (
            <FormTemplate key={frm.name} {...frm} />
          ))}

          <Button type="submit" variant="success">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignInPage;

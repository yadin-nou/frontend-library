import React from "react";
import { Button, Container, Form, Placeholder } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";
import { Link } from "react-router-dom";
import useFormHook from "../../hooks/useFormHook";

const SignUpPage = () => {
  const { formData, setFormData, handleOnChange } = useFormHook({});
  const formSignup = [
    {
      type: "text",
      name: "fName",
      label: "First Name",
      required: true,
      placeholder: "First Name",
    },
    {
      type: "text",
      name: "lName",
      label: "Last Name",
      required: true,
      placeholder: "Last Name",
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      required: true,
      placeholder: "Eg: yourname@gmail.com",
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      required: true,
      placeholder: "0432xxxxxx",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
      placeholder: "*******",
    },
    {
      type: "password",
      name: "cpassword",
      label: "Comfirm Password",
      required: true,
      placeholder: "*******",
    },
  ];

  return (
    <>
      <Container className="pb-3">
        <Form>
          {formSignup.map((frm) => (
            <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
          ))}

          <Button variant="success">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

export default SignUpPage;

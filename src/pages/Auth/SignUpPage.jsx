import React from "react";
import { Button, Container, Form, Placeholder } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";
import { Link } from "react-router-dom";
import useFormHook from "../../hooks/useFormHook";
import { signupNewUserAPI } from "../../service/authAPI";
import { toast } from "react-toastify";

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const pendingResp = signupNewUserAPI(formData);

    toast.promise(pendingResp, { pending: "Please wait..." });
    const { status, message } = await pendingResp;
    if (status === "success") {
      toast.success(message);
    }
    if (status === "error") {
      toast.error(message);
    }
  };
  return (
    <>
      <Container className="pb-3">
        <Form onSubmit={handleOnSubmit}>
          {formSignup.map((frm) => (
            <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
          ))}

          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignUpPage;

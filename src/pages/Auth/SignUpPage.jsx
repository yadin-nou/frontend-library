import { Button, Container, Form, Placeholder, Spinner } from "react-bootstrap";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook";
import { signupNewUserAPI } from "../../service/authAPI";
import { toast } from "react-toastify";
import useSpinner from "../../hooks/useSpinner";
import { useState } from "react";

const SignUpPage = () => {
  const { formData, setFormData, handleOnChange, pwdErrors, setPwdErrors } =
    useFormHook({});
  const { spinner, setSpinner } = useSpinner(false);
  const errorForm = {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  };
  const [frmError, setFrmError] = useState(errorForm);
  const formSignup = [
    {
      type: "text",
      name: "fName",
      label: "First Name",
      required: true,
      placeholder: "First Name",
      value: formData.fName,
    },
    {
      type: "text",
      name: "lName",
      label: "Last Name",
      required: true,
      placeholder: "Last Name",
      value: formData.lName,
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      required: true,
      placeholder: "Eg: yourname@gmail.com",
      value: formData.email,
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      required: true,
      placeholder: "0432xxxxxx",
      value: formData.phone,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
      placeholder: "*******",
      value: formData.password,
    },
    {
      type: "password",
      name: "cpassword",
      label: "Comfirm Password",
      required: true,
      placeholder: "*******",
      value: formData.cpassword,
    },
  ];
  const emptyForm = {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { cpassword, password } = formData;
    if (password !== cpassword) {
      return toast.warning("Password is not match! Please type again!");
    }
    //clear when passwor match
    const pendingResp = signupNewUserAPI(formData);
    toast.promise(pendingResp, { pending: "Please wait..." });
    setSpinner(true);
    const result = await pendingResp;
    //console.log(result, " Result");
    if (result?.status === "success") {
      setFormData(emptyForm);
      toast.success(result?.message);
      setSpinner(false);
      setPwdErrors([]);
    }

    if (result?.status === "error") {
      if (result?.message.includes("fName")) {
        setFrmError({ ...frmError, fName: result.message, lName: "" });
      }
      if (result?.message.includes("lName")) {
        setFrmError(emptyForm);
        setFrmError({ ...frmError, lName: result.message, fName: "" });
      }

      toast.error(result?.message);
      setSpinner(false);
    }
  };

  return (
    <>
      <Container className="pb-3">
        <Form onSubmit={handleOnSubmit}>
          {formSignup.map((frm) => (
            <FormTemplate
              key={frm.name}
              {...frm}
              onChange={handleOnChange}
              error={frmError[frm.name]}
            />
          ))}

          <div className="text-danger">
            <ul>
              {pwdErrors.length > 0 &&
                pwdErrors.map((pwd) => <li key={pwd}>{pwd}</li>)}
            </ul>
          </div>

          {!spinner ? (
            <Button type="submit" variant="success" disabled={pwdErrors.length}>
              Submit
            </Button>
          ) : (
            <Spinner animation="border" variant="success" />
          )}
        </Form>
      </Container>
    </>
  );
};

export default SignUpPage;

import { useEffect } from "react";
import { useState } from "react";
import { formValidater } from "../utils/validatePassword.js";

const handleOnChange = ({ e, formData, setFormData }) => {
  const { name, value } = e.target;
  /* spread obj to userData*/
  //setUserData({ ...userData, [name]: value });
  /* Another way to spread object */
  setFormData((prev) => ({ ...prev, [name]: value }));
};
const useFormHook = (initial) => {
  const [formData, setFormData] = useState(initial);
  const [pwdErrors, setPwdErrors] = useState([]);

  //only when password and confirmPassword have changed
  useEffect(() => {
    const pwdErrorLists = formValidater(formData.password, formData.cpassword);
    setPwdErrors(pwdErrorLists);
  }, [formData.password, formData.cpassword]);
  return {
    formData,
    setFormData,
    pwdErrors,
    setPwdErrors,
    handleOnChange: (e) => handleOnChange({ e, formData, setFormData }),
  };
};

export default useFormHook;

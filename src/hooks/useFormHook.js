import { useState } from "react";

const handleOnChange = ({ e, formData, setFormData }) => {
  const { name, value } = e.target;
  /* spread obj to userData*/
  //setUserData({ ...userData, [name]: value });
  /* Another way to spread object */
  setFormData((prev) => ({ ...prev, [name]: value }));
};
const useFormHook = (initial) => {
  const [formData, setFormData] = useState(initial);
  return {
    formData,
    setFormData,
    handleOnChange: (e) => handleOnChange({ e, formData, setFormData }),
  };
};

export default useFormHook;

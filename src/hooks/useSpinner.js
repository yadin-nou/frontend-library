import { useState } from "react";

const useSpinner = (initial) => {
  const [spinner, setSpinner] = useState(initial);
  return {
    spinner,
    setSpinner,
  };
};

export default useSpinner;

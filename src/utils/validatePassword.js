//validate by using Regex VS Code extensions
// Please intall VS code Extensions
//- At least 6 charactoers required.
// - 1 UPPERCASE
// - 1 lovercase
// -1 digit
// - special character !@#$%^&*()<>?{}|

export const formValidater = (password = "", confirmPassword = "") => {
  const errors = [];
  password.length < 6 && errors.push("At least 6 charactoers required.");
  //Regex VS Code
  !/[A-Z]/.test(password) &&
    errors.push("Password must contain at least one UPPERCASE Letter.");
  !/[a-z]/.test(password) &&
    errors.push("Password must contain at least one LOWERCASE Letter.");
  !/[0-9]/.test(password) &&
    errors.push("Password must contain at least one number.");
  !/[!@#$%^&*()<>?{}|]/.test(password) &&
    errors.push("Password must contain at least one symble charactor.");
  // this only accur when confirmPassword change
  confirmPassword.length > 0 &&
    password !== confirmPassword &&
    errors.push("Password is not match.");

  return errors;
};

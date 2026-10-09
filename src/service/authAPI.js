// For API call related to signup, login and token

import processAPI from "../axiosHelp/axiosConnected";
const authRoute = "/api/v1/auth";
const urlRoute = import.meta.env.VITE_SERVER_URL + authRoute;

export const signupNewUserAPI = async (data) => {
  data.cpassword = undefined; // make cpassword to empty
  data.phone = +data.phone; //convert phone to number
  const user = {
    method: "post",
    url: urlRoute + "/register",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const result = await processAPI(user);
  return result;
};

export const loginUserAPI = async (data) => {
  const user = {
    method: "post",
    url: urlRoute + "/login",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const result = await processAPI(user);
  return result;
};

export const getNewAccessJWTAPI = async (authorization) => {
  const user = {
    method: "get",
    url: urlRoute + "/renew-jwt",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  };
  const result = await processAPI(user);
  return result;
};

export const activateUserAPI = async (data) => {
  const user = {
    method: "post",
    url: urlRoute + "/activate-user",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const result = await processAPI(user);
  return result;
};

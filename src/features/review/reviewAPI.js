import processAPI from "../../axiosHelp/axiosConnected.js";
import { getSessionStorage } from "../../localStorage/storage.js";

const reviewRouteLink = "/api/v1/reviews";
const urlReview = import.meta.env.VITE_SERVER_URL + reviewRouteLink;

export const insertReviewAPI = async (data) => {
  //console.log(data);
  const obj = {
    method: "post",
    url: urlReview + "/",
    data,
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(obj);
  return result;
};

export const getAllReviewAPI = async (data, isAdmin) => {
  //console.log(data);
  const path = isAdmin ? "admin" : "";
  console.log(path, " path");
  const obj = {
    method: "get",
    url: urlReview + "/" + path,
    data,
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(obj);
  return result;
};

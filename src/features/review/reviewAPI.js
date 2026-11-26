import processAPI from "../../axiosHelp/axiosConnected.js";
import { authHeaders } from "../authHeader/authHeader.js";

const reviewRouteLink = "/api/v1/reviews";
const urlReview =
  import.meta.env.VITE_SERVER_URL ||
  "https://dxarrq58gv8t9.cloudfront.net" + reviewRouteLink;

export const insertReviewAPI = async (data) => {
  //console.log(data);
  const obj = {
    method: "post",
    url: urlReview + "/",
    data,
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(obj);
  return result;
};

export const getAllReviewAPI = async (isAdmin) => {
  //console.log(data);
  const path = isAdmin ? "admin" : "";
  //console.log(path, " path");
  const obj = {
    method: "get",
    url: urlReview + "/" + path,
    data: {},
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(obj);

  return result;
};

export const deleteReviewAPI = async (data) => {
  const obj = {
    method: "delete",
    url: urlReview + "/admin",
    data,
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(obj);
  return result;
};
export const updateApprovedReviewAPI = async (data) => {
  // console.log(data);
  const obj = {
    method: "patch",
    url: urlReview + "/admin",
    data,
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(obj);

  return result;
};

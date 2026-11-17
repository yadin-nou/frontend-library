import processAPI from "../../axiosHelp/axiosConnected.js";
import { authHeaders } from "../authHeader/authHeader.js";

const borrowRouteLink = "/api/v1/borrows";
const urlBorrow = import.meta.env.VITE_SERVER_URL + borrowRouteLink;

export const getAllBorrowsApi = async (role) => {
  const obj = {
    method: "get",
    url: urlBorrow + "/" + role,
    data: {},
    headers: authHeaders(),
  };
  const result = await processAPI(obj);
  return result;
};

export const returnBookAPI = async (data) => {
  const obj = {
    method: "patch",
    url: urlBorrow + "/",
    data,
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(obj);
  return result;
};

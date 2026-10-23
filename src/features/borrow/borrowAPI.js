import processAPI from "../../axiosHelp/axiosConnected.js";
import { getSessionStorage } from "../../localStorage/storage.js";

const borrowRouteLink = "/api/v1/borrows";
const urlBorrow = import.meta.env.VITE_SERVER_URL + borrowRouteLink;

export const getAllBorrowsApi = async (role) => {
  const obj = {
    method: "get",
    url: urlBorrow + "/" + role,
    data: {},
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(obj);
  return result;
};

export const returnBookAPI = async (data) => {
  const obj = {
    method: "patch",
    url: urlBorrow + "/",
    data,
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(obj);
  return result;
};

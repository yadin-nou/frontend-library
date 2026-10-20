import processAPI from "../../axiosHelp/axiosConnected.js";
import { getSessionStorage } from "../../localStorage/storage.js";

const borrowRouteLink = "/api/v1/borrows";
const urlBorrow = import.meta.env.VITE_SERVER_URL + borrowRouteLink;

export const getAllBorrowsApi = async () => {
  const user = {
    method: "get",
    url: urlBorrow + "/admin",
    data: {},
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(user);
  return result;
};

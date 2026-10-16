import processAPI from "../../axiosHelp/axiosConnected.js";
import { getSessionStorage } from "../../localStorage/storage.js";

const borrowRoute = "/api/v1/borrows";
const urlServer = import.meta.env.VITE_SERVER_URL + borrowRoute;

//borrow API
export const addBorrowBookAPI = async (data) => {
  //console.log(data, "API");
  const book = {
    method: "post",
    url: urlServer + "/borrows",
    data,
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(book);
  return result;
};

import processAPI from "../../axiosHelp/axiosConnected.js";
import { authHeaders } from "../authHeader/authHeader.js";

const borrowRoute = "/api/v1/borrows";
const urlServer =
  import.meta.env.VITE_SERVER_URL ||
  "https://dxarrq58gv8t9.cloudfront.net" + borrowRoute;

//borrow API
export const addBorrowBookAPI = async (data) => {
  //console.log(data, "API");
  const book = {
    method: "post",
    url: urlServer + "/borrows",
    data,
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(book);
  return result;
};

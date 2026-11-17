import processAPI from "../../axiosHelp/axiosConnected.js";
import { authHeaders } from "../authHeader/authHeader.js";

const userRouteLink = "/api/v1/users";
const urlUser = import.meta.env.VITE_SERVER_URL + userRouteLink;
//const accessJWT = getSessionStorage("accessJWT");

export const getUserApi = async () => {
  const user = {
    method: "get",
    url: urlUser + "/profile",
    data: {},
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(user);
  return result;
};

export const getAllUserApi = async () => {
  const user = {
    method: "get",
    url: urlUser + "/all",
    data: {},
    headers: authHeaders({ "Content-Type": "application/json" }),
  };
  const result = await processAPI(user);
  return result;
};

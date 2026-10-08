import processAPI from "../../axiosHelp/axiosConnected.js";
import { getSessionStorage } from "../../localStorage/storage.js";

const userRouteLink = "/api/v1/users";
const urlUser = import.meta.env.VITE_SERVER_URL + userRouteLink;

export const getUserApi = async () => {
  const user = {
    method: "get",
    url: urlUser + "/profile",
    data: {},
    headers: {
      "Content-Type": "application/json",
      authorization: getSessionStorage("accessJWT"),
    },
  };
  const result = await processAPI(user);
  return result;
};

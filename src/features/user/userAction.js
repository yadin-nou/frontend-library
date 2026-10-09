import {
  getLocalStorage,
  getSessionStorage,
} from "../../localStorage/storage.js";
import { getUserApi } from "./userAPI.js";
import { setUser } from "./userSlice.js";

export const getUserAction = () => async (dis) => {
  const user = await getUserApi();
  // console.log(user.payload);
  user?.status === "success" && dis(setUser(user.payload));
  return user;
};

export const autoLoginUser = () => async (dis) => {
  const accessJWT = getSessionStorage("accessJWT");
  if (accessJWT) {
    dis(getUserAction());
    return;
  }
  const refreshJWT = getLocalStorage("refreshJWT");
  if (refreshJWT) {
  }
};

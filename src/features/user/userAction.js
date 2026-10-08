import { getUserApi } from "./userAPI.js";
import { setUser } from "./userSlice.js";

export const getUserAction = () => async (dis) => {
  const user = await getUserApi();
  user?._id && dis(setUser(user));
  return user;
};

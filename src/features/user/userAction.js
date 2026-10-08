import { getUserApi } from "./userAPI.js";
import { setUser } from "./userSlice.js";

export const getUserAction = () => async (dis) => {
  const user = await getUserApi();
  // console.log(user.payload);
  user?.status === "success" && dis(setUser(user.payload));
  return user;
};

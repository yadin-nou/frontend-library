import {
  getLocalStorage,
  getSessionStorage,
  setSessionStorage,
} from "../../localStorage/storage.js";
import { getNewAccessJWTAPI } from "../../service/authAPI.js";
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
    // console.log("accessJWT", accessJWT);
    dis(getUserAction());
    return;
  }
  // accessJWT not exist, but not expired : that mean user open new tab or direct url
  const refreshJWT = getLocalStorage("refreshJWT");
  if (refreshJWT) {
    //get accessJWT from browser and set in the sessionStorage
    const { payload } = await getNewAccessJWTAPI(refreshJWT);
    // console.log(payload);
    if (payload) {
      //when accessJWT avairable on browser ,dispatch will call getUserAction again to update redux store
      setSessionStorage(payload);
      dis(getUserAction());
    }
  }
};

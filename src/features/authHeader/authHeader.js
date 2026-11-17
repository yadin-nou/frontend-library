import { getSessionStorage } from "../../localStorage/storage";

// called on every request, so it always gets the current token
export const authHeaders = (arg = {}) => ({
  authorization: getSessionStorage("accessJWT"),
  ...arg,
});

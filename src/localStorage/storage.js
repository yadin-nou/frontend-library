export const setLocalStorage = (refreshJWT) => {
  localStorage.setItem("refreshJWT", refreshJWT);
};
export const setSessionStorage = (accessJWT) => {
  sessionStorage.setItem("accessJWT", accessJWT);
};

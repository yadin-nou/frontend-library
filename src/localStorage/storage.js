export const setLocalStorage = (refreshJWT) => {
  localStorage.setItem("refreshJWT", refreshJWT);
};

export const getLocalStorage = (refreshJWT) => {
  return sessionStorage.getItem(refreshJWT);
};

export const setSessionStorage = (accessJWT) => {
  sessionStorage.setItem("accessJWT", accessJWT);
};

export const getSessionStorage = (accessJWT) => {
  return sessionStorage.getItem(accessJWT);
};

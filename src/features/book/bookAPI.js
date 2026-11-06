import processAPI from "../../axiosHelp/axiosConnected.js";
import { getSessionStorage } from "../../localStorage/storage.js";

// const adminRoute = "/api/v1/admin";
const bookRoute = "/api/v1/book";
const urlBook = import.meta.env.VITE_SERVER_URL + bookRoute;

const accessJWT = getSessionStorage("accessJWT");
//adming API
export const addBook = async (data) => {
  const book = {
    method: "post",
    url: urlBook + "/addbook",
    data,
    headers: {
      // "Content-Type": "application/json",
      authorization: accessJWT,
    },
  };
  console.log(accessJWT, "fron");
  const result = await processAPI(book);
  return result;
};

export const getAllBooks = async (filter = {}) => {
  //console.log(data.importBook, " axios");
  const book = {
    method: "get",
    url: urlBook + "/book",
    headers: {
      "Content-Type": "application/json",
      authorization: accessJWT,
    },
    params: filter,
  };
  return processAPI(book);
};
export const deleteBook = async (data) => {
  const book = {
    method: "delete",
    url: urlBook + "/",
    data,
    headers: {
      "Content-Type": "application/json",
      authorization: accessJWT,
    },
  };
  const result = await processAPI(book);
  return result;
};
export const updateBook = async (data) => {
  //console.log(data);
  const book = {
    method: "patch",
    url: urlBook + "/",
    data,
    headers: {
      //"Content-Type": "application/json",
      authorization: accessJWT,
    },
  };
  const result = await processAPI(book);
  return result;
};

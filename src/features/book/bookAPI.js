import processAPI from "../../axiosHelp/axiosConnected.js";

const adminRoute = "/api/v1/admin";
const urlAdmin = import.meta.env.VITE_SERVER_URL + adminRoute;

//adming API
export const addBook = async (data) => {
  //console.log(data.importBook, " axios");
  const book = {
    method: "post",
    url: urlAdmin + "/addbook",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const result = await processAPI(book);
  return result;
};

export const getAllBooks = async (filter = {}) => {
  //console.log(data.importBook, " axios");
  const book = {
    method: "get",
    url: urlAdmin + "/book",
    params: filter,
  };
  return processAPI(book);
};
export const deleteBook = async (data) => {
  const book = {
    method: "delete",
    url: urlAdmin + "/",
    data,
  };
  const result = await processAPI(book);
  return result;
};
export const updateBook = async (data) => {
  console.log(data);
  const book = {
    method: "patch",
    url: urlAdmin + "/",
    data,
  };
  const result = await processAPI(book);
  return result;
};

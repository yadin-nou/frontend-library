import processAPI from "../../axiosHelp/axiosConnected.js";

// const adminRoute = "/api/v1/admin";
const bookRoute = "/api/v1/book";
const urlBook = import.meta.env.VITE_SERVER_URL + bookRoute;

//adming API
export const addBook = async (data) => {
  //console.log(data, "API");
  const book = {
    method: "post",
    url: urlBook + "/addbook",
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
    url: urlBook + "/book",
    params: filter,
  };
  return processAPI(book);
};
export const deleteBook = async (data) => {
  const book = {
    method: "delete",
    url: urlBook + "/",
    data,
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
  };
  const result = await processAPI(book);
  return result;
};

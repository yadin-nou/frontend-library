import axios from "axios";
const adminRoute = "/api/v1/admin";
const userRoute = "/api/v1/users";
const urlUser = import.meta.env.VITE_SERVER_URL + userRoute;
const urlAdmin = import.meta.env.VITE_SERVER_URL + adminRoute;

const processAPI = async ({ method, url, data, headers, params }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    // return {
    // status: "error",
    //check in the error respone, if error has response,
    //response has data ,data has error, otherwise error.message
    // message: error?.response?.data?.error || error.message,
    // };
  }
};

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
  return processAPI(book);
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
  return processAPI(book);
};
export const updateBook = async (data) => {
  console.log(data);
  const book = {
    method: "patch",
    url: urlAdmin + "/",
    data,
  };
  return processAPI(book);
};

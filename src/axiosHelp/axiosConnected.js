import axios from "axios";
const adminRoute = "/api/v1/admin";
const userRoute = "/api/v1/users";
const urlUser = import.meta.env.VITE_ROOT_URL + userRoute;
const urlAdmin = import.meta.env.VITE_ROOT_URL + adminRoute;

const processAPI = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
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
  //  console.log(data, " axios");
  const book = {
    method: "post",
    url: urlAdmin + "/addbook",
    data,
  };
  return processAPI(book);
};

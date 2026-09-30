import { addBook, deleteBook, getAllBooks, updateBook } from "./bookAPI";
import { setBookCollection } from "./bookSlice";

export const addBookAction = async (data) => {
  const book = await addBook(data);
  return book;
};
export const getAllBooksAction =
  (filter = {}) =>
  async (dispatch) => {
    const result = await getAllBooks(filter);
    result?.status === "success" && dispatch(setBookCollection(result?.book));
  };

export const deleteBookAction = async (data) => {
  const result = await deleteBook(data);
  return result;
};
export const updateBookAction = async (data) => {
  const result = await updateBook(data);
  return result;
};

import { addBook, deleteBook, getAllBooks, updateBook } from "./bookAPI";

export const addBookAction = async (data) => {
  const book = await addBook(data);
  return book;
};
export const getAllBooksAction = async (filter = {}) => {
  const book = await getAllBooks(filter);
  return book;
};

export const deleteBookAction = async (data) => {
  const result = await deleteBook(data);
  return result;
};
export const updateBookAction = async (data) => {
  const result = await updateBook(data);
  return result;
};

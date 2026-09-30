import React from "react";
import { useEffect, useState } from "react";
// import { getAllBooks } from "../../axiosHelp/axiosConnected.js";
import { DisplayBook, SearchBookBlobal } from "../index.js";
import { getAllBooksAction } from "../../features/book/bookAction.js";

const HomePage = () => {
  const [bookCollection, setBookCollection] = useState([]);
  //const stars = [1, 2, 3, 4, 5];
  const handelGetAllBook = async () => {
    const getBook = await getAllBooksAction();
    if (getBook?.status === "success") {
      //console.log(getBook.book);
      //If getBook.book is an array of book objects
      setBookCollection(getBook.book);
    }
  };

  useEffect(() => {
    handelGetAllBook();
  }, []);

  return (
    <>
      <SearchBookBlobal />
      <DisplayBook bookCollection={bookCollection} />
    </>
  );
};

export default HomePage;

import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import BookTable from "./BookTable";
import { PlusLg, Search } from "react-bootstrap-icons";
import AddBook from "./AddBook";
import ImportBook from "./ImportBook";
import { getAllBooks } from "../../axiosHelp/axiosConnected";
import { useEffect } from "react";
import { toast } from "react-toastify";

const BookLandingPage = () => {
  // const bookCollection = [
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d1",
  //     title: "The Hobbit",
  //     author: "J.R.R. Tolkien",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
  //     isbn: "9780547928227",
  //     genre: "Fantasy",
  //     availability: true,
  //     averageRating: 4.7,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d2",
  //     title: "1984",
  //     author: "George Orwell",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  //     isbn: "9780451524935",
  //     genre: "Dystopian",
  //     availability: false,
  //     averageRating: 4.6,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d3",
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
  //     isbn: "9780061120084",
  //     genre: "Classic",
  //     availability: true,
  //     averageRating: 4.8,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d4",
  //     title: "Dune",
  //     author: "Frank Herbert",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
  //     isbn: "9780441172719",
  //     genre: "Science Fiction",
  //     availability: true,
  //     averageRating: 4.5,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d5",
  //     title: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  //     isbn: "9780743273565",
  //     genre: "Classic",
  //     availability: false,
  //     averageRating: 4.2,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d6",
  //     title: "Harry Potter and the Sorcerer's Stone",
  //     author: "J.K. Rowling",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
  //     isbn: "9780590353427",
  //     genre: "Fantasy",
  //     availability: true,
  //     averageRating: 4.9,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d7",
  //     title: "The Da Vinci Code",
  //     author: "Dan Brown",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
  //     isbn: "9780307474278",
  //     genre: "Thriller",
  //     availability: true,
  //     averageRating: 3.9,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d8",
  //     title: "Sapiens: A Brief History of Humankind",
  //     author: "Yuval Noah Harari",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  //     isbn: "9780062316097",
  //     genre: "Non-Fiction",
  //     availability: true,
  //     averageRating: 4.6,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0d9",
  //     title: "The Alchemist",
  //     author: "Paulo Coelho",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
  //     isbn: "9780062315007",
  //     genre: "Fiction",
  //     availability: false,
  //     averageRating: 4.4,
  //   },
  //   {
  //     _id: "64f1a2b3c4d5e6f7a8b9c0da",
  //     title: "Atomic Habits",
  //     author: "James Clear",
  //     imgURL: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  //     isbn: "9780735211292",
  //     genre: "Self-Help",
  //     availability: true,
  //     averageRating: 4.8,
  //   },
  // ];
  const [bookCollection, setBookCollection] = useState([]);
  const [searchBook, setSearchBook] = useState([]);
  const BookSearchList = (search) => {
    const filteredBooks = bookCollection.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setSearchBook(filteredBooks);
  };
  const BookSelected = (search) => {
    const filteredBooks = bookCollection.filter((book) => {
      if (search != "All genres") {
        return book.genre.toLowerCase().includes(search.toLowerCase());
      } else {
        return book;
      }
    });
    setSearchBook(filteredBooks);
  };
  const handelGetAllBook = async () => {
    const getBook = await getAllBooks();
    if (getBook?.status === "success") {
      //console.log(getBook.book);
      //If getBook.book is an array of book objects
      setBookCollection(getBook.book);
    }
  };
  const handleDeleteBook = async (book_id) => {
    const conf = window.confirm("Are you sure want to delete this book?");

    if (conf) {
      const { status, message } = await deleteBook(book_id);
      if (status === "success") {
        toast.success("Deleted book successfully!!");
        handelGetAllBook();
      } else {
        toast.error("Failed to delete book.!");
      }
    }
  };
  useEffect(() => {
    handelGetAllBook();
  }, []);
  useEffect(() => {
    setSearchBook(bookCollection);
  }, [bookCollection]);
  // console.log(bookCollection);
  return (
    <div>
      <Row className="align-items-center g-2 flex-wrap pt-2 wi">
        <Col className="ps-md-5">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Search onChange={(e) => BookSearchList(e.target.value)} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => BookSearchList(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Form.Select onChange={(e) => BookSelected(e.target.value)}>
            <option value="All genres">All genres</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Classic">Classic</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Thriller">Thriller</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <ImportBook handelGetAllBook={handelGetAllBook} />
        </Col>
        <Col xs="auto">
          {/* <Button variant="success" onClick={handleAddBook}>
            <PlusLg className="me-2" />
            Add book
          </Button> */}
          <AddBook handelGetAllBook={handelGetAllBook} />
        </Col>
      </Row>
      <Row className="align-items-center g-2 flex-wrap pt-2">
        <Col xs="12" className="ps-md-5">
          <div>
            <BookTable
              searchBook={searchBook}
              bookCollection={bookCollection}
              handleDeleteBook={handleDeleteBook}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookLandingPage;

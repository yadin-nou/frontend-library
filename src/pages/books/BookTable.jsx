import React from "react";
import { Badge, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";

const BookTable = () => {
  const bookCollection = [
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d1",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
      isbn: "9780547928227",
      genre: "Fantasy",
      availability: true,
      averageRating: 4.7,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d2",
      title: "1984",
      author: "George Orwell",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
      isbn: "9780451524935",
      genre: "Dystopian",
      availability: false,
      averageRating: 4.6,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d3",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
      isbn: "9780061120084",
      genre: "Classic",
      availability: true,
      averageRating: 4.8,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d4",
      title: "Dune",
      author: "Frank Herbert",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
      isbn: "9780441172719",
      genre: "Science Fiction",
      availability: true,
      averageRating: 4.5,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d5",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
      isbn: "9780743273565",
      genre: "Classic",
      availability: false,
      averageRating: 4.2,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d6",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
      isbn: "9780590353427",
      genre: "Fantasy",
      availability: true,
      averageRating: 4.9,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d7",
      title: "The Da Vinci Code",
      author: "Dan Brown",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
      isbn: "9780307474278",
      genre: "Thriller",
      availability: true,
      averageRating: 3.9,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d8",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
      isbn: "9780062316097",
      genre: "Non-Fiction",
      availability: true,
      averageRating: 4.6,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0d9",
      title: "The Alchemist",
      author: "Paulo Coelho",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
      isbn: "9780062315007",
      genre: "Fiction",
      availability: false,
      averageRating: 4.4,
    },
    {
      _id: "64f1a2b3c4d5e6f7a8b9c0da",
      title: "Atomic Habits",
      author: "James Clear",
      imgURL: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
      isbn: "9780735211292",
      genre: "Self-Help",
      availability: true,
      averageRating: 4.8,
    },
  ];
  return (
    <div className="border rounded-3 overflow-hidden">
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle fs-5 text-center"
      >
        <thead className="bg-light">
          <tr>
            <th className="d-none d-md-table-cell">#</th>
            <th>Title</th>
            <th className="d-none d-md-table-cell">Author</th>
            <th className="d-none d-lg-table-cell">Img</th>
            <th className="d-none d-md-table-cell">Genre</th>
            <th>Status</th>
            <th className="d-none d-md-table-cell">Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookCollection.map((book, key) => (
            <tr key={book._id}>
              <td className="d-none d-md-table-cell">{key + 1}</td>
              <td className="text-secondary">{book.title}</td>
              <td className="d-none d-md-table-cell text-secondary">
                {book.author}
              </td>
              <td className="d-none d-lg-table-cell text-secondary">
                <img src={book.imgURL} width={50} height={55} />
              </td>
              <td className="d-none d-md-table-cell text-secondary">
                {book.genre}
              </td>
              <td>
                <Badge bg={book.availability ? "success" : "danger"} pill>
                  {book.availability ? "Available" : "Borrowed"}
                </Badge>
              </td>
              <td className="d-none d-md-table-cell text-secondary">
                {book.averageRating}
              </td>
              <td>
                <PencilFill className="me-3 text-secondary" role="button" />
                <TrashFill className="text-danger" role="button" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;

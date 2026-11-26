import React, { useState } from "react";
import { Badge, Pagination, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import AddBook from "./AddBook";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePagination from "../../hooks/usePagination";

const BookTable = ({
  searchBook,
  bookCollection,
  handleDeleteBook,
  handelGetAllBook,
}) => {
  const {
    currentData,
    currentPage,
    numberPerPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
    handlePagination,
  } = usePagination(searchBook, 6);
  //const [numPage, setNumPage] = useState(numberPerPage);
  const navi = useNavigate();
  const imgPath =
    import.meta.env.VITE_SERVER_URL || "https://dxarrq58gv8t9.cloudfront.net";
  const handleBookLandingPage = (bookId) => {
    const linkDetaail = "/books/details/" + bookId;
    navi(linkDetaail, { state: { from: "/user/books" } });
    //<Navigate to={linkDetaail} state={{ from: "/user/books" }} replace />;
  };

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
            <th>Author</th>
            <th>Img</th>
            <th className="d-none d-lg-table-cell">ISBN</th>
            <th className="d-none d-md-table-cell">Genre</th>
            <th>Status</th>
            <th className="d-none d-md-table-cell">Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((book, key) => (
            <tr key={book._id}>
              <td className="d-none d-md-table-cell">
                {" "}
                {indexOfFirstData + key + 1}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleBookLandingPage(book._id)}
              >
                {book.title}
              </td>
              <td
                className=" cursor-pointer"
                onClick={() => handleBookLandingPage(book._id)}
              >
                {book.author}
              </td>
              <td onClick={() => handleBookLandingPage(book._id)}>
                <img
                  src={imgPath + "/images/" + book.imgURL.split("/")[2]}
                  width={50}
                  height={55}
                />
              </td>
              <td className="d-none d-lg-table-cell text-secondary cursor-pointer">
                {book.isbn}
              </td>
              <td className="d-none d-md-table-cell text-secondary cursor-pointer">
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
                <AddBook
                  bookEdit={true}
                  id={book._id}
                  handelGetAllBook={handelGetAllBook}
                />
                <TrashFill
                  className="text-danger"
                  role="button"
                  onClick={() => handleDeleteBook(book._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-secondary">
          Showing{" "}
          {totalPages === currentPage
            ? currentData.length + indexOfFirstData
            : indexOfLastData}{" "}
          of {bookCollection.length} books
        </small>
        <div className="d-flex justify-content-between align-items-center mt-3 p-2">
          {/* <small className="text-secondary">
            Showing {currentData.length} of {searchBook.length} books
          </small> */}

          <Pagination size="sm" className="mb-0">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePagination(currentPage - 1)}
            />

            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePagination(currentPage + 1)}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default BookTable;

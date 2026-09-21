import React, { useState } from "react";
import { Badge, Pagination, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";

const BookTable = ({ searchBook, bookCollection }) => {
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
            <th className="d-none d-lg-table-cell">ISBN</th>
            <th className="d-none d-md-table-cell">Genre</th>
            <th>Status</th>
            <th className="d-none d-md-table-cell">Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchBook.map((book, key) => (
            <tr key={book._id}>
              <td className="d-none d-md-table-cell">{key + 1}</td>
              <td className="text-secondary">{book.title}</td>
              <td className="d-none d-md-table-cell text-secondary">
                {book.author}
              </td>
              <td className="d-none d-lg-table-cell text-secondary">
                <img src={book.imgURL} width={50} height={55} />
              </td>
              <td className="d-none d-lg-table-cell text-secondary">
                {book.isbn}
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
      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-secondary">
          Showing {searchBook.length} of {bookCollection.length} books
        </small>
        <Pagination size="sm" className="mb-0">
          <Pagination.Prev />
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  );
};

export default BookTable;

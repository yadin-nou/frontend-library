import React, { useEffect } from "react";
import { Badge, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartPage = () => {
  const carts = useSelector((state) => state.bookInfo.cart);

  useEffect(() => {});
  return (
    <>
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
              <th>Book Title</th>
              <th>Book Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((book, key) => (
              <tr key={book._id}>
                <td className="d-none d-md-table-cell">{key + 1}</td>

                <td className="d-none d-lg-table-cell text-secondary">
                  <img src={book.imgURL} width={50} height={55} />
                </td>
                <td className="text-secondary">{book.title}</td>

                <td className="d-none d-md-table-cell text-secondary">
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CartPage;

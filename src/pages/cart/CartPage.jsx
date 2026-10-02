import React, { useEffect } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart, setCart } from "../../features/book/bookSlice";
import { TrashFill } from "react-bootstrap-icons";

const CartPage = () => {
  const carts = useSelector((state) => state.bookInfo.cart);
  let rmCart = [];
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    const confirm = window.confirm("Are you sure want to Delete?");
    confirm && dispatch(removeCart(id));
  };
  return (
    <>
      <Container>
        <div className="overflow-hidden p-2">
          <div>
            <h3>My borrow list {carts.length} (s)</h3>
          </div>
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
                <th>Book Image</th>
                <th>Book Title</th>
                <th>Return Date</th>
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
                  <td className="text-secondary">15-5-2026</td>
                  <td className="d-none d-md-table-cell text-secondary">
                    <TrashFill
                      className="text-danger"
                      role="button"
                      onClick={() => handleRemove(book._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {carts.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={5} className="text-danger">
                    <h4>Cart Is Empty</h4>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
      </Container>
    </>
  );
};

export default CartPage;

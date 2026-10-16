import React, { useEffect } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart, removeCart, setCart } from "../../features/cart/cartSlice";
import { TrashFill } from "react-bootstrap-icons";
import { addBorrowBookAPI } from "../../features/cart/cartAPI";
import { toast } from "react-toastify";

const CartPage = () => {
  const carts = useSelector((state) => state.cartInfo.cart);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const handleRemove = (id) => {
    const confirm = window.confirm("Are you sure want to Delete?");
    confirm && dispatch(removeCart(id));
  };

  const handleOnSubmit = async () => {
    const conf = confirm("Are you sure you wantto borrow the books?");
    if (conf) {
      const bookArg = carts.map(({ _id, title, imgURL }) => {
        return { bookId: _id, bookTitle: title, thumbnail: imgURL };
      });
      const pendingResp = addBorrowBookAPI(bookArg);
      toast.promise(pendingResp, { pending: "Please wait..." });
      const result = await pendingResp;
      if (result) {
        dispatch(emptyCart({}));
        toast.success("Your book borrowed successfully!");
        navi("/thanks");
      }
    }
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

              {carts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-danger">
                    <h4>Cart Is Empty</h4>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={3}></td>
                  <td colSpan={2}>
                    {/* add state to show that when go login and comeback to cart*/}
                    {user?._id ? (
                      <Button variant="success" onClick={handleOnSubmit}>
                        Proceed to Borrow{" "}
                      </Button>
                    ) : (
                      <Link to="/login" state={{ from: "/carts" }}>
                        <Button variant="success">Proceed to Borrow </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default CartPage;

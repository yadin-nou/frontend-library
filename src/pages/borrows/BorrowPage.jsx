import React from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllBorrowsAction } from "../../features/borrow/borrowAction";
import { FaBimobject } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function BorrowPage() {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/").at(-1);
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  const borrows =
    user.role === "admin" && path === "allborrows" ? allBorrows : myBorrows;
  const role =
    user.role === "admin" && path === "allborrows" ? "admin" : "user";
  useEffect(() => {
    dispatch(getAllBorrowsAction(role));
  }, [dispatch, role]);

  return (
    <div>
      <h3>All Borrows</h3>
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle fs-5 text-center table-spaced"
        style={{ minWidth: "800px" }}
      >
        <thead className="bg-light">
          <tr>
            <th className="d-none d-md-table-cell">#</th>
            <th>Thumbnail</th>
            <th>Due</th>
            <th>Returned Date</th>
            <th className="d-none d-md-table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((book, k) => (
            <tr key={k + 1}>
              <td className="d-none d-md-table-cell">{k + 1}</td>
              <td>
                <img
                  src={book.thumbnail}
                  alt={book.bookTitle}
                  style={{ width: 50 }}
                />
              </td>
              <td className="text-secondary">
                {new Date(book.dueDate).toLocaleDateString("en-AU")}
              </td>
              <td>
                {book.returnedDate
                  ? new Date(book.returnedDate).toLocaleDateString("en-AU")
                  : "-"}
              </td>

              <td className="d-none d-md-table-cell"></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BorrowPage;

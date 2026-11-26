import React from "react";
import { useEffect } from "react";
import { Alert, Badge, Button, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBorrowsAction,
  returnBookAction,
} from "../../features/borrow/borrowAction";
import { FaBimobject } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddReview from "../reviews/AddReview";
import usePagination from "../../hooks/usePagination";
//import noImg from "../../../public/images/no_image.jpg";

function BorrowPage() {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const imgPath =
    import.meta.env.VITE_SERVER_URL || "https://dxarrq58gv8t9.cloudfront.net";
  const path = location.pathname.split("/").at(-1);
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  const borrows =
    user?.role === "admin" && path === "allborrows" ? allBorrows : myBorrows;
  const role =
    user?.role === "admin" && path === "allborrows" ? "admin" : "user";
  const isAdmin = role === "admin";

  const { currentData, currentPage, totalPages, handlePagination } =
    usePagination(borrows, 6);

  useEffect(() => {
    dispatch(getAllBorrowsAction(role));
    // console.log(allBorrows, " all Borrow ");
    //console.log(borrows, " borrows");
  }, [dispatch, role]);

  const navi = useNavigate();

  const handleBookLandingPage = (bookId) => {
    const linkDetaail = "/books/details/" + bookId;
    navi(linkDetaail, { state: { from: location.pathname } });
    //<Navigate to={linkDetaail} state={{ from: "/user/books" }} replace />;
  };

  const handleReturnBook = async (borrowId) => {
    const conf = confirm("Are you sure you want to Return Book?");
    if (conf) {
      dispatch(returnBookAction({ _id: borrowId }, role));
    }
  };

  return (
    <div>
      <h3>{isAdmin ? "All Borrows" : "My Borrows"}</h3>
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
            {isAdmin && <th>Users</th>}
            <th>Book Title</th>
            {isAdmin && <th>Status</th>}

            <th>Due</th>
            <th>Returned Date</th>
            {!isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentData?.length > 0 ? (
            currentData.map((book, k) => (
              <tr key={k + 1}>
                <td className="d-none d-md-table-cell">{k + 1}</td>
                <td>
                  <img
                    src={
                      imgPath + "/images/" + book.bookId?.imgURL.split("/")[2]
                    }
                    alt={book.bookId ? book.bookId.title : "N/A"}
                    style={{ width: 50 }}
                  />
                </td>
                {isAdmin && (
                  <td>
                    {book.userId.fName} {book.userId.lName}
                  </td>
                )}
                <td
                  onClick={() => handleBookLandingPage(book.bookId?._id)}
                  style={{ cursor: "pointer" }}
                >
                  {book.bookId ? book.bookId?.title : "N/A"}
                </td>
                {isAdmin && (
                  <td>
                    <Badge bg={book.isReturned ? "success" : "danger"} pill>
                      {book.isReturned ? "Returned" : "Borrowed"}
                    </Badge>
                  </td>
                )}
                <td className="text-secondary">
                  {new Date(book.dueDate).toLocaleDateString("en-AU")}
                </td>
                <td>
                  {book.isReturned
                    ? new Date(book.returnedDate).toLocaleDateString("en-AU")
                    : "No"}
                </td>
                {!isAdmin && (
                  <td>
                    {!book.isReturned && !book.reviewId && (
                      <Button
                        variant="warning"
                        onClick={() => handleReturnBook(book._id)}
                      >
                        Return Book
                      </Button>
                    )}
                    {book.isReturned && !book.reviewId && (
                      <AddReview
                        bookId={book.bookId?._id}
                        borrowId={book._id}
                        role={role}
                      />
                    )}
                    {book.isReturned && book.reviewId && "reviewed"}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <Alert variant="warning">No Borrow Data</Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-md-evenly pt-2">
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
  );
}

export default BorrowPage;

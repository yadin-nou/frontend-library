import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksAction } from "../../features/book/bookAction";
import { getAllUserAction } from "../../features/user/userAction";
import { getAllBorrowsAction } from "../../features/borrow/borrowAction";
import { useLocation } from "react-router-dom";
import { getAllReviewAction } from "../../features/review/reviewAction";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.bookInfo.bookCollection);
  const members = useSelector((state) => state.userInfo.allUsers);
  const { user } = useSelector((state) => state.userInfo);
  const review = useSelector((state) => state.reviewInfo.reviews);
  // const borrows = useSelector((state) => state.borrowInfo.allBorrows);
  // const location = useLocation();
  // const path = location.pathname.split("/").at(-1);
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  const borrows =
    user?.role === "admin"
      ? allBorrows
      : myBorrows?.filter((bo) => bo.userId.email === user?.email);
  const role = user?.role === "admin" ? "admin" : "user";
  const isAdmin = user?.role === "admin";
  useEffect(() => {
    dispatch(getAllBooksAction());
    dispatch(getAllUserAction());
  }, []);
  useEffect(() => {
    dispatch(getAllBorrowsAction(role));
  }, [role]);
  useEffect(() => {
    dispatch(getAllReviewAction(isAdmin));
  }, [dispatch, isAdmin]);

  console.log(borrows, "-----", role);
  return (
    <div>
      <Dashboard
        stats={book}
        members={members}
        borrows={borrows}
        isAdmin={role}
        reviews={review}
      />
    </div>
  );
};

export default DashboardPage;

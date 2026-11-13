import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksAction } from "../../features/book/bookAction";
import { getAllUserAction } from "../../features/user/userAction";
import { getAllBorrowsAction } from "../../features/borrow/borrowAction";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.bookInfo.bookCollection);
  const members = useSelector((state) => state.userInfo.allUsers);
  const { user } = useSelector((state) => state.userInfo);
  // const borrows = useSelector((state) => state.borrowInfo.allBorrows);
  // const location = useLocation();
  // const path = location.pathname.split("/").at(-1);
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  const borrows = user?.role === "admin" ? allBorrows : myBorrows;
  const role = user?.role === "admin" ? "admin" : "user";
  useEffect(() => {
    dispatch(getAllBooksAction());
    dispatch(getAllUserAction());
  }, []);
  useEffect(() => {
    dispatch(getAllBorrowsAction(role));
  }, [role]);
  // console.log(role);
  return (
    <div>
      <Dashboard stats={book} members={members} borrows={borrows} />
    </div>
  );
};

export default DashboardPage;
